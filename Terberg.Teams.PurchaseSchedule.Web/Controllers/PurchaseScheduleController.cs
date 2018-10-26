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
        private readonly IBuyerGroup _buyer;
        private readonly IReport _report;
        private readonly ICompany _company;
        public PurchaseScheduleController(ISupplier supplier, ICompany company, IBuyerGroup buyer, IReport report)
        {
            _supplier = supplier ?? throw new ArgumentNullException(nameof(supplier));
            _company = company ?? throw new ArgumentNullException(nameof(company));
            _buyer = buyer ?? throw new ArgumentNullException(nameof(buyer));
            _report = report ?? throw new ArgumentNullException(nameof(report));
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
        public async Task<IEnumerable<BuyerGroup>> BuyerGroups()
        {
            return await _buyer.GetBuyerGroups();
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<Report>> Reports(string companycode,
            string supplierid, string buyerid, bool isPurchaseOrder,
            bool isPlannedOrder,bool isForecastSale,bool isForecastLongTerm)
        {
            return await _report.GetReports();
        }
    }
}
