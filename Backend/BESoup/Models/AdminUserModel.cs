namespace BESoup.Models
{
    public class AdminUserModel
    {
        public int user_id { get; set; }
        public int fk_role_id { get; set; }

        public string name { get; set; }
        public string email { get; set; }
        public string role_name { get; set; }
        public bool active { get; set; }
    }
}
