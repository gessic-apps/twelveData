import express from 'express';
import twelvedataController from '../controllers/twelvedata.controller';
const router = express.Router();

router.get('/twelvedata', twelvedataController.getPrice);

export = router;