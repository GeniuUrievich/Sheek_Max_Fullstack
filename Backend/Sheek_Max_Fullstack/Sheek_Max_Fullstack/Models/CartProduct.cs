namespace Sheek_Max_Fullstack.Models
{
    public class CartProduct
    {
        public int Id { get; set; } 
        public int CartId { get; set; }
        public Cart cart { get; set; }
        public int ProductId { get; set; }
        public Product product { get; set; }
    }
}
