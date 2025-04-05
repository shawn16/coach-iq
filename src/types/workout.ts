// Define the Workout interface
export interface Workout {
  id: string;
  name: string;
  type: string;
  description: string;
  duration: number;
  distance?: number;
  pace?: string;
  intensity?: number;
  notes?: string;
}
