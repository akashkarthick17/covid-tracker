import twilio from 'twilio';
import { Service } from 'typedi';

@Service('twilio.service')
export class TwilioService {
  // Twilio client.
  private client: twilio.Twilio;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    this.client = twilio(accountSid, authToken);
  }

  sendMessage(from: string, to: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.messages.create({
        body: message,
        from,
        to,
      }, ((err, message) => {
        if (err) {
          console.error('Error sending the Message', err);
          reject();
        } else {
          if (message?.sid) {
            resolve();
          } else {
            reject();
          }
        }
      }));
    });
  }
}
