import axios from "axios";
import * as envConfig from "../envConfig";

class SMS {

  send(from: string, phone: string, body: string): void {
    axios({
      method: "post",
      url: "https://www.bulksmsnigeria.com/api/v1/sms/create",
      data: {
        api_token: envConfig.smsToken,
        from: from,
        to: phone,
        body: body
      }
    });
  }
}

export { SMS }