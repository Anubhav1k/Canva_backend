import express from 'express';
const router = express.Router();

import { get } from '../Controllers/get-controller.js';
import { Template } from '../Controllers/templates-controller.js';
import { check } from '../Controllers/check.js';
import { Alltemplates } from '../Controllers/all-templates.js';
import {  download_image } from '../Controllers/download_image.js';
import { download_pdf } from '../Controllers/download_pdf.js';
import { Backup } from '../Controllers/backup.js';

router.post('/api/get',get)
router.post('/api/single',Backup)
router.get('/api/check',check)
router.get("/api/alltemplates",Alltemplates)
router.post('/api/addtemplates',Template)



router.post('/api/download',download_image)
router.post('/api/download_pdf',download_pdf)



export default router;
