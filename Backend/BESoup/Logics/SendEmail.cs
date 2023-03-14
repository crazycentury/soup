using System;
using BESoup.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using MimeKit;

namespace BESoup.Logics
{
    public static class SendEmail
    {
        public static IConfiguration _configuration;
        private static string _email;
        private static string _password;
        private static string _frontUrl;


        public static void SetConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
            _email = configuration["Email:Email"];
            _password = configuration["Email:Password"];
            _frontUrl = configuration["Frontend:Origin"];
        }

        public static void SendResetPasswordToken(string userEmail, string token)
        {
            string userName = AuthLogic.GetUserNameByEmail(userEmail);
            string url = $"{_frontUrl}/resetpassword/{token}";
            string subject = "Reset Password";
            string bodyHtml = @$"
                <table>
                    <h1 style='color:#5B4947; margin-left:250px; font-size:60px;  margin-bottom:100px'>SOUP</h1>
                    <h3 style='margin-left:100px;'>Permintaan Reset Password</h3>
                    <p style='margin-left:100px;'>
                        Hi, {userName}<br><br>
                        Seseorang telah meminta untuk merubah password akun SOUP anda.<br><br>
                        Jika anda tidak membuat permintaan ini, mohon untuk mengabaikan email ini.<br><br>
                        Anda bisa mereset password anda dengan menekan tombol di bawah ini:
                    </p>
                    <a href={url}><button  style='margin-left:300px; color:#5B4947; background-color:#FABC1D; border:none; border-radius:20px; width:100px; height:50px; cursor:pointer;'>Reset password</button></a>
                    <p style='margin-left:100px; margin-right:150px;'>Jika anda kesulitan menggunakan tombol di atas, anda bisa copy paste url <br>di bawah ini ke browser anda:<br>{url}</p>
                    <p style='margin-left:100px; margin-top:25px; '>Love, <br><br><br>SOUP Website</p>
                </table>
            ";

            SendEmailVerif(userEmail, subject, bodyHtml);
        }

        public static void SendUserVerificationToken(RegistrationModel registration, string token)
        {
            string emailTo = registration.email;
            string emailSubject = "Account activation";
            string verificationUrl = _frontUrl + "/verification/" + token;
            string emailBody = @$"<table>
                <h1 style='color:#5B4947; margin-left:250px; font-size:60px;  margin-bottom:100px'>SOUP</h1>
                <h3 style='margin-left:100px;'>Aktifkan Akun Anda</h3>
                <p style='margin-left:100px;'>Hi, {registration.name}  <br><br>Terima kasih sudah mau bergabung dengan SOUP. mohon untuk menekan tombol <br>di bawah.</p>
                <a href={verificationUrl}><button  style='margin-left:300px; color:#5B4947; background-color:#FABC1D; border:none; border-radius:20px; width:100px; height:50px; cursor:pointer;'>Konfirmasi</button></a>
                <p style='margin-left:100px; margin-right:150px;'>Jika anda kesulitan menggunakan tombol di atas, anda bisa copy paste url <br>di bawah ini ke browser anda:<br>{verificationUrl}</p>
                <p style='margin-left:100px; margin-top:25px; '>Love, <br><br><br>SOUP Website</p>
            </table>";

            try
            {
                SendEmailVerif(registration.email, "VERIFY YOUR EMAIL", emailBody);
            } catch
            {
                throw new Exception("SEND EMAIL FAILED");
            }
        }

        public static bool SendEmailVerif(string emailTo, string subjectText, string bodyHtml)
        {
            try
            {
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(_email));
                email.To.Add(MailboxAddress.Parse(emailTo));
                email.Subject = subjectText;
                email.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = bodyHtml };

                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate(_email, _password);
                smtp.Send(email);
                smtp.Disconnect(true);

                return true;
            }
            catch
            {
                throw;
            }
        }
    }
}

