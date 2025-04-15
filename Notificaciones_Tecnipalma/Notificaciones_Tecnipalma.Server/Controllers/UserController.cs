using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoginAPI.Data;

namespace LoginAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsuariosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/usuarios/juan
        [HttpGet("{username}")]
        public async Task<IActionResult> GetUsuarioIdByUsername(string username)
        {
            var usuario = await _context.Usuarios
                .Where(u => u.Usuario == username)
                .Select(u => new { u.id }) // ?? Solo seleccionamos el Id
                .FirstOrDefaultAsync();

            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado." });
            }

            return Ok(usuario); // Devuelve: { "id": 5 }
        }
    }
}
