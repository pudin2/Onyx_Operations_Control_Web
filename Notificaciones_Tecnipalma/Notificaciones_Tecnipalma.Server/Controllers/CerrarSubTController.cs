using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

[ApiController]
[Route("api/ordenes")]
public class SubTCerrarController : ControllerBase
{

    private readonly IConfiguration _configuration;

    public SubTCerrarController( IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("cerrar-subtarea")]
    public IActionResult CerrarSubtarea([FromBody] CerrarSubtareaRequest request)
    {
        int subtareaId = request.SubtareaId;
        using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        {
            using (var command = new SqlCommand("PA_CerrarSubT", connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@Cab_SubT_Id", subtareaId);

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                    Console.WriteLine("Subtarea cerrada exitosamente.");
                    return Ok(new { message = "Subtarea cerrada correctamente" });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al cerrar la subtarea: {ex.Message}");
                    return StatusCode(500, new { message = "Error al cerrar la subtarea", error = ex.Message });
                }
            }
        }
    }
}
