using BESoup.Models;
using System.Data;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;

namespace BESoup.Logics
{
    public static class AdminLogic
    {
        public static List<AdminUserModel> GetAllUsers()
        {
            var users = new List<AdminUserModel>();

            var query = @"
                SELECT
                    u.[user_id],
                    u.email,
                    u.[name],
                    u.active,
                    u.fk_role_id,
                    r.[name] AS role_name
                FROM [user] u
                JOIN [role] r ON u.fk_role_id = r.role_id;
            ";
            var usersData = DBLogic.ExecuteQuery(query);

            foreach (DataRow userRow in usersData.Rows)
            {
                var user = new AdminUserModel
                {
                    user_id = (int)userRow["user_id"],
                    email = (string)userRow["email"],
                    name = (string)userRow["name"],
                    active = (bool)userRow["active"],
                    fk_role_id = (int)userRow["fk_role_id"],
                    role_name = (string)userRow["role_name"]
                };
                users.Add(user);
            }

            return users;
        }

        public static void SetUserActive(int userId, bool active)
        {
            var query = "UPDATE [user] SET active = @Active WHERE [user_id] = @UserId;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@Active", SqlDbType.Bit) { Value = active },
                new SqlParameter("@UserId", SqlDbType.Int) { Value = userId }
            };
            DBLogic.ExecuteNonQuery(query, sqlParams);
        }

        public static void AddUser(int roleId, string name, string email, string password)
        {
            byte[] salt;
            byte[] hash;
            CryptoLogic.GetSaltAndHashSHA512(password, out hash, out salt);

            var query = @"
                INSERT INTO [user](fk_role_id, email, [name], password_hash, password_salt, active)
                VALUES (@RoleId, @Email, @Name, @PassHash, @PassSalt, 0);
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@RoleId", SqlDbType.Int) { Value = roleId },
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email },
                new SqlParameter("@Name", SqlDbType.VarChar) { Value = name },
                new SqlParameter("@PassHash", SqlDbType.VarBinary) { Value = hash },
                new SqlParameter("@PassSalt", SqlDbType.VarBinary) { Value = salt },
            };

            DBLogic.ExecuteNonQuery(query, sqlParams);
        }

        public static void EditUser(int userId, int roleId, string name, string email, string password)
        {
            byte[] salt;
            byte[] hash;
            CryptoLogic.GetSaltAndHashSHA512(password, out hash, out salt);

            var query = @"
                UPDATE [user]
                SET
                    fk_role_id = @RoleId,
                    email = @Email,
                    [name] = @Name,
                    password_hash = @PassHash,
                    password_salt = @PassSalt
                WHERE [user_id] = @UserId;
            ";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@RoleId", SqlDbType.Int) { Value = roleId },
                new SqlParameter("@Email", SqlDbType.VarChar) { Value = email },
                new SqlParameter("@Name", SqlDbType.VarChar) { Value = name },
                new SqlParameter("@PassHash", SqlDbType.VarBinary) { Value = hash },
                new SqlParameter("@PassSalt", SqlDbType.VarBinary) { Value = salt },
                new SqlParameter("@UserId", SqlDbType.Int) { Value = userId },
            };

            DBLogic.ExecuteNonQuery(query, sqlParams);
        }
    }
}
