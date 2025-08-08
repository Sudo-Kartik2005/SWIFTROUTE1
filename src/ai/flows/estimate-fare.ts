'use server';
/**
 * @fileOverview Estimates the fare for a ride based on the pickup and dropoff locations.
 *
 * - estimateFare - A function that estimates the fare for a ride.
 * - EstimateFareInput - The input type for the estimateFare function.
 * - EstimateFareOutput - The return type for the estimateFare function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateFareInputSchema = z.object({
  pickupLocation: z
    .string()
    .describe('The latitude and longitude of the pickup location.'),
  dropoffLocation: z
    .string()
    .describe('The latitude and longitude of the dropoff location.'),
  vehicleType: z
    .string()
    .describe('The type of vehicle selected by the user (e.g., Economy, Premium, SUV).'),
});
export type EstimateFareInput = z.infer<typeof EstimateFareInputSchema>;

const EstimateFareOutputSchema = z.object({
  estimatedFare: z
    .number()
    .describe('The estimated fare for the ride in Indian Rupees (INR).'),
});
export type EstimateFareOutput = z.infer<typeof EstimateFareOutputSchema>;

export async function estimateFare(input: EstimateFareInput): Promise<EstimateFareOutput> {
  return estimateFareFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateFarePrompt',
  input: {schema: EstimateFareInputSchema},
  output: {schema: EstimateFareOutputSchema},
  prompt: `You are an expert fare estimator for a ride-sharing app operating in India.

  Given the pickup and dropoff locations, and the vehicle type, estimate the fare for the ride in Indian Rupees (INR).
  Take into account distance, time, and real-time traffic data for Indian cities.

  Apply the following multipliers based on vehicle type:
  - Economy: 1x
  - Premium: 1.5x
  - SUV: 2x

  Pickup Location: {{{pickupLocation}}}
  Dropoff Location: {{{dropoffLocation}}}
  Vehicle Type: {{{vehicleType}}}

  Estimated Fare:`,
});

const estimateFareFlow = ai.defineFlow(
  {
    name: 'estimateFareFlow',
    inputSchema: EstimateFareInputSchema,
    outputSchema: EstimateFareOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
