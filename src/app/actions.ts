
'use server';

import { estimateFare } from '@/ai/flows/estimate-fare';
import { z } from 'zod';

const FormSchema = z.object({
  pickupLocation: z.string().min(1, 'Pickup location is required.'),
  dropoffLocation: z.string().min(1, 'Dropoff location is required.'),
});

export type FareEstimateState = {
  estimatedFare?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  error?: string;
  success: boolean;
};

export async function handleEstimateFare(
  prevState: FareEstimateState,
  formData: FormData
): Promise<FareEstimateState> {
  const validatedFields = FormSchema.safeParse({
    pickupLocation: formData.get('pickupLocation'),
    dropoffLocation: formData.get('dropoffLocation'),
  });

  if (!validatedFields.success) {
    return {
      error: "Both pickup and dropoff locations are required.",
      success: false,
    };
  }

  const { pickupLocation, dropoffLocation } = validatedFields.data;

  try {
    const result = await estimateFare({ pickupLocation, dropoffLocation });
    return {
      estimatedFare: result.estimatedFare,
      pickupLocation,
      dropoffLocation,
      success: true,
    };
  } catch (e) {
    return {
      error: 'Failed to estimate fare. Please try again.',
      success: false,
    };
  }
}
