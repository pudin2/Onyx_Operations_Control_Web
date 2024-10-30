using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/ordenes")]
public class AnexoController : ControllerBase
{
    private readonly string _rutaTemporal = Path.Combine(Directory.GetCurrentDirectory(), "tempUploads");

    public AnexoController()
    {
        if (!Directory.Exists(_rutaTemporal))
        {
            Directory.CreateDirectory(_rutaTemporal);  // Crear carpeta si no existe
        }
    }

    [HttpPost("guardar-anexo")]
    public async Task<IActionResult> GuardarAnexo([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "No se recibió ningún archivo" });

        var nombreArchivo = $"{Guid.NewGuid()}_{file.FileName}";
        var rutaArchivo = Path.Combine(_rutaTemporal, nombreArchivo);

        try
        {
            using (var stream = new FileStream(rutaArchivo, FileMode.Create))
            {
                await file.CopyToAsync(stream);  // Guardar archivo en la carpeta temporal
            }

            return Ok(new { filePath = rutaArchivo });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al guardar el archivo", error = ex.Message });
        }
    }
}
