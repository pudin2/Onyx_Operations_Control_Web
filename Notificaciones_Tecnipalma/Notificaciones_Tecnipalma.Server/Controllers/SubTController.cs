using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/subtareas")]
public class SubTController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SubTController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Obtener una subtarea específica por su ID
    [HttpGet("{id:int}")]
    public IActionResult GetSubTareaById(int id)
    {
        var subtarea = _context.CabSubT.FirstOrDefault(s => s.Id == id);

        if (subtarea == null)
        {
            return NotFound(new { message = "Subtarea no encontrada" });
        }

        return Ok(subtarea);
    }

    // Obtener los detalles de la subtarea desde la tabla DetSubT
    [HttpGet("{id:int}/detalles")]
    public IActionResult GetDetallesBySubTareaId(int id)
    {
        // Obtener los detalles de DetSubT asociados con la subtarea
        var detallesSubT = _context.DetSubT.Where(d => d.Cab_Id == id).ToList();

        if (detallesSubT == null || !detallesSubT.Any())
        {
            return NotFound(new { message = "No se encontraron detalles para la subtarea proporcionada" });
        }

        return Ok(detallesSubT);
    }
}
