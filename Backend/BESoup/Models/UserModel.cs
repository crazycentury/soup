namespace BESoup.Models
{
    public class UserModel
    {
        public int user_id;
        public int fk_role_id;

        public string email;
        public string name;
        public byte[] password_hash;
        public byte[] password_salt;
        public bool active;
        public string role_name;
    }
}
