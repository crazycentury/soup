namespace BESoup.Models
{
    public class UserFormModel
    {
        public int user_id { get; set; }
        public int fk_role_id { get; set; }

        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
    }
}
