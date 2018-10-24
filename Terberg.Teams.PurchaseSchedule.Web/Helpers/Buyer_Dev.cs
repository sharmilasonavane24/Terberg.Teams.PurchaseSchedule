using System.Collections.Generic;
using System.Threading.Tasks;

namespace Terberg.Teams.PurchaseSchedule.Web.Helpers
{
    public class Buyer_Dev : IBuyer
    {
        public async Task<IEnumerable<Buyer>> GetBuyers()
        {
            var data = new[] {
                new Buyer  { Id = "1", Name = "Buyerone" },
                new Buyer { Id = "2", Name = "BuyerTwo" }
            };
            await Task.CompletedTask;
            return data;

        }
    }
}
