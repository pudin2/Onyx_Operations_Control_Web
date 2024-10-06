using LoginAPI.Services;
using LoginAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace LoginAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuarios usuarioModel)
        {
            var isValidUser = await _authService.ValidateUser(usuarioModel.Usuario, usuarioModel.Contraseña);

            if (!isValidUser)
                return Unauthorized(new { message = "Credenciales inválidas" });

            return Ok(new { message = "Inicio de sesión exitoso" });
        }
    }

    
}
