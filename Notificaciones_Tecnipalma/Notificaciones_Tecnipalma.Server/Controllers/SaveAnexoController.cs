using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

[ApiController]
[Route("api/ordenes")]
public class AnexoController : ControllerBase
{
    private readonly string _rutaTemporal;
    private readonly ApplicationDbContext _context;

    public AnexoController(IOptions<AppSettings> appSettings, ApplicationDbContext context)
    {
        
        _rutaTemporal = appSettings.Value.RutaTmp ?? Path.Combine(Directory.GetCurrentDirectory(), "tempUploads");
        _context= context;

        if (!Directory.Exists(_rutaTemporal))
        {
            Directory.CreateDirectory(_rutaTemporal);  
        }
    }

    [HttpPost("guardar-anexo")]
    public async Task<IActionResult> GuardarAnexo([FromForm] List<IFormFile> files, [FromForm] string numOrden, [FromForm] int Cab_Id)
    {
        if (files == null || files.Count == 0)
            return BadRequest(new { message = "No se recibió ningún archivo" });

        if (string.IsNullOrEmpty(numOrden))
            return BadRequest(new { message = "Número de orden no proporcionado" });

        var año = DateTime.Now.Year;
        var mes = DateTime.Now.Month.ToString("D2");  
        var rutaConFecha = Path.Combine(_rutaTemporal, año.ToString(), mes);

        if (!Directory.Exists(rutaConFecha))
        {
            Directory.CreateDirectory(rutaConFecha);
        }

        var filePaths = new List<string>(); 

        try
        {
            foreach (var file in files)
            {
                var nombreArchivo = $"{numOrden}_{file.FileName}";
                var rutaArchivo = Path.Combine(rutaConFecha, nombreArchivo);
                
                var existeAnexo = _context.AnexosNotificacion.Any(a => a.RutaArchivo == rutaArchivo);

                if (!existeAnexo)
                {
                    using (var stream = new FileStream(rutaArchivo, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }
                    filePaths.Add(rutaArchivo);

                    var anexo = new Anexo_Notificacion
                    {
                        Cab_Id = Cab_Id,
                        RutaArchivo = rutaArchivo,
                        MGuid = numOrden,
                        Estado = "A"
                    };
                    
                    _context.AnexosNotificacion.Add(anexo);
                }
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Anexos guardados correctamente." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error al guardar el archivo", error = ex.Message });
        }
    }
}
