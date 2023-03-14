using BESoup.Models;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace BESoup.Logics
{
    public static class AuthLogic
    {
        private static string JwtKey;

        public static void SetConfiguration(IConfiguration config)
        {
            JwtKey = config["Jwt:SecretKey"];
        }

        public static UserModel GetActiveUser(string email, string password)
        {
            string userQuery = @"
                SELECT
                    u.[user_id],
                    u.fk_role_id,
                    u.email,
                    u.[name],
                    u.password_hash,
                    u.password_salt,
                    u.active,
                    r.[name] AS role_name
                FROM [user] u
                JOIN role r ON u.fk_role_id = r.role_id
                WHERE u.email = @Email;
            ";
            SqlParameter[] userParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email }
            };
            DataTable userData = DBLogic.ExecuteQuery(userQuery, userParams);

            // User with the given email doesn't exist
            if (userData.Rows.Count == 0)
            {
                throw new Exception("Wrong email or password");
            }

            DataRow userRow = userData.Rows[0];
            UserModel user = new UserModel
            {
                user_id = (int)userRow["user_id"],
                fk_role_id = (int)userRow["fk_role_id"],
                email = (string)userRow["email"],
                name = (string)userRow["name"],
                password_hash = (byte[])userRow["password_hash"],
                password_salt = (byte[])userRow["password_salt"],
                active = (bool)userRow["active"],
                role_name = (string)userRow["role_name"]
            };

            // Check if the given password is correct
            bool isPasswordCorrect = false;
            using (var hmac = new HMACSHA512(user.password_salt))
            {
                byte[] password_hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
                isPasswordCorrect = password_hash.SequenceEqual(user.password_hash);
            }

            if (!isPasswordCorrect)
            {
                throw new Exception("Wrong email or password");
            }

            // Check if user is active
            if (!user.active)
            {
                throw new Exception("Your account is currently inactive. Please activate your account first");
            }

            return user;
        }

        public static int GetUserIdByEmail(string email)
        {
            var query = "SELECT [user_id] FROM [user] WHERE email = @Email;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            if (queryResult.Rows.Count == 0)
            {
                throw new Exception("Email is not registered");
            }

            var row = queryResult.Rows[0];
            var userId = (int)row["user_id"];

            return userId;
        }

        public static string GetUserNameByEmail(string email)
        {
            var query = "SELECT [name] FROM [user] WHERE email = @Email;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            if (queryResult.Rows.Count == 0)
            {
                throw new Exception("Email is not registered");
            }

            var row = queryResult.Rows[0];
            var name = (string)row["name"];

            return name;
        }

        public static bool EmailIsRegistered(string email)
        {
            string emailExistQuery = "SELECT 1 WHERE EXISTS(SELECT email FROM [user] WHERE email=@Email);";
            SqlParameter[] sqlParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email }
            };
            DataTable dataTable = DBLogic.ExecuteQuery(emailExistQuery, sqlParams);

            return dataTable.Rows.Count == 1;
        }

        public static bool EmailIsRegisteredByOther(int userId, string email)
        {
            var query = "SELECT 1 FROM [user] WHERE email = @Email AND [user_id] <> @UserId;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email },
                new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
            };
            var queryResult = DBLogic.ExecuteQuery(query, sqlParams);

            return queryResult.Rows.Count == 1;
        }

        public static string GetUserToken(UserModel user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.name),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Role, user.role_name)
            };
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey));
            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            JwtSecurityToken token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );
            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

        public static UserDataModel GetUserDataFromToken(string tokenString)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtKey));

            tokenHandler.ValidateToken(tokenString, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);

            JwtSecurityToken token = (JwtSecurityToken)validatedToken;
            IEnumerable<Claim> claims = token.Claims;

            UserDataModel userData = new UserDataModel()
            {
                name = claims.First(c => c.Type == ClaimTypes.Name).Value,
                email = claims.First(c => c.Type == ClaimTypes.Email).Value,
                role_name = claims.First(c => c.Type == ClaimTypes.Role).Value
            };

            return userData;
        }

        public static int GetUserIdFromAuthorization(string authorization)
        {
            var jwt = GetJwtFromAuthorization(authorization);
            var userData = GetUserDataFromToken(jwt);
            var userId = GetUserIdByEmail(userData.email);

            return userId;
        }

        public static string GetJwtFromAuthorization(string authorization)
        {
            var jwtRegex = "^bearer (.+)$";
            var match = Regex.Match(authorization, jwtRegex);
            var jwt = match.Groups[1].Value;

            return jwt;
        }

        public static string CreatePasswordResetToken(string userEmail)
        {
            string resetToken = Guid.NewGuid().ToString();
            DateTime expireTime = DateTime.Now.AddDays(1);

            string deleteTokenQuery = "DELETE FROM reset_password_token WHERE email=@Email;";
            SqlParameter[] deleteTokenParams = new SqlParameter[]
            {
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = userEmail },
            };

            string insertTokenQuery = @"
                INSERT INTO reset_password_token(token, expire_time, email)
                VALUES (@Token, @ExpireTime, @Email);
            ";
            SqlParameter[] insertTokenParams = new SqlParameter[]
            {
                new SqlParameter("@Token", SqlDbType.VarChar) { Value = resetToken },
                new SqlParameter("@ExpireTime", SqlDbType.DateTime) { Value = expireTime },
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = userEmail },
            };

            DBLogic.ExecuteNonQueries(
                new string[]
                {
                    deleteTokenQuery,
                    insertTokenQuery,
                },
                new SqlParameter[][]
                {
                    deleteTokenParams,
                    insertTokenParams,
                }
            );

            return resetToken;
        }


    }
}
