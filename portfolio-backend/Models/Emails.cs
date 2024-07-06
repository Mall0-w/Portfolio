namespace Emails.Models;
public class ContactEmailReq{
    public required string Name {get; set;}
    public required string ToAddress {get; set;}
    public required string Message {get; set;}
}