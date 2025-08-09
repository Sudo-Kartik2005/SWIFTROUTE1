
'use server';

import { estimateFare } from '@/ai/flows/estimate-fare';
import { getAddressFromCoords } from '@/ai/flows/get-address-from-coords';
import { z } from 'zod';
import { auth, db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp, where } from 'firebase/firestore';

const FormSchema = z.object({
  pickupLocation: z.string().min(1, 'Pickup location is required.'),
  dropoffLocation: z.string().min(1, 'Dropoff location is required.'),
  vehicleType: z.string().min(1, 'Vehicle type is required.'),
  isConfirmation: z.string().optional(),
});

export type FareEstimateState = {
  estimatedFare?: number;
  pickupLocation?: string;
  dropoffLocation?: string;
  vehicleType?: string;
  error?: string;
  success: boolean;
  isConfirmation?: boolean;
};

export async function handleEstimateFare(
  prevState: FareEstimateState,
  formData: FormData
): Promise<FareEstimateState> {
  const validatedFields = FormSchema.safeParse({
    pickupLocation: formData.get('pickupLocation'),
    dropoffLocation: formData.get('dropoffLocation'),
    vehicleType: formData.get('vehicleType'),
    isConfirmation: formData.get('isConfirmation'),
  });

  if (!validatedFields.success) {
    return {
      error: "All fields are required. Please select a vehicle type.",
      success: false,
    };
  }

  const { pickupLocation, dropoffLocation, vehicleType, isConfirmation } = validatedFields.data;

  // If this is a confirmation, we already have the fare.
  // We just need to pass the data along to the confirmation page.
  if (isConfirmation === 'true') {
    return {
        ...prevState,
        isConfirmation: true,
    }
  }


  try {
    const result = await estimateFare({ pickupLocation, dropoffLocation, vehicleType });
    return {
      estimatedFare: result.estimatedFare,
      pickupLocation,
      dropoffLocation,
      vehicleType,
      success: true,
      isConfirmation: false,
    };
  } catch (e) {
    return {
      error: 'Failed to estimate fare. Please try again.',
      success: false,
    };
  }
}

export async function fetchAddressFromCoords(latitude: number, longitude: number): Promise<{ address?: string; error?: string }> {
    try {
        const result = await getAddressFromCoords({ latitude, longitude });
        return { address: result.address };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to fetch address from coordinates.' };
    }
}

interface TripData {
  pickup: string;
  dropoff: string;
  fare: number;
  vehicleType: string;
}

export async function saveTrip(tripData: TripData) {
    const user = auth.currentUser;
    if (!user) {
        return { error: 'User not authenticated' };
    }

    try {
        await addDoc(collection(db, 'users', user.uid, 'trips'), {
            ...tripData,
            createdAt: serverTimestamp(),
        });
        return { success: true };
    } catch (error) {
        console.error("Error saving trip to Firestore:", error);
        return { error: 'Failed to save trip.' };
    }
}

export async function getTrips(): Promise<{ trips?: any[]; error?: string }> {
    const user = auth.currentUser;
    if (!user) {
        return { error: 'User not authenticated' };
    }

    try {
        const tripsRef = collection(db, 'users', user.uid, 'trips');
        const q = query(tripsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const trips = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert timestamp to a serializable format
            date: doc.data().createdAt.toDate().toISOString(),
        }));
        return { trips };
    } catch (error) {
        console.error("Error fetching trips from Firestore:", error);
        return { error: 'Failed to fetch trip history.' };
    }
}
