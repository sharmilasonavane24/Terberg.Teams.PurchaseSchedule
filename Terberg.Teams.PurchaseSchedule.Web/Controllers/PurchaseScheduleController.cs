using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Terberg.Teams.PurchaseSchedule.Web.Helpers;

namespace Terberg.Teams.PurchaseSchedule.Web.Controllers
{
    [Route("api/[controller]")]
    public class PurchaseScheduleController : Controller
    {
        private readonly ISupplier _supplier;
        public PurchaseScheduleController(ISupplier supplier)
        {
            _supplier = supplier ?? throw new ArgumentNullException(nameof(supplier));
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Supplier>> Suppliers()
        {
            return await _supplier.GetSuppliers();
        }
    }
}
