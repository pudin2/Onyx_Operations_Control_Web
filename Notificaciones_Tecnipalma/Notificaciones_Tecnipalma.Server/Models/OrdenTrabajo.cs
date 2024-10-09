public class OrdenTrabajo
{
    public int Id { get; set; } // Clave primaria
    public int NumOrden { get; set; } // Asegúrate de que coincida con el tipo de datos en la BD
    public int CabCotizacion_Id { get; set; }
    public string Alcance { get; set; }
}
