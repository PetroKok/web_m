import express from 'express'
import {multerupload} from '../settings/multer-setting'
import {uploadFiles, getSomeMusic, removeMusic} from './Music'

let router = express.Router();

router.post("/upload-files", multerupload.any(), uploadFiles);
router.post("/load-music", getSomeMusic);
router.post("/remove/:id", removeMusic);

export default router
