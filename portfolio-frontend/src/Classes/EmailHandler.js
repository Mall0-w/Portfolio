export class EmailHandler{

    static sendContactEmails(Name, ToAddress, Message){
        return fetch(`${process.env.REACT_APP_BACKEND}/contact`,
            {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    Name,
                    ToAddress,
                    Message
                })
            }
        )
    }
}