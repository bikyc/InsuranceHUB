using InsuranceHub.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InsuranceHub.Application.Interfaces
{
    public static class InsHubCache
    {
        private static ICacheService? _cacheService;

        // Called once during startup to wire the actual cache implementation
        public static void Configure(ICacheService cacheService)
        {
            _cacheService = cacheService;
        }

        public static T? Get<T>(string key)
        {
            if (_cacheService == null)
                throw new InvalidOperationException("DanpheCache is not configured.");

            return _cacheService.Get<T>(key);
        }

        public static void Set<T>(string key, T value, TimeSpan? expiry = null)
        {
            if (_cacheService == null)
                throw new InvalidOperationException("DanpheCache is not configured.");

            int minutes = expiry.HasValue ? (int)expiry.Value.TotalMinutes : 0; 
            _cacheService.Set(key, value, minutes);
        }


        public static void Remove(string key)
        {
            if (_cacheService == null)
                throw new InvalidOperationException("DanpheCache is not configured.");

            _cacheService.Remove(key);
        }
    }
}
