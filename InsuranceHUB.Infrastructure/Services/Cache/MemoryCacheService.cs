﻿using Microsoft.Extensions.Caching.Memory;
using InsuranceHub.Domain.Interfaces;
using System;

namespace InsuranceHub.Infrastructure.Services.Cache
{
    public class MemoryCacheService : ICacheService
    {
        private readonly IMemoryCache _cache;

        public MemoryCacheService(IMemoryCache cache)
        {
            _cache = cache;
        }

        public T? Get<T>(string key)
        {
            return _cache.TryGetValue(key, out T? value) ? value : default;
        }

        public void Set<T>(string key, T value, int expiryMinutes)
        {
            var options = new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(expiryMinutes)
            };
            _cache.Set(key, value, options);
        }

        public void Remove(string key)
        {
            _cache.Remove(key);
        }

        public bool Exists(string key)
        {
            return _cache.TryGetValue(key, out _);
        }
    }
}
