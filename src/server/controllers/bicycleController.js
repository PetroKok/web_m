import express from 'express'
import {multerPhotos} from '../settings/multer-setting'
import {uploadBicycle, getBicycles, getBicycleById, removeBicycle} from './Bicycle'

let router = express.Router()

router.post("/upload-bicycle", multerPhotos.any(), uploadBicycle)
router.post("/bicycles/:count/:skp", getBicycles)
router.post("/bicycle/:id", getBicycleById)
router.post("/remove-bicycle/:id", removeBicycle)

export default router
