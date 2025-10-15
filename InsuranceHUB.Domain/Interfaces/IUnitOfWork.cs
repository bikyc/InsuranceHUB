using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        IPatientRepository Patients { get; }
        IParameterRepository Parameters { get; }
        Task<int> SaveChangesAsync();
    }
}
