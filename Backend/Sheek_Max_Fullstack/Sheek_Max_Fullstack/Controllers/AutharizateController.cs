using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Sheek_Max_Fullstack.DTO;
using Sheek_Max_Fullstack.Models;
using Sheek_Max_Fullstack.Servises;
using System.Security.Claims;

namespace Sheek_Max_Fullstack.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AutharizateController : ControllerBase
    {
        private readonly AddDBContext _dbContext;
        private readonly JWTService _jwtService;
        private readonly IPasswordHasher<User> _passwordHasher;
        public AutharizateController(AddDBContext dbContext, JWTService jwtService, IPasswordHasher<User> pass)
        {
            _dbContext = dbContext;
            _jwtService = jwtService;
            _passwordHasher = pass;
        }

        [HttpPost]
        public IActionResult Registration(User_Requements user_req)
        {
            if (_dbContext.Users.FirstOrDefault(u => u.Email == user_req.Email) != null) { return Unauthorized(new { message = "Email занят" }); }
            User user = new User { Email = user_req.Email, Password_Hash = user_req.Password, Name = user_req.Name, Surname = user_req.Surname, Phone = user_req.Surname, Role = user_req.Role };
            user.Password_Hash = _passwordHasher.HashPassword(user, user_req.Password);
            var access_token = _jwtService.GenerateAccessToken(user);
            var refresh_token = _jwtService.GenerateRefreshToken();
            Response.Cookies.Append("refresh", refresh_token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(30)
            });
            user.RefreshToken = refresh_token;
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            User_DTO user_dto = new User_DTO { Email = user.Email, Name = user.Name, Surname = user.Surname, Phone = user.Phone, Role = user.Role };
            return Ok( new {u = user_dto, ac = access_token});
        }

        [HttpPost]
        public IActionResult Login(Login_Req log_pass) 
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == log_pass.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Неверный логин или пароль" });
            }

            var result = _passwordHasher.VerifyHashedPassword(user, user.Password_Hash, log_pass.Password);

            if (result == PasswordVerificationResult.Failed) {
                return Unauthorized(new { message = "Неверный логин или пароль" });
            }
            
            var access_token = _jwtService.GenerateAccessToken(user);
            var refresh_token = _jwtService.GenerateRefreshToken();
            Response.Cookies.Append("refresh", refresh_token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(30)
            });
            user.RefreshToken = refresh_token;
            _dbContext.SaveChanges();

            User_DTO user_dto = new User_DTO { Email = user.Email, Name = user.Name, Surname = user.Surname, Phone = user.Phone, Role = user.Role };
            return Ok(new { u = user_dto, ac = access_token });
        }
        [HttpPost]
        [Authorize]
        public IActionResult Logout()
        {
            var name = User.Identity?.Name;

            if (string.IsNullOrEmpty(name))
                return Unauthorized(new { message = "Test1" });

            var user = _dbContext.Users.FirstOrDefault(u => u.Name == name);

            if (user == null)
                return Unauthorized(new { message = "Test2" });

            user.RefreshToken = null;
            _dbContext.SaveChanges();

            Response.Cookies.Delete("refreshToken");

            return Ok(new { message = "Успешный выход из аккаунта" });
        }
    }

    public class User_Requements
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }

        public string Phone { get; set; }
        public string Surname { get; set; }
        public string Role { get; set; }
    }

    public class Login_Req
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
