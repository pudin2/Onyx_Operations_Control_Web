public class VwOrdenTrabajo
{
    // Asegúrate de que coincida con el tipo de datos en la BD
    public int? Ot_Id { get; set; } 
    public int? NumOrden { get; set; } // Clave primaria
    public string? NombreCliente { get; set; }
    public string? NombreProyecto { get; set; }
    public string? OT_Alcance { get; set; }
    public string? EstadoOT {  get; set; }
}