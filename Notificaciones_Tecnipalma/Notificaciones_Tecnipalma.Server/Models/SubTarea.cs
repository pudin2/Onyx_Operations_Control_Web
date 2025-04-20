public class Cab_SubT
{
    public int? Id { get; set; } // Asumiendo que hay una columna Id como clave primaria
    public int? OT_Cab_ID { get; set; }
    public string? Descripcion { get; set; }
    public DateTime? Fecha { get; set; }
    public string? AsignadaA { get; set; }
    public decimal? Horas { get; set; }
    public decimal? Porc { get; set; }
    public string? Tipo { get; set; }
    public string? Estado { get; set; }
    public int? Operario_Id { get; set; }
    public string? Observacion { get; set; }
    public byte? Item { get; set; }
    public int? SubT_Cab_Id { get; set; }
    public int? Usuario_Id { get; set; }
}
