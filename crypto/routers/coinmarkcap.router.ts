import express from 'express';
import coinmarkcapController from '../controllers/coinmarkcap.controller';
const router = express.Router();

router.get('/coinmark', coinmarkcapController.getPrice);

export = router;