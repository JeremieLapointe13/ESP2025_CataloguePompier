namespace esp2025_backend.Models
{
    public class User
    {
        public int IdUser { get; set; }
        public int GradeId { get; set; }
        public string Email { get; set; }
        public int NoMatricule { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Points { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActive { get; set; }
        public int LoginAttempts { get; set; }
        public Grade Grade { get; set; }
    }
}
