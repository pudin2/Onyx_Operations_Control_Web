using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/ordenes/subtareas")]
public class SubTController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SubTController(ApplicationDbContext context)
    {
        _context = context;
    }

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

    [HttpGet("{id:int}/totalhoras")]
    public IActionResult GetTotalHorasSubTarea(int id)
    {
        try
        {
            var totalHoras = _context.Database
                .SqlQueryRaw<Int32?>("SELECT dbo.fn_TotalHorasNotifST({0})", id)
                .AsEnumerable()
                .FirstOrDefault();

            return Ok(new { Id = id, TotalHoras = totalHoras });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al obtener las horas", error = ex.Message });
        }
    }

    [HttpGet("{id:int}/detalles")]
    public IActionResult GetDetallesBySubTareaId(int id)
    {
        var detallesSubT = _context.DetSubT.Where(d => d.Cab_Id == id).OrderBy(d => d.Id).ToList();

        if (detallesSubT == null || !detallesSubT.Any())
        {
            return NotFound(new { message = "No se encontraron detalles para la subtarea proporcionada" });
        }

        return Ok(detallesSubT);
    }

    [HttpGet("{id:int}/restante")]
    public IActionResult GetDatosDesdeVistaPorId(int id)
    {
        try
        {
            var datosDesdeVista = _context.VW_DetSubT.Where(d => d.Cab_Id == id).OrderBy(d => d.Id).ToList();

            if (datosDesdeVista == null || !datosDesdeVista.Any())
            {
                return NotFound(new { message = "No se encontraron datos en la vista para el ID proporcionado" });
            }

            return Ok(datosDesdeVista);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Ocurrió un error al obtener los datos desde la vista", error = ex.Message });
        }
    }
}

