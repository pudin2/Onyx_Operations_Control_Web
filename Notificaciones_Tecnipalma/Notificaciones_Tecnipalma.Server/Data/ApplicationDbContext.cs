using Microsoft.EntityFrameworkCore;
using LoginAPI.Models;

namespace LoginAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuarios> Usuarios { get; set; }

        //Configuración del modelo
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configura 'NombreUsuario' como clave primaria
            modelBuilder.Entity<Usuarios>()
                .HasKey(u => u.Usuario); // Aquí se define la clave primaria

            // Puedes agregar más configuraciones de entidades aquí si es necesario
        }
    }

    
}

