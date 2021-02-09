import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listProviders = new ListProvidersService(fakeUsersRepository);
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
