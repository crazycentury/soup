using System.Security.Cryptography;
using System.Text;

namespace BESoup.Logics
{
    public static class CryptoLogic
    {
        public static void GetSaltAndHashSHA512(string value, out byte[] hash, out byte[] salt)
        {
            using (var hmac = new HMACSHA512())
            {
                salt = hmac.Key;
                hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(value));
            }
        }
    }
}
