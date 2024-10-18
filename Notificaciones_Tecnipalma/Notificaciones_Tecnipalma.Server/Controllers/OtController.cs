using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("{numeroOrden:int}")]
        public IActionResult GetOrdenTrabajo(int numeroOrden)
        {
            var orden = _context.VW_CabOt.FirstOrDefault(o => o.NumOrden == numeroOrden);

            if (orden == null)
            {
                return NotFound(new { message = "Orden de trabajo no encontrada" });
            }

            return Ok(orden);
        }

        // Nuevo método para obtener registros de Cab_SubT basados en el Ot_Id de VW_CabOt
        [HttpGet("{numeroOrden:int}/subt")]
        public IActionResult GetSubTByNumeroOrden(int numeroOrden)
        {
            // Primero, buscamos la orden en VW_CabOt
            var orden = _context.VW_CabOt.FirstOrDefault(o => o.NumOrden == numeroOrden );

            if (orden == null)
            {
                return NotFound(new { message = "Orden de trabajo no encontrada" });
            }

            // Usamos el Ot_Id obtenido para buscar los registros en Cab_SubT
            var SubTareas = _context.CabSubT.Where(s => s.OT_Cab_ID == orden.Ot_Id && s.Tipo == "ST" && s.Estado=="P").ToList();

            if (SubTareas == null || SubTareas.Count == 0)
            {
                return NotFound(new { message = "No se encontraron registros para el Ot_Id proporcionado" });
            } 

            return Ok(SubTareas);
        }
    }
}
