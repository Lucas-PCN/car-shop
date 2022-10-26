import { z } from 'zod';
import { VehicleSchema } from './IVehicle';

const CarSchema = VehicleSchema.extend({
  doorsQty: z.number().min(2).max(4),
  seatsQty: z.number().min(2).max(7),
});

type ICar = z.infer<typeof CarSchema>;

export { CarSchema, ICar };