import express from 'express'
const router = express.Router()
import { AvatarController } from '../controllers/avatar-controller'

// router.use(auth.verifyToken)

router.get('/avatars', AvatarController.getAllAvatars);
router.post('/updateAvatarList', AvatarController.updateAvatarList);

export default router