﻿using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public interface ISupplier
    {
        Task<IEnumerable<Supplier>> GetSuppliers();
    }
}
