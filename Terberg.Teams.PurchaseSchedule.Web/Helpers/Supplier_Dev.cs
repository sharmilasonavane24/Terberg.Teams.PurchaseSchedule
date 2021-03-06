﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class Supplier_Dev : ISupplier
    {
        public async Task<IEnumerable<Supplier>> GetSuppliers()
        {
            var data = new[] {
                new Supplier { Id = "1", Name = "SupplierOne" },
                new Supplier { Id = "2", Name = "SupplierTwo" }
            };
            await Task.CompletedTask;
            return data;

        }
    }
}
