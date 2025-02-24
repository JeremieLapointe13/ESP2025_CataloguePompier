namespace esp2025_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Log simple au démarrage
            File.WriteAllText("/tmp/esp2025_debug.log",
                $"Application démarrée à {DateTime.Now}\n" +
                $"Environnement: {Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")}\n" +
                $"Répertoire: {Directory.GetCurrentDirectory()}\n");

            var builder = WebApplication.CreateBuilder(args);


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReact", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            // Permettre à l'application React de communiquer avec l'API
            app.UseCors("AllowReact");

            app.MapControllers();

            app.MapGet("/", () =>
            {
                string message = $"API ESP2025 - DEPLOYMENT TEST - {DateTime.Now}";
                File.AppendAllText("/tmp/esp2025_debug.log", $"Route racine accédée à {DateTime.Now}\n");
                return message;
            });

            app.Run();
        }
    }
}
