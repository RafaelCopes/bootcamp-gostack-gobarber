import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviders = new ListProvidersService(
            fakeUsersRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the providers', async () => {
        const firstUser = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@gmail.com',
            password: '123456',
        });

        const secondUser = await fakeUsersRepository.create({
            name: 'John Trê',
            email: 'johntre@gmail.com',
            password: '123456',
        });

        const loggedInUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@gmail.com',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedInUser.id,
        });

        expect(providers).toEqual([firstUser, secondUser]);
    });
});
