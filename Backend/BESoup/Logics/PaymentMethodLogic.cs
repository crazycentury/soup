using System;
using System.Data;
using System.Data.SqlClient;
using BESoup.Models;

namespace BESoup.Logics
{
    public class PaymentMethodLogic
    {
        public static void SetPaymentMethod(string name, string image)
        {
            string query = "INSERT INTO payment_method([name], [image], [active]) VALUES (@name, @image, @active)";
            SqlParameter[] sqlParams = new SqlParameter[]
            {
                new SqlParameter("@name", SqlDbType.VarChar) { Value = name },
                new SqlParameter("@image", SqlDbType.VarChar) { Value = image },
                new SqlParameter("@active", SqlDbType.Bit) { Value = true }
            };
            DBLogic.ExecuteNonQuery(query, sqlParams);
        }

        public static List<PaymentMethodModel> GetAllPaymentMethod()
        {
            var payment = new List<PaymentMethodModel>();

            var query = @"SELECT*FROM payment_method;";

            var paymentdata = DBLogic.ExecuteQuery(query);

            foreach (DataRow paymentRow in paymentdata.Rows)
            {
                var paymentmet = new PaymentMethodModel
                {
                    payment_method_id = (int)paymentRow["payment_method_id"],
                    name = (string)paymentRow["name"],
                    image = (string)paymentRow["image"],
                    active = (bool)paymentRow["active"]
                };
                payment.Add(paymentmet);
            }

            return payment;
        }

        public static void EditPaymentMethod(int payment_method_id, string name, string image)
        {
            var query = @"UPDATE payment_method SET [name]=@name, [image]=@image WHERE payment_method_id = @payment_method_id;";

            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@name", SqlDbType.VarChar) { Value = name },
                new SqlParameter("@image", SqlDbType.VarChar) { Value = image },
                new SqlParameter("@payment_method_id", SqlDbType.Int) { Value = payment_method_id },
            };

            DBLogic.ExecuteNonQuery(query, sqlParams);
        }

        public static void SetPaymentMethodStatus(int payment_method_id, bool active)
        {
            var query = "UPDATE payment_method SET active = @active WHERE payment_method_id = @payment_method_id;";
            var sqlParams = new SqlParameter[]
            {
                new SqlParameter("@active", SqlDbType.Bit) { Value = active },
                new SqlParameter("@payment_method_id", SqlDbType.Int) { Value = payment_method_id }
            };
            DBLogic.ExecuteNonQuery(query, sqlParams);

        }
    }
};
