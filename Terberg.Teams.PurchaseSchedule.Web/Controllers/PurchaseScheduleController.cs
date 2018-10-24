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
        private readonly IBuyer _buyer;

        private readonly ICompany _company;
        public PurchaseScheduleController(ISupplier supplier, ICompany company, IBuyer buyer)
        {
            _supplier = supplier ?? throw new ArgumentNullException(nameof(supplier));
            _company = company ?? throw new ArgumentNullException(nameof(company));
            _buyer = buyer ?? throw new ArgumentNullException(nameof(buyer));
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Supplier>> Suppliers()
        {
            return await _supplier.GetSuppliers();
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Company>> Companies()
        {
            return await _company.GetCompanies();
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Buyer>> Buyers()
        {
            return await _buyer.GetBuyers();
        }
    }
}
