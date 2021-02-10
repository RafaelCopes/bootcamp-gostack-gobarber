import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { provider_id } = req.params;
        const { month, year } = req.body;

        const listProviderMonthAvailability = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month,
            year,
        });

        return res.json(availability);
    }
}

export default ProviderMonthAvailabilityController;
