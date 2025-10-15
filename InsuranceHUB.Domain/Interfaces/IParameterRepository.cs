using InsuranceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Interfaces
{
    public interface IParameterRepository
    {
        Task<ParameterModel> GetParameter(string parameterName, string groupName);
    }
}
