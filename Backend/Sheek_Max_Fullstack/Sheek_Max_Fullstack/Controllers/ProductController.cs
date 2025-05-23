using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sheek_Max_Fullstack.DTO;
using Sheek_Max_Fullstack.Models;
using Sheek_Max_Fullstack.Servises;
using System.Net.Http.Headers;

namespace Sheek_Max_Fullstack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AddDBContext _dbContext;
        public ProductController(AddDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult Add_product(Product_req product)
        {
            var uploadsDir = Path.Combine("wwwroot", "images");
            Directory.CreateDirectory(uploadsDir);

            if (product.Photo == null || product.Photo.Length == 0) {
                return BadRequest("Добавьте фото");
            }
            var originalExtension = Path.GetExtension(product.Photo.FileName);
            var extension = string.IsNullOrWhiteSpace(originalExtension) ? ".jpg" : originalExtension;
            var filename = $"{Guid.NewGuid()}{extension}";
            var filepath = Path.Combine("wwwroot/images", filename);
            var urlPath = $"/images/{filename}";
            try
            {
                using (var stream = new FileStream(filepath, FileMode.Create))
                {
                    product.Photo.CopyTo(stream);
                }

                var product_db = _dbContext.Products.
                    FirstOrDefault(p => p.Name == product.Name &&
                    p.Price == product.Price &&
                    p.Size == product.Size &&
                    p.Color == product.Color &&
                    p.Sex == product.Sex);

                if (product_db != null) { return BadRequest("Такой товар есть"); }

                Product product_dto = new Product { Name = product.Name, Price = product.Price, Size = product.Size, Color = product.Color, Remains = product.Remains, Sex = product.Sex, Photo_Url = urlPath };
                _dbContext.Add(product_dto);
                _dbContext.SaveChanges();
                return Ok(new { message = "Test" });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка: {ex.Message}");
                return StatusCode(500, "Произошла внутренняя ошибка");
            }

        }

        [HttpPost]
        public IActionResult Get_Filter_Product([FromBody] Filter filter)
        {
            var products = _dbContext.Products.ToList();

            if (filter.price != null)
            {
                if (filter.price.min.HasValue)
                {
                    products = products.Where(p => p.Price >= filter.price.min.Value).ToList();
                }
                if (filter.price.max.HasValue)
                {
                    products = products.Where(p => p.Price <= filter.price.max.Value).ToList();
                }
            }

            if (filter.sex != null && filter.sex.Any())
            {
                products = products.Where(p => filter.sex.Contains(p.Sex)).ToList();
            }
            if (filter.sizes != null && filter.sizes.Any())
            {
                products = products.Where(p => filter.sizes.Contains(p.Size)).ToList();
            }

            var response = products.Select(p => new Product_DTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Color = p.Color,
                Remains = p.Remains,
                Sex = p.Sex,
                Photo_Url = p.Photo_Url,
                Size = p.Size
            });

            return Ok(response);
        }

        [HttpGet]
        public IActionResult Get_All_Product()
        {
            var products = _dbContext.Products.ToList();
            var response = products.Select(p => new Product_DTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                Color = p.Color,
                Remains = p.Remains,
                Sex = p.Sex,
                Photo_Url = p.Photo_Url,
                Size = p.Size
            });

            return Ok(response);
        }

        [HttpGet]
        public IActionResult Get_Product(int id)
        {
            var product =_dbContext.Products.FirstOrDefault(p => p.Id == id);
            if (product == null)
            {
                return Ok(new { mrssage = "404" });
            }
            Product_DTO product_dto = new Product_DTO {Id = product.Id, Name = product.Name, Price = product.Price, Size = product.Size, Color = product.Color, Remains = product.Remains, Sex = product.Sex, Photo_Url = product.Photo_Url };

            return Ok(product_dto);
        }
    }

    public class Product_req
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Size { get; set; }
        public string Color { get; set; }
        public int Remains { get; set; }
        public string Sex { get; set; }
        public IFormFile Photo { get; set; }
    }

    public class Filter
    {
        public Price? price {  get; set; }
        public List<string> sex { get; set; }
        public List<int> sizes { get; set; }

    }

    public class Price
    {
        public int? min { get; set; }
        public int? max { get; set; }
    }

}
