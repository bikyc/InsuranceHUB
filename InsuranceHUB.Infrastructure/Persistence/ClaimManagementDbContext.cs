using InsuranceHub.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace InsuranceHub.Infrastructure.Persistence
{
    public class ClaimManagementDbContext : DbContext
    {
        public ClaimManagementDbContext(DbContextOptions<ClaimManagementDbContext> options)
            : base(options)
        {
        }

        // Make DbSet public and plural
        public DbSet<CreditOrganization> CreditOrganizations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CreditOrganization>().ToTable("BIL_MST_Credit_Organization");
        }
    }
}
