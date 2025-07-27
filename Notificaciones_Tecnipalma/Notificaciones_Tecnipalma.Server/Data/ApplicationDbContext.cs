using Microsoft.EntityFrameworkCore;
using LoginAPI.Models;

namespace LoginAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuarios> Usuarios { get; set; }
        public DbSet<VwOrdenTrabajo> VW_CabOt { get; set; }
        public DbSet<Cab_SubT> CabSubT { get; set; }
        public DbSet<DetSubT> DetSubT { get; set; }
        public DbSet<VwDetSubT> VW_DetSubT { get; set; }
        public DbSet<Operarios> VW_Operarios { get; set; }
        public DbSet <Anexo_Notificacion> AnexosNotificacion { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuarios>()
                .HasKey(u => u.Usuario);
            modelBuilder.Entity<VwOrdenTrabajo>()
                .HasNoKey()
                .ToView("VW_CabOt");

            modelBuilder.Entity<VwOrdenTrabajo>()
                .Property(o => o.NumOrden)
                .HasColumnType("int");

            modelBuilder.Entity<Anexo_Notificacion>()
                .HasIndex(a => a.RutaArchivo)
                .IsUnique();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder
                    .UseSqlServer("DefaultConnection") 
                    .EnableSensitiveDataLogging() 
                    .LogTo(Console.WriteLine, LogLevel.Information); 
            }
        }

    }
}

