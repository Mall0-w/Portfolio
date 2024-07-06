using System.Net.Mail;
using System.Text.RegularExpressions;

namespace Global.Helpers;

public static class InputValidator{
    public static bool IsValidEmail(string email){
        return MailAddress.TryCreate(email, out _);
    }
}