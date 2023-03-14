using System;
namespace BESoup.Models
{
    public class RegistrationModel
    {
        public string email { get; set; }
        public string name { get; set; }
        public string password { get; set; }
    }
    public class Token
    {
        public string TokenValue { get; set; }
    }
}

