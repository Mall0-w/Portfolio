using DotNetEnv;
using System.Text.Json;
using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using Emails.Models;
using Global.Helpers;
namespace AWS.Services;

public class SESService{
    private static string privateKey= Env.GetString("SES_SECRET_KEY");
    private static string accessKey=Env.GetString("SES_PUBLIC_KEY");
    private static string mailer=Env.GetString("SES_MAILER");
    private static string personalMail = "kylelewis@rogers.com";

    private ILogger logger;

    private static SESService? singleton = null;
    private AmazonSimpleEmailServiceClient client;

    public SESService(ILogger<SESService> logger){
        this.client = new AmazonSimpleEmailServiceClient(accessKey, privateKey, Amazon.RegionEndpoint.CACentral1);
        this.logger = logger;
    }

    public async Task<SendEmailResponse[]> HandleContactExchange(ContactEmailReq req){

        var personal = this.ForwardEmailToPersonal($"{req.Name} saw your website and wants to reach out!", req.ToAddress, req.Message);
        var recipient = this.SendTextEmail(req.ToAddress, "Thank you for reaching out", 
        @"Thank you for seeing my website and reaching out!
        This is an automated message to let you know that your message has been sent.
        I'll try to get in touch with you shortly");

       return await Task.WhenAll(personal, recipient);
    }

    public async Task<SendEmailResponse> SendTextEmail(string toAddress, string subject, string body){
        return await this.client.SendEmailAsync(createTextEmail(toAddress, subject, body));
    }

    private async Task<SendEmailResponse> ForwardEmailToPersonal(string subject, string contactEmail, string body){
        return  await this.client.SendEmailAsync(createTextEmail(personalMail, subject, $"Email: {contactEmail}\n" + body));
    }

    private SendEmailRequest createTextEmail(string toAddress, string subject, string body){
        if(!InputValidator.IsValidEmail(toAddress))
            throw new ArgumentException("toAddress must be a valid email");

        var dest =new Destination(new List<string>() { toAddress.ToLower() });
        var emailSubject = new Content(subject);
        var emailBody = new Body(new Content(body));

        var message = new Message(emailSubject, emailBody);

        logger.LogInformation(string.Join(",",dest.ToAddresses));
        logger.LogInformation(mailer);
        return new SendEmailRequest(mailer, dest, message);
    }


   
}