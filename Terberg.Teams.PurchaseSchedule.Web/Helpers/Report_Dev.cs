using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class Report_dev : IReport
    {
        public async Task<IEnumerable<Report>> GetReports()
        {
            var data = new[] {
                new Report { Id = "1", Name = "ReportOne" },
                
            };
            await Task.CompletedTask;
            return data;

        }
    }
}
