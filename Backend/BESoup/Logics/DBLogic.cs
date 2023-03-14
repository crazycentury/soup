using System.Data;
using System.Data.SqlClient;

namespace BESoup.Logics
{
    public static class DBLogic
    {
        private static string ConnString;

        public static void SetConfiguration(IConfiguration configuration)
        {
            ConnString = configuration["ConnectionStrings:Default"];
        }

        public static SqlConnection NewConnection()
        {
            return new SqlConnection(ConnString);
        }

        public static DataTable ExecuteQuery(string query, SqlParameter[] sqlParams = null) {
            DataTable result = new DataTable();

            using (SqlConnection conn = NewConnection())
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    if (sqlParams != null) cmd.Parameters.AddRange(sqlParams);

                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(result);
                }

                conn.Close();
            }

            return result;
        }

        public static DataTable ExecuteQuery(string query, SqlConnection conn, SqlTransaction? transaction, SqlParameter[] sqlParams = null)
        {
            var result = new DataTable();

            using (var cmd = new SqlCommand(query, conn))
            {
                cmd.Transaction = transaction;

                if (sqlParams != null) cmd.Parameters.AddRange(sqlParams);

                var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(result);
            }

            return result;
        }

        public static object ExecuteScalar(string query, SqlParameter[] sqlParams = null)
        {
            object result = null;

            using (SqlConnection conn = NewConnection())
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    if (sqlParams != null) cmd.Parameters.AddRange(sqlParams);

                    result = cmd.ExecuteScalar();
                }

                conn.Close();
            }

            return result;
        }

        public static object ExecuteScalar(string query, SqlConnection conn, SqlTransaction? transaction, SqlParameter[] sqlParams = null)
        {
            object result = null;

            using (var cmd = new SqlCommand(query, conn))
            {
                cmd.Transaction = transaction;

                if (sqlParams != null) cmd.Parameters.AddRange(sqlParams);

                result = cmd.ExecuteScalar();
            }

            return result;
        }

        public static void ExecuteNonQueries(string[] queries, SqlParameter[][] sqlParamsArr)
        {
            using (SqlConnection conn = NewConnection())
            {
                conn.Open();
                SqlTransaction transaction = conn.BeginTransaction();

                try
                {
                    for (int i = 0; i < queries.Length; i++)
                    {
                        ExecuteNonQuery(queries[i], conn, transaction, sqlParamsArr[i]);
                    }
                    transaction.Commit();
                } catch (Exception)
                {
                    try
                    {
                        transaction.Rollback();
                    } catch (Exception)
                    {
                        throw;
                    }

                    throw;
                } finally
                {
                    conn.Close();
                }
            }
        }

        public static void ExecuteNonQuery(string query, SqlParameter[] sqlParams = null)
        {
            using (SqlConnection conn = NewConnection())
            {
                conn.Open();
                ExecuteNonQuery(query, conn, null, sqlParams);
                conn.Close();
            }
        }

        public static void ExecuteNonQuery(string query, SqlConnection conn, SqlTransaction? transaction, SqlParameter[] sqlParams = null)
        {
            using (SqlCommand cmd = new SqlCommand(query, conn))
            {
                cmd.Transaction = transaction;

                if (sqlParams != null) cmd.Parameters.AddRange(sqlParams);

                cmd.ExecuteNonQuery();
            }
        }
    }
}
