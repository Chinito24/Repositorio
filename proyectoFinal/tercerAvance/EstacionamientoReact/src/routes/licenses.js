import { Router } from 'express';
import { getLicenses, getLicense, saveLicense, deleteLicense, updateLicense } from '../controllers/licenses';

const router = Router();

router.get('/licenses', getLicenses);
router.get('/licenses/:id', getLicense);

router.post('/licenses', saveLicense);
router.delete('/licenses/:id', deleteLicense);
router.put('/licenses/:id', updateLicense);

export default router;
