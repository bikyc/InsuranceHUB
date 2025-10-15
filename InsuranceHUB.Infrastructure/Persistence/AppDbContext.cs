using InsuranceHub.Domain.Models.HIB;
using InsuranceHub.Domain.Models.Patient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHUB.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<PatientModel> Patients { get; set; }
        public DbSet<HIBApiResponses> Eligibilities { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }

        public async Task SaveChangesAsync() => await base.SaveChangesAsync();
    }
}
