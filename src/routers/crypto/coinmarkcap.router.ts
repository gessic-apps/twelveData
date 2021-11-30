import express from 'express';
import coinmarkcapController from '../../controllers/crypto/coinmarkcap.controller';
const router = express.Router();

router.get('/', coinmarkcapController.getPrice);

export = router;
