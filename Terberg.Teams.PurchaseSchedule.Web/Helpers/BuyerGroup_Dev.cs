using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class BuyerGroup_Dev : IBuyerGroup
    {
        public async Task<IEnumerable<BuyerGroup>> GetBuyerGroups()
        {
            var data = new[] {
                new BuyerGroup  { Id = "1", Name = "Buyerone" },
                new BuyerGroup { Id = "2", Name = "BuyerTwo" }
            };
            await Task.CompletedTask;
            return data;

        }
    }
}
