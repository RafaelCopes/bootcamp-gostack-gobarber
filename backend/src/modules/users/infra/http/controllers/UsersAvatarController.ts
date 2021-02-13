import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

class UsersAvatarController {
    public async create(req: Request, res: Response): Promise<Response> {
        const updateAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file.filename,
        });

        return res.json(classToClass(user));
    }
}

export default UsersAvatarController;
