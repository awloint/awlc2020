import { Delegate } from "../entity/Delegate";
import { Newsletter } from "./newsletter";
import { SMS } from "./sms";
import { Email } from "./email";
import * as cancelledEmail from "../emails/cancelledRegistration";
import * as successEmail from "../emails/successfulRegistration";

class SendSmsEmail {
    email_sms(delegate: Delegate, status:any) {
        const name = `${delegate.firstName} ${delegate.lastName}`;
        let newsletter: Newsletter = new Newsletter();


        let sms: SMS = new SMS();
        let email: Email = new Email();

        if(status === "verified"){
            //add user to mailing list
            newsletter.addToList(
                delegate.firstName,
                delegate.lastName,
                name,
                delegate.email,
                delegate.phone,
                delegate.country,
                "12024"
            );
                //send sms
            sms.send(
                "AWLOInt",
                delegate.phone,
                `Dear ${name}, thank you for registering for the AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. Please check your email for more details.
        #AWLCSierraLeone2020.
        `
            );
            //send email
            email.sendWithoutAttachment(
                delegate.firstName,
                delegate.lastName,
                delegate.email,
                "African Women in Leadership Organisation",
                "info@awlo.org",
                "#AWLCSierraLeone2020: Registration Successful!",
                successEmail.textBodySuccess(delegate.firstName, delegate.lastName),
                successEmail.htmlBodySuccess(delegate.firstName, delegate.lastName)
            );
        }
        else{
            //add user to mailing list
            newsletter.addToList(
                delegate.firstName,
                delegate.lastName,
                name,
                delegate.email,
                delegate.phone,
                delegate.country,
                "12025"
            );
            sms.send(
                "AWLOInt",
                delegate.phone,
                `Dear ${name}, thank you for taking steps to register for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. To complete your registration, kindly visit https://awlo.org/awlc/awlc2020
        #AWLCSierraLeone2020.
        `
            );

            email.sendWithoutAttachment(
                delegate.firstName,
                delegate.lastName,
                delegate.email,
                "African Women in Leadership Organisation",
                "info@awlo.org",
                "#AWLCSierraLeone2020: Your Registration is not complete",
                cancelledEmail.textBodyCancelled(delegate.firstName, delegate.lastName),
                cancelledEmail.htmlBodyCancelled(delegate.firstName, delegate.lastName)
            );
        }

    }
}
export { SendSmsEmail }