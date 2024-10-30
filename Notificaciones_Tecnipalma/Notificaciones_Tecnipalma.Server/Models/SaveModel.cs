public class SaveRequest
{
    public List<SaveDataRequest1> OperariosReales { get; set; }
    public List<SaveDataRequest2> MaterialesReales { get; set; }
    public Cab_SubT CopiaSubtarea { get; set; }
}

public class SaveDataRequest1
{
    public string? CodInventario { get; set; }
    public decimal? Cant { get; set; }
    public long? DetCotizacion_Id { get; set; }
    public string? Inventario_ID { get; set; }
    public int? Unidad_Id { get; set; }
    public string? Estado { get; set; }
    public byte? Tipo { get; set; }
}

public class SaveDataRequest2
{
    public string? CodInventario { get; set; }
    public decimal? Cant { get; set; }
    public long? DetCotizacion_Id { get; set; }
    public string? Inventario_ID { get; set; }
    public int? Unidad_Id { get; set; }
    public string? Estado { get; set; }
    public byte? Tipo { get; set; }
}


