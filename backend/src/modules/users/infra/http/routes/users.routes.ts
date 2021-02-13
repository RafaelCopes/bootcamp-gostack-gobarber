import { Router } from 'express';

import multer from 'multer';

import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticaded';

import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UsersAvatarController from '@modules/users/infra/http/controllers/UsersAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensureAuthenticaded,
    upload.single('avatar'),
    usersAvatarController.create,
);

export default usersRouter;
