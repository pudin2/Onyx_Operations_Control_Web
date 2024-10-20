using Microsoft.AspNetCore.Mvc;
using LoginAPI.Data; // Asegúrate de ajustar la referencia al contexto adecuado

[ApiController]
[Route("api/operarios")]
public class OperariosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public OperariosController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Obtener todos los operarios
    [HttpGet]
    public IActionResult GetOperarios()
    {
        var operarios = _context.VW_Operarios.Where(s=> s.Estado=="A").ToList();

        if (!operarios.Any())
        {
            return NotFound(new { message = "No se encontraron operarios" });
        }

        return Ok(operarios);
    }
}
