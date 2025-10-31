using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Domain.Interfaces
{
    public interface ICacheService
    {
        T Get<T>(string key);
        void Set<T>(string key, T value, int expiryMinutes);
        bool Exists(string key);
        void Remove(string key);
    }
}
