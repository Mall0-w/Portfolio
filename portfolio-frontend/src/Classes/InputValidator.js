export class InputValidator{
    static EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    static isValidEmail(email){
        return this.EMAIL_REGEX.test(email)
    }

    static validateContactForm(name, email, message){
        if(! name)
            throw new TypeError("Name cannot be empty")
        else if(!email)  
            throw new TypeError("Email cannot be empty")
        else if(!message)
            throw new TypeError("Message cannot be empty")
        
        if(!InputValidator.isValidEmail(email))
            throw new TypeError("Email must be a valid email")

        return true
    }   
}