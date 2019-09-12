import { Router } from 'express';
import WhatsAppBot from '../controllers/whatsAppBot';

const botRouter = Router();

botRouter.post('/incoming', 
    function(req, res){
        return WhatsAppBot.googleSearch
    });

export default botRouter;