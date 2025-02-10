using esp2025_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using Dapper;

namespace esp2025_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public UsersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            using var connection = new MySqlConnection(_configuration.GetConnectionString("Default"));
            var query = @"
            SELECT u.*, g.* 
            FROM User u 
            LEFT JOIN Grade g ON u.gradeId = g.idGrade";

            var users = await connection.QueryAsync<User, Grade, User>(
                query,
                (user, grade) =>
                {
                    user.Grade = grade;
                    return user;
                },
                splitOn: "idGrade"
            );

            return Ok(users);
        }
    }
}
