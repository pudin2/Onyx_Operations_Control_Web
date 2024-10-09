using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;
using LoginAPI.Models;
using System.Linq;

namespace Notificaciones_Tecnipalma.Server.Controllers
{
    [ApiController]
    [Route("api/ordenes")]
    public class OtController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OtController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{numeroOrden:int}")] // Asegura que el parámetro sea de tipo int
        public IActionResult GetOrdenTrabajo(int numeroOrden) // Cambia el tipo del parámetro a int
        {
            var orden = _context.CabOt.FirstOrDefault(o => o.NumOrden == numeroOrden);

            if (orden == null)
            {
                return NotFound(new { message = "Orden de trabajo no encontrada" });
            }

            return Ok(orden);
        }

    }
}
