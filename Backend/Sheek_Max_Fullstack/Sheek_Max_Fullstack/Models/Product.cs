namespace Sheek_Max_Fullstack.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Price {  get; set; }
        public int Size { get; set; }
        public string Color { get; set; } = string.Empty;
        public int Remains { get; set; }
        public string Sex { get; set; } = string.Empty;
        public string Photo_Url { get; set; } = string.Empty;

        public ICollection<Cart> Carts { get; set; }
        public ICollection<HistoryBuy> HistoryBuys { get; set; }

    }
}
