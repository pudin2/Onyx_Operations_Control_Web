using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

[ApiController]
[Route("api/ordenes")]
public class SubtareasController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public SubtareasController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost("copiar")]
    public async Task<IActionResult> CopiarSubtarea([FromBody] CopiarSubtareaDto model)
    {
        if (model == null || model.Id <= 0 || string.IsNullOrWhiteSpace(model.Descripcion))
            return BadRequest("Datos inválidos.");

        using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        using (var command = new SqlCommand("PA_CopiarST", connection))
        {
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@Id", model.Id);
            command.Parameters.AddWithValue("@Descripcion", model.Descripcion);

            await connection.OpenAsync();
            await command.ExecuteNonQueryAsync();
        }

        return Ok(new { mensaje = "Subtarea copiada correctamente." });
    }
}

