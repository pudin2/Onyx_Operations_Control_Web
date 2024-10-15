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
}
