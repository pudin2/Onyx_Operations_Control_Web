using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

[ApiController]
[Route("api/ordenes")]
public class SubTCopyController : ControllerBase
{
    [HttpPost("guardar")]
    public IActionResult GuardarDatos([FromBody] SaveRequest datos)
    {
        if (datos == null)
        {
            return BadRequest(new { message = "No se recibieron datos" });
        }

        // Muestra los datos en la consola como JSON
        Console.WriteLine("Materiales Reales: " + JsonConvert.SerializeObject(datos.MaterialesReales));
        Console.WriteLine("Operarios Reales: " + JsonConvert.SerializeObject(datos.OperariosReales));
        Console.WriteLine("Copia Subtarea: " + JsonConvert.SerializeObject(datos.CopiaSubtarea));

        return Ok(new { message = "Datos recibidos correctamente" });
    }

}
