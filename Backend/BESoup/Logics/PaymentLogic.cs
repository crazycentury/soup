using BESoup.Models;
using System.Data;
using System.Data.SqlClient;

namespace BESoup.Logics
{
    public static class PaymentLogic
    {
        public static void Pay(CheckoutModel checkout)
        {
            using (var conn = DBLogic.NewConnection())
            {
                conn.Open();
                var transaction = conn.BeginTransaction();

                try
                {
                    var invoiceId = CreateNewInvoice(conn, transaction, checkout);
                    PayCheckoutItems(conn, transaction, checkout, invoiceId);
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
        }

        private static int CreateNewInvoice(SqlConnection conn, SqlTransaction transaction, CheckoutModel checkout)
        {
            var insertInvoiceQuery = @"
                INSERT INTO invoice(fk_user_id, fk_payment_method_id, no_invoice, [date])
                VALUES (@UserId, @PaymentMethodId, @NoInvoice, @Date);
            ";
            var invoiceIdQuery = "SELECT CAST(IDENT_CURRENT('invoice') AS INT);";

            var prevInvoiceId = (int)DBLogic.ExecuteScalar(invoiceIdQuery);
            var noInvoice = GetInvoiceNumber(prevInvoiceId + 1);

            var insertInvoiceParams = new SqlParameter[]
            {
                new SqlParameter("@UserId", SqlDbType.Int) { Value = checkout.fk_user_id },
                new SqlParameter("@PaymentMethodId", SqlDbType.Int) { Value = checkout.fk_payment_method_id },
                new SqlParameter("@NoInvoice", SqlDbType.VarChar) { Value = noInvoice },
                new SqlParameter("@Date", SqlDbType.Date) { Value = DateTime.Now },
            };
            DBLogic.ExecuteNonQuery(insertInvoiceQuery, conn, transaction, insertInvoiceParams);

            var invoiceId = (int)DBLogic.ExecuteScalar(invoiceIdQuery, conn, transaction);
            return invoiceId;
        }

        private static void PayCheckoutItems(SqlConnection conn, SqlTransaction transaction, CheckoutModel checkout, int invoiceId)
        {
            var checkDetailInvoiceQuery = @"
                SELECT c.name
                FROM detail_invoice d
                JOIN invoice i ON d.fk_invoice_id = i.invoice_id
                JOIN course c ON d.fk_course_id = c.course_id
                WHERE
                    i.fk_user_id = @UserId AND
                    d.fk_course_id = @CourseId AND
                    d.schedule = @Schedule;
            ";
            var insertDetailInvoiceQuery = @"
                INSERT INTO detail_invoice(fk_invoice_id, fk_course_id, schedule)
                VALUES (@InvoiceId, @CourseId, @Schedule);
            ";

            foreach (var checkoutItem in checkout.items)
            {
                var checkDetailInvoiceParams = new SqlParameter[]
                {
                    new SqlParameter("@UserId", SqlDbType.Int) { Value = checkout.fk_user_id },
                    new SqlParameter("@CourseId", SqlDbType.Int) { Value = checkoutItem.fk_course_id },
                    new SqlParameter("@Schedule", SqlDbType.Date) { Value = checkoutItem.schedule },
                };
                var detailInvoiceData = DBLogic.ExecuteQuery(checkDetailInvoiceQuery, conn, transaction, checkDetailInvoiceParams);

                // User has purchased the item with the same schedule
                if (detailInvoiceData.Rows.Count != 0)
                {
                    var courseName = detailInvoiceData.Rows[0]["name"];
                    throw new Exception($"You have already purchased {courseName} course scheduled at {checkoutItem.schedule}");
                }

                var insertDetailInvoiceParams = new SqlParameter[]
                {
                    new SqlParameter("@InvoiceId", SqlDbType.Int) { Value = invoiceId },
                    new SqlParameter("@CourseId", SqlDbType.Int) { Value = checkoutItem.fk_course_id },
                    new SqlParameter("@Schedule", SqlDbType.Date) { Value = checkoutItem.schedule },
                };
                DBLogic.ExecuteNonQuery(insertDetailInvoiceQuery, conn, transaction, insertDetailInvoiceParams);
            }
        }

        private static string GetInvoiceNumber(int invoiceId)
        {
            var paddedId = invoiceId.ToString().PadLeft(5, '0');
            return $"SOU{paddedId}";
        }
    }
}
