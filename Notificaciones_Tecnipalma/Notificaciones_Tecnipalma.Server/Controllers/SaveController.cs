using LoginAPI.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

[ApiController]
[Route("api/ordenes")]
public class SubTCopyController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public SubTCopyController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("guardar")]
    public IActionResult GuardarDatos([FromBody] SaveRequest datos)
    {
        if (datos == null)
        {
            return BadRequest(new { message = "No se recibieron datos" });
        }

        // Crear un solo DataTable para Operarios Reales y Materiales Reales
        var datosTable = new DataTable();
        datosTable.Columns.Add("CodInventario", typeof(string));
        datosTable.Columns.Add("Inventario_ID", typeof(string));
        datosTable.Columns.Add("Cant", typeof(decimal));
        datosTable.Columns.Add("Unidad_Id", typeof(int));
        datosTable.Columns.Add("Estado", typeof(string));
        datosTable.Columns.Add("DetCotizacion_Id", typeof(long));
        datosTable.Columns.Add("Tipo", typeof(byte));

        // Agregar filas de Materiales Reales al DataTable
        foreach (var material in datos.MaterialesReales)
        {
            datosTable.Rows.Add(
                material.CodInventario,
                material.Inventario_ID,
                material.Cant,
                material.Unidad_Id,
                material.Estado,
                material.DetCotizacion_Id,
                "1" // Tipo para materiales (o cualquier otro identificador que uses para distinguir materiales)
            );
        }

        // Agregar filas de Operarios Reales al DataTable
        foreach (var operario in datos.OperariosReales)
        {
            datosTable.Rows.Add(
                operario.CodInventario,
                operario.Inventario_ID,
                operario.Cant,
                operario.Unidad_Id,
                operario.Estado,
                operario.DetCotizacion_Id,
                "2" // Tipo para operarios
            );
        }


        using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        {
            using (var command = new SqlCommand("PA_InsertaSubT", connection))
            {
                command.CommandType = CommandType.StoredProcedure;

                // Parámetros para la cabecera
                command.Parameters.AddWithValue("@OT_Cab_ID", datos.CopiaSubtarea.OT_Cab_ID ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Descripcion", datos.CopiaSubtarea.Descripcion ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Fecha", datos.CopiaSubtarea.Fecha ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@AsignadaA", datos.CopiaSubtarea.AsignadaA ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Estado", datos.CopiaSubtarea.Estado ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Tipo", datos.CopiaSubtarea.Tipo ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Horas", datos.CopiaSubtarea.Horas ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Operario_Id", datos.CopiaSubtarea.Operario_Id ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Item", datos.CopiaSubtarea.Item ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@SubT_Cab_Id", datos.CopiaSubtarea.SubT_Cab_Id ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Porc", datos.CopiaSubtarea.Porc ?? (object)DBNull.Value);
                command.Parameters.AddWithValue("@Observacion", datos.CopiaSubtarea.Observacion ?? (object)DBNull.Value);

                // Agregar el DataTable como parámetro de tipo tabla
                var tableParam = command.Parameters.AddWithValue("@Detalles", datosTable);
                tableParam.SqlDbType = SqlDbType.Structured;
                tableParam.TypeName = "dbo.TypeDetSubT";

                try
                {
                    connection.Open();
                    command.ExecuteNonQuery();
                    Console.WriteLine("Datos guardados exitosamente en la base de datos.");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error al guardar datos en la base de datos: {ex.Message}");
                    return StatusCode(500, new { message = "Error al guardar los datos", error = ex.Message });
                }
            }
        }

        return Ok(new { message = "Datos guardados correctamente en la base de datos" });
    }
}
