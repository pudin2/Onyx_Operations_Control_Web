public class Cab_SubT
{
    public int? Id { get; set; } // Asumiendo que hay una columna Id como clave primaria
    public int? OT_Cab_ID { get; set; }
    public string? Descripcion { get; set; }
    public DateTime? Fecha { get; set; }
    public string? AsignadaA { get; set; }
    public byte? Horas { get; set; }
    public decimal? Porc { get; set; }
    public string? Tipo { get; set; }
    public string? Estado { get; set; }


    // Agrega otras propiedades según las columnas de la tabla Cab_SubT
}
