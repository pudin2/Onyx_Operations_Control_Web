using Microsoft.EntityFrameworkCore;
using LoginAPI.Models;

namespace LoginAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<VwOrdenTrabajo> VW_CabOt { get; set; }

        //Configuración del modelo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            // Configura 'NombreUsuario' como clave primaria
            modelBuilder.Entity<Usuarios>()
                .HasKey(u => u.Usuario); // Aquí se define la clave primaria
            modelBuilder.Entity<VwOrdenTrabajo>()
                .HasNoKey()
                .ToView("VW_CabOt");

            modelBuilder.Entity<VwOrdenTrabajo>()
                .Property(o => o.NumOrden)
                .HasColumnType("int"); // Esto asegura que la columna se trata como int

            // Puedes agregar más configuraciones de entidades aquí si es necesario
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer("DefaultConnection") // Reemplaza con tu cadena de conexión
                    .EnableSensitiveDataLogging() // Habilita el registro de datos sensibles
                    .LogTo(Console.WriteLine, LogLevel.Information); // Registra la salida en la consola
            }
        }

    }
}

