import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import User from '@modules/users/infra/typeorm/entities/User';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2021, 1, 10, 13),
            user_id: '321321',
            provider_id: '123123',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.date).toBeInstanceOf(Date);
        expect(appointment.provider_id).toBe('123123');
    });

    it('should not be able to create two appointments on the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });

        const appointmentDate = new Date(2021, 1, 10, 13);

        await createAppointment.execute({
            date: appointmentDate,
            user_id: '321321',
            provider_id: '123123',
        });

        await expect(
            createAppointment.execute({
                date: appointmentDate,
                user_id: '321321',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 0, 10, 11),
                user_id: '321321',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 10, 13),
                user_id: '321321',
                provider_id: '321321',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 1, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 11, 7),
                user_id: '321321',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2021, 1, 11, 18),
                user_id: '321321',
                provider_id: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
