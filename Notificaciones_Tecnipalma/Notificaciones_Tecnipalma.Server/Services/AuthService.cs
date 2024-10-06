using LoginAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace LoginAPI.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;

        public AuthService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ValidateUser(string username, string password)
        {
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Usuario == username);

            if (user == null)
                return false;

            return user.Contraseña == password;
        }
    }
}
