import axios from "axios";
import { Delegate } from "../entity/Delegate";
import * as envConfig from "../envConfig";

const name = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
};

class Payment {
  start(delegate: Delegate, amount: number, currency: string): Promise<any> {
    let txref: string =
      "AWLCSierra2020-" + Math.floor(Math.random() * 68954123) + 123145;
    if (delegate.country !== "Nigeria") {
      currency = "USD";
    }

    if (currency == "USD") {
      amount = 350;
    }

    return axios({
      method: "post",
      url: "https://api.ravepay.co/flwv3-pug/getpaidx/api/v2/hosted/pay",
      data: {
        amount: amount,
        customer_email: delegate.email,
        customer_phone: delegate.phone,
        customer_firstname: delegate.firstName,
        customer_lastname: delegate.lastName,
        custom_title: "AWLCSierraLeone2020",
        custom_logo: "https://awlo.org/wp-content/uploads/2019/01/awlox120.png",
        custom_description: "African Women in Leadership Conference 2020",
        currency: currency,
        txref: txref,
        PBFPubKey: envConfig.raveKey,
        redirect_url: "http://localhost:3000/verify",
        subaccounts: [
          {
            id: "RS_D68E8E1087312CB80F3BD77721EEA468"
          }
        ]
      }
    })
  }
}

export { Payment };
