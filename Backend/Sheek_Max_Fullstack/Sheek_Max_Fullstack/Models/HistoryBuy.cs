using System.ComponentModel.DataAnnotations.Schema;

namespace Sheek_Max_Fullstack.Models
{
    public class HistoryBuy
    {
        public int Id { get; set; }
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public User User { get; set; }

        [ForeignKey("ProductID")]
        public List<Product> Product { get; set; } = new List<Product>();
    }
}
