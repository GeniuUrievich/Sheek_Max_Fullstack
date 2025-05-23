using System.ComponentModel.DataAnnotations.Schema;

namespace Sheek_Max_Fullstack.Models
{
    public class Cart
    {
        public int Id { get; set; }
        public int UserID { get; set; }

        [ForeignKey("UserID")]
        public User User { get; set; }

        public List<CartProduct> Product { get; set; } = new List<CartProduct>();
        

    }
}
