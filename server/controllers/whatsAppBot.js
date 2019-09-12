import { google } from 'googleapis';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const {
    SID: TWILIO_ACCOUNT_SID,
    KEY: TWILIO_AUTH_TOKEN,
    APIKEY: API_KEY,
    ENGINE_ID: ENGINE_ID
  } = process.env;
  

  twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  const { MessagingResponse } = twilio.twiml;
  const customsearch = google.customsearch('v1');

  class WhatsAppBot {
    /**
     * @memberof WhatsappBot
     * @param {object} req - Request sent to the route
     * @param {object} res - Response sent from the controller
     * @param {object} next - Error handler
     * @returns {object} - object representing response message
     */
    static async googleSearch(req, res, next) {
        const twiml = new MessagingResponse();
        const msg = req.body.Body;
        const options = { ENGINE_ID, msg, auth: API_KEY };

        try {
        const result = await customsearch.cse.list(options);
        const firstResult = result.data.items[0];
        const searchData = firstResult.snippet;
        const link = firstResult.link;

        twiml.message(`${searchData} ${link}`);

        res.set('Content-Type', 'text/xml');

        return res.status(200).send(twiml.toString());
        } catch (error) {
        return next(error);
        }
    }
  }