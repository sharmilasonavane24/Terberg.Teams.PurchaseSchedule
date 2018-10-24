using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
   public interface ISupplier
    {
        Task<IEnumerable<Supplier>> GetSuppliers();
    }
}
