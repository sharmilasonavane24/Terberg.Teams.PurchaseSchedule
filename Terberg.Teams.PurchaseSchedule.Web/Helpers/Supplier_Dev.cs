using System.Collections.Generic;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class Supplier_Dev : ISupplier
    {
        public IEnumerable<SupplierDto> GetSuppliers()
        {
            var data = new[] {
                new SupplierDto { Id = "1", Name = "SupplierOne" },
                new SupplierDto { Id = "2", Name = "SupplierTwo" }
            };
            return data;

        }
    }
}
