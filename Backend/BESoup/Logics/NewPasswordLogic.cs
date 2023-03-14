using System;
using System.Data;
using System.Data.SqlClient;

namespace BESoup.Logics
{
    public static class NewPasswordLogic
    {
        public static void NewPassword(string token, string password) 
        {
            byte[] salt;
            byte[] hash;
            CryptoLogic.GetSaltAndHashSHA512(password, out hash, out salt);

            var query = @"UPDATE [user] SET password_hash = @PassHash, password_salt = @PassSalt FROM reset_password_token WHERE [user].email = reset_password_token.email AND reset_password_token.token = @token";

            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@PassHash", SqlDbType.VarBinary) { Value = hash },
                new SqlParameter("@PassSalt", SqlDbType.VarBinary) { Value = salt },
                new SqlParameter("@Token", SqlDbType.VarChar) { Value = token },
            };

            var deleteTokenQuery = "DELETE from reset_password_token WHERE token = @Token;";
            var deleteTokenParams = new SqlParameter[]
            {
                new SqlParameter("@Token", SqlDbType.VarChar) { Value = token },
            };

            var queries = new string[]
            {
                query,
                deleteTokenQuery,
            };
            var sqlParamsArr = new SqlParameter[][]
            {
                sqlParams,
                deleteTokenParams,
            };

            DBLogic.ExecuteNonQueries(queries, sqlParamsArr);
        }
    }
}

