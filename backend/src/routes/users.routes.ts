import { Router } from 'express';
import multer from 'multer';

import ensureAuthenticaded from '../middlewares/ensureAuthenticaded';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return res.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    async (req, res) => {
        const updateAvatar = new UpdateUserAvatarService();

        const user = await updateAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        });

        delete user.password;

        return res.json(user);
    },
);

export default usersRouter;
