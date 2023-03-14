using System.Security.Claims;

namespace BESoup.Models
{
    public class UserDataModel
    {
        public string name { get; set; }
        public string email { get; set; }
        public string role_name { get; set; }

        public static UserDataModel FromUserModel(UserModel user)
        {
            return new UserDataModel
            {
                name = user.name,
                email = user.email,
                role_name = user.role_name
            };
        }
    }
}
