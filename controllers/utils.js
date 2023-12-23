require("dotenv/config");
const https = require("https");

class Paystack {
  constructor() {
    this.url = "api.paystack.co";
    this.authorization = `Bearer ${process.env.PAYSTACK_SECRET}`;
    this.channels = ["card", "bank_transfer", "ussd"];
  }

  initialize(paymentParams) {
    return new Promise((resolve, reject) => {
      paymentParams.channels = this.channels;
      const params = JSON.stringify(paymentParams);

      const options = {
        hostname: this.url,
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization: this.authorization,
          "Content-Type": "application/json",
        },
      };

      const req = https
        .request(options, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            const responseData = JSON.parse(data);
            resolve(responseData);
          });
        })
        .on("error", (error) => {
          reject(error);
        });

      req.write(params);
      req.end();
    });
  }
}

module.exports = Paystack;

