using MimeKit;
using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace BESoup.Logics
{
    public static class ValidationLogic
    {
        private static readonly Regex PasswordRegex = new Regex(@"((?=.*[a-zA-Z])(?=.*\d)).{8,}$");

        public static bool EmailIsValid(string email)
        {
            return new EmailAddressAttribute().IsValid(email);
        }

        public static bool PasswordIsValid(string password)
        {
            return PasswordRegex.IsMatch(password);
        }
    }
}
