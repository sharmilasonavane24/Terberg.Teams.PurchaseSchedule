using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class Company_Dev : ICompany
    {
        public async Task<IEnumerable<Company>> GetCompanies()
        {
            var data = new[] {
                new Company { Companycode = "1", Name = "CompanyOne" },
                new Company { Companycode = "2", Name = "CompanyTwo" }
            };
            await Task.CompletedTask;
            return data;

        }
    }
}
