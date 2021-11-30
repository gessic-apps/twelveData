import express from 'express';
import twelvedataController from '../../controllers/crypto/twelvedata.controller';
const router = express.Router();

router.get('/', twelvedataController.getPrice);

export = router;
