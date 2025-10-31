﻿using InsuranceHub.Domain.Interfaces;
using InsuranceHub.Domain.Models;
using InsuranceHub.Domain.Models.RBAC;
using System.Data.Entity;

namespace InsuranceHub.Infrastructure.Persistence
{
    public class RbacDbContext : DbContext
    {
        public RbacDbContext(string connString) : base(connString)
        {
            this.Configuration.LazyLoadingEnabled = true;
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<RbacApplication> Applications { get; set; }
        public DbSet<RbacPermission> Permissions { get; set; }
        public DbSet<RbacRole> Roles { get; set; }
        public DbSet<RbacUser> Users { get; set; }
        public DbSet<UserRoleMap> UserRoleMaps { get; set; }
        public DbSet<RolePermissionMap> RolePermissionMaps { get; set; }
        public DbSet<InsHubRoute> Routes { get; set; }
        public DbSet<EmployeeModel> Employees { get; set; }
        //public DbSet<RbacPolicy> RbacPolicies { get; set; }
        //public DbSet<RbacPolicyRoleMapping> RbacPolicyRoleMappings { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RbacApplication>().ToTable("RBAC_Application");
            modelBuilder.Entity<RbacPermission>().ToTable("RBAC_Permission");
            modelBuilder.Entity<InsHubRoute>().ToTable("RBAC_RouteConfig");
            modelBuilder.Entity<RbacRole>().ToTable("RBAC_Role");
            modelBuilder.Entity<RolePermissionMap>().ToTable("RBAC_MAP_RolePermission");
            modelBuilder.Entity<RbacUser>().ToTable("RBAC_User");
            modelBuilder.Entity<UserRoleMap>().ToTable("RBAC_MAP_UserRole");
            modelBuilder.Entity<EmployeeModel>().ToTable("EMP_Employee");
            //modelBuilder.Entity<RbacPolicy>().ToTable("RBAC_Policies");
            //modelBuilder.Entity<RbacPolicyRoleMapping>().ToTable("RBAC_MAP_RolePolicy");


        }
    }

}
