namespace Sheek_Max_Fullstack.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password_Hash {get; set;} = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Surname {  get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Role {  get; set; } = string.Empty;

        public string? RefreshToken { get; set; } = string.Empty;

        public Cart Cart { get; set; }
        public ICollection<HistoryBuy> HistoryBuys { get; set; }
    }
}
