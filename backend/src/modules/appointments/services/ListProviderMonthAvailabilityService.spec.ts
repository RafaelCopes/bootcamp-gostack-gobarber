import 'reflect-metadata';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 9, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 11, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 12, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 16, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 10, 17, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2021, 1, 11, 8, 0, 0),
        });

        const availabilidy = await listProviderMonthAvailability.execute({
            provider_id: 'provider',
            year: 2021,
            month: 2,
        });

        expect(availabilidy).toEqual(
            expect.arrayContaining([
                { day: 9, available: true },
                { day: 10, available: false },
                { day: 11, available: true },
                { day: 12, available: true },
            ]),
        );
    });
});
