import 'reflect-metadata';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const firstAppointment = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 11, 8, 0, 0),
        });

        const secondAppointment = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 11, 14, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'provider',
            day: 11,
            year: 2021,
            month: 2,
        });

        expect(appointments).toEqual([firstAppointment, secondAppointment]);
    });
});
