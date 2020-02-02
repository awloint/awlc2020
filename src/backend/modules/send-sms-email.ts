import { Delegate } from "../entity/Delegate";
import { Newsletter } from "./newsletter";
import { SMS } from "./sms";
import { Email } from "./email";
import * as cancelledEmail from "../emails/cancelledRegistration";
import * as successEmail from "../emails/successfulRegistration";

let name = (firstName: string, lastName: string): string => {
    return `${firstName} ${lastName}`;
};
class SendSmsEmail {
    email_sms(delegate: Delegate) {
        let newsletter: Newsletter = new Newsletter();
        newsletter.addToList(
            delegate.firstName,
            delegate.lastName,
            name(delegate.firstName, delegate.lastName),
            delegate.email,
            delegate.phone,
            delegate.country,
            "12025"
        );

        let sms: SMS = new SMS();
        let email: Email = new Email();

        sms.send(
            "AWLOInt",
            delegate.phone,
            `Dear ${name(
                delegate.firstName,
                delegate.lastName
            )}, thank you for taking steps to register for AWLC Sierra Leone 2020 holding from 2nd – 5th April 2020 at Freetown International Convention Center, Bintumani. To complete your registration, kindly visit https://awlo.org/awlc/awlc2020
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
export { SendSmsEmail }