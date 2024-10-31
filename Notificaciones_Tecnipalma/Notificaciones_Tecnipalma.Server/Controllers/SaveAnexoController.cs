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
    public async Task<IActionResult> GuardarAnexo([FromForm] List<IFormFile> files, [FromForm] string numOrden)
    {
        if (files == null || files.Count == 0)
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

        var filePaths = new List<string>(); // Lista para almacenar las rutas de los archivos guardados

        try
        {
            foreach (var file in files)
            {
                var nombreArchivo = $"{numOrden}_{file.FileName}";
                var rutaArchivo = Path.Combine(rutaConFecha, nombreArchivo);

                using (var stream = new FileStream(rutaArchivo, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                filePaths.Add(rutaArchivo); // Agrega la ruta del archivo a la lista
            }

            // Retornar las rutas de los archivos guardados si todo fue exitoso
            return Ok(new { message = "Anexos guardados correctamente." });
        }
        catch (Exception ex)
        {
            // Manejar cualquier excepción que ocurra durante el proceso
            return StatusCode(500, new { message = "Error al guardar el archivo", error = ex.Message });
        }
    }

}
