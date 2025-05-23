using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sheek_Max_Fullstack.DTO;
using Sheek_Max_Fullstack.Models;
using System.Security.Claims;

namespace Sheek_Max_Fullstack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly AddDBContext _dbContext;
        private readonly IHttpContextAccessor _httpContext;
        public CartController(AddDBContext dbContext, IHttpContextAccessor cont)
        {
            _dbContext = dbContext;
            _httpContext = cont;
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get_Cart()
        {
            var user_id = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var cartproduct = _dbContext.Carts.Where(c => c.UserID == int.Parse(user_id))
                .Include(c => c.Product).
                ThenInclude(c => c.product)
                .SelectMany(c => c.Product)
                .Select(cp => new
                {
                    CartProductId = cp.Id,
                    id = cp.ProductId,
                    name = cp.product.Name,
                    Price = cp.product.Price,
                    photo_Url = cp.product.Photo_Url
                }).ToList();


            return Ok(cartproduct);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Add_Product_cart(prod_req prod)
        {
            var user_id = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var product = _dbContext.Products.FirstOrDefault(p => p.Id == prod.ProductID);
            var cart = _dbContext.Carts.FirstOrDefault(c => c.UserID == int.Parse(user_id));


            if (cart == null)
            {
                var cart_n = new Cart { UserID = int.Parse(user_id) };
                _dbContext.Carts.Add(cart_n);
                cart_n.Product.Add(new CartProduct { ProductId = prod.ProductID });
                _dbContext.SaveChanges();
                return Ok();
            }

            cart.Product.Add(new CartProduct { ProductId = prod.ProductID });
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Delete_Product_Cart(prod_req product_id) 
        {
            var user_id = _httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var cart = _dbContext.Carts.Include(c => c.Product).FirstOrDefault(u => u.UserID == int.Parse(user_id));
            if (cart == null)
            {
                return Ok( new {message =  "Корзины нет" });
            }

            var cart_product = cart.Product.FirstOrDefault(p => p.ProductId == product_id.ProductID);
            if (cart_product == null)
            {
                return Ok(new { message = "Товара в корзине нет" });
            }

            cart.Product.Remove(cart_product);
            _dbContext.CartProducts.Remove(cart_product);
            _dbContext.SaveChanges();
            var cartproduct = _dbContext.Carts.Where(c => c.UserID == int.Parse(user_id))
                .Include(c => c.Product).
                ThenInclude(c => c.product)
                .SelectMany(c => c.Product)
                .Select(cp => new
                {
                    CartProductId = cp.Id,
                    id = cp.ProductId,
                    name = cp.product.Name,
                    Price = cp.product.Price,
                    photo_Url = cp.product.Photo_Url
                }).ToList();

            return Ok(cartproduct);
        }
    }
    

    public class prod_req
    {
        public int ProductID { get; set; }
    }

}
