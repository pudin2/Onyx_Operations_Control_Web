using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/ordenes")]
public class AnexoController : ControllerBase
{
    private readonly string _rutaTemporal;

    public AnexoController(IOptions<AppSettings> appSettings)
    {
        // Obtener la ruta temporal desde la configuración
        _rutaTemporal = appSettings.Value.RutaTmp ?? Path.Combine(Directory.GetCurrentDirectory(), "tempUploads");

        if (!Directory.Exists(_rutaTemporal))
        {
            Directory.CreateDirectory(_rutaTemporal);  // Crear carpeta si no existe
        }
    }

    [HttpPost("guardar-anexo")]
    public async Task<IActionResult> GuardarAnexo([FromForm] IFormFile file, [FromForm] string numOrden)
    {
        if (file == null || file.Length == 0)
            return BadRequest(new { message = "No se recibió ningún archivo" });

        if (string.IsNullOrEmpty(numOrden))
            return BadRequest(new { message = "Número de orden no proporcionado" });

        var año = DateTime.Now.Year;
        var mes = DateTime.Now.Month.ToString("D2");  // Agrega el cero a la izquierda si es necesario (e.g., 01 para enero)
        var rutaConFecha = Path.Combine(_rutaTemporal, año.ToString(), mes);

        if (!Directory.Exists(rutaConFecha))
        {
            Directory.CreateDirectory(rutaConFecha);
        }

        var nombreArchivo = $"{numOrden}_{file.FileName}";
        var rutaArchivo = Path.Combine(rutaConFecha, nombreArchivo);

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
