using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;


[ApiController]
[Route("api/subtareas")]
public class SubTCopyController : ControllerBase
{
    [HttpPost("guardar")]
    public IActionResult RecibirDatos([FromBody] SaveRequest request)
    {
        if (request == null)
        {
            return BadRequest("La solicitud no contiene datos válidos.");
        }

        try
        {
            // Mostrar los datos recibidos en la consola o en los logs
            Console.WriteLine("Operarios Reales:");
            foreach (var operario in request.OperariosReales)
            {
                Console.WriteLine($" - Encargado: {operario.CodInventario}, Cant: {operario.Cant}, Unidad_Id: {operario.Unidad_Id}");
            }

            Console.WriteLine("Materiales Reales:");
            foreach (var material in request.MaterialesReales)
            {
                Console.WriteLine($" - CodigoInventario: {material.CodInventario}, Cantidad: {material.Cant}, Unidad_Id: {material.Unidad_Id}, Estado: {material.Estado},Cotizacion ID:{material.DetCotizacion_Id},Tipo: {material.Tipo}");
            }

            Console.WriteLine("Copia de la Subtarea:");
            Console.WriteLine($" - Descripcion: {request.CopiaSubtarea.Descripcion}, Horas: {request.CopiaSubtarea.Horas}, Estado: {request.CopiaSubtarea.Estado}");

            return Ok("Datos recibidos correctamente.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Ocurrió un error al procesar los datos: {ex.Message}");
        }
    }
}
