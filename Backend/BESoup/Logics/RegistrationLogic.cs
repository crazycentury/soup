using BESoup.Models;
using System.Data.SqlClient;
using System.Data;

namespace BESoup.Logics
{
    public static class RegistrationLogic
    {
        public static void RegisterUser(RegistrationModel registration)
        {
            var conn = DBLogic.NewConnection();
            conn.Open();
            var transaction = conn.BeginTransaction();

            try
            {
                CreateUser(conn, transaction, registration);
                var token = CreateVerificationToken(conn, transaction, registration);
                SendEmail.SendUserVerificationToken(registration, token);

                transaction.Commit();
            } catch (Exception)
            {
                transaction.Rollback();
                throw;
            } finally
            {
                conn.Close();
            }
        }

        public static void ActivateUser(string token)
        {
            var email = GetEmailFromVerificationToken(token);

            var activateUserQuery = "UPDATE [user] SET active=1 WHERE email=@email;";
            var deleteTokenQuery = "DELETE token WHERE token=@token;";

            var activateUserParams = new SqlParameter[]
            {
                new SqlParameter { ParameterName="@email", DbType=DbType.String, Value = email},
            };
            var deleteTokenParams = new SqlParameter[]
            {
                new SqlParameter { ParameterName="@token", DbType=DbType.String, Value = token},
            };

            var queries = new string[]
            {
                activateUserQuery,
                deleteTokenQuery,
            };
            var sqlParamsArr = new SqlParameter[][]
            {
                activateUserParams,
                deleteTokenParams,
            };

            DBLogic.ExecuteNonQueries(queries, sqlParamsArr);
        }

        private static void CreateUser(SqlConnection conn, SqlTransaction transaction, RegistrationModel registration)
        {
            byte[] hash;
            byte[] salt;
            CryptoLogic.GetSaltAndHashSHA512(registration.password, out hash, out salt);

            var query = @"
                INSERT INTO [user](email, [name], password_hash, password_salt, [active], fk_role_id)
                VALUES (@email, @name, @hash, @salt, @active, @role);
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter { ParameterName="@email", DbType=DbType.String, Value = registration.email},
                new SqlParameter { ParameterName="@name", DbType=DbType.String, Value = registration.name},
                new SqlParameter { ParameterName="@hash", DbType=DbType.Binary, Value = hash},
                new SqlParameter { ParameterName="@salt", DbType=DbType.Binary, Value = salt},
                new SqlParameter { ParameterName="@active", SqlDbType=SqlDbType.Bit, Value = false},
                new SqlParameter { ParameterName="@role", DbType=DbType.Int16, Value = 2},
            };

            try
            {
                DBLogic.ExecuteNonQuery(query, conn, transaction, sqlParams);
            } catch
            {
                throw new Exception("REGISTER DATA FAILED");
            }
        }

        private static string CreateVerificationToken(SqlConnection conn, SqlTransaction transaction, RegistrationModel registration)
        {
            var token = Guid.NewGuid().ToString();
            var query = "INSERT INTO token(token, expire_date, usage_type, email) VALUES (@token, null, 'register', @email);";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter { ParameterName="@email", DbType=DbType.String, Value = registration.email},
                new SqlParameter { ParameterName="@token", DbType=DbType.String, Value = token },
            };

            DBLogic.ExecuteNonQuery(query, conn, transaction, sqlParams);

            return token;
        }

        private static string GetEmailFromVerificationToken(string token)
        {
            var query = "SELECT TOP 1 email FROM token WHERE token=@token;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter { ParameterName="@token", DbType=DbType.String, Value = token ?? "" },
            };

            object emailObj = DBLogic.ExecuteScalar(query, sqlParams);
            string email = emailObj == DBNull.Value ? "" : (string)emailObj;

            if (String.IsNullOrEmpty(email))
            {
                throw new Exception("Cannot activate the user, either the user is already active, or the user is not found");
            }

            return email;
        }
    }
}
