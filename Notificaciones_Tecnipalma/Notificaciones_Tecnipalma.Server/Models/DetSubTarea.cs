using System.Numerics;

public class DetSubT
{
    public int? Id { get; set; } // Clave primaria
    public int? Cab_Id { get; set; } // Relación con CabSubT (ID de la cabecera)
    public string? CodInventario { get; set; }
    public decimal? Cant { get; set; }
    public long? DetCotizacion_Id { get; set; }
    
    public string? Inventario_ID { get; set; }
    public int? Unidad_Id { get; set; }
    public string? Estado {  get; set; }

    // Agrega otras propiedades según las columnas de la tabla DetSubT
}
