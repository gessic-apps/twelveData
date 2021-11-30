import express from 'express';
import healthController from '../../controllers/health/health.controller';
const router = express.Router();

router.get('/', healthController.getHealth);

export = router;
