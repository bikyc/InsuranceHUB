//using Microsoft.AspNetCore.Builder;
//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.SpaProxy; // ⚠ Make sure this using exists
//using Microsoft.Extensions.FileProviders;
//using System.IO;

//namespace InsuranceHub.Server.DependencyInjection
//{
//    public static class WebAppConfiguration
//    {
//        public static WebApplication ConfigureWebApp(this WebApplication app)
//        {
//            var env = app.Environment;

//            // Middleware
//            app.UseHttpsRedirection();
//            app.UseCors("AllowDanphe");
//            app.UseAuthentication();
//            app.UseAuthorization();

//            app.MapControllers();

//            // =================== SPA Proxy ===================
//            if (env.IsDevelopment())
//            {
//                app.MapFallbackToProxy("{*path}", new SpaProxyOptions
//                {
//                    SourcePath = "../insurancehub.client", // relative to server project
//                    TargetUri = "http://localhost:60635",
//                    LaunchCommand = "npm start"
//                });
//            }
//            else
//            {
//                // Production: serve static Angular files
//                var clientDistPath = Path.Combine(env.ContentRootPath, "../insurancehub.client/dist/insurancehub.client");
//                if (Directory.Exists(clientDistPath))
//                {
//                    app.UseStaticFiles(new StaticFileOptions
//                    {
//                        FileProvider = new PhysicalFileProvider(clientDistPath),
//                        RequestPath = ""
//                    });

//                    // Fallback for SPA routes
//                    app.MapFallbackToFile("index.html");
//                }
//            }

//            return app;
//        }
//    }
//}
