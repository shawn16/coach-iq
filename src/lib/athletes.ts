import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Athlete, AthleteInput, AthleteDisplay } from "@/types/athlete";
import { msToTimeString, timeStringToMs } from "./time-utils";
import { revalidatePath } from "next/cache";

// Convert a database athlete record to a display athlete with formatted time
export function toAthleteDisplay(athlete: Athlete): AthleteDisplay {
  console.log("toAthleteDisplay input time1600m:", athlete.time1600m); // Updated log to use correct field name
  return {
    id: athlete.id,
    first_name: athlete.first_name,
    last_name: athlete.last_name,
    birthday: athlete.birthday,
    grade: athlete.grade,
    time1600m: msToTimeString(athlete.time1600m),
    created_at: athlete.created_at,
    updated_at: athlete.updated_at,
  };
}

// Get all athletes from the database
export async function getAthletes(): Promise<AthleteDisplay[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .order("last_name", { ascending: true });

  // Raw query results logging
  console.log('=============================================');
  console.log('RAW QUERY RESULT FROM SUPABASE');
  console.log('=============================================');
  console.log(JSON.stringify(data, null, 2));
  console.log('First athlete:', data && data.length > 0 ? data[0] : 'No athletes');
  console.log('=============================================');

  // More detailed logging of the time1600m field
  if (data && data.length > 0) {
    console.log('First athlete time1600m:', data[0].time1600m);
    console.log('Field names in athlete:', Object.keys(data[0]).join(', '));
  }

  if (error) {
    console.error("Error fetching athletes:", error);
    return [];
  }

  return (data as Athlete[]).map(toAthleteDisplay);
}

// Get a single athlete by ID
export async function getAthleteById(
  id: number
): Promise<AthleteDisplay | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("athletes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error("Error fetching athlete:", error);
    return null;
  }

  return toAthleteDisplay(data as Athlete);
}

// Add a new athlete to the database
export async function addAthlete(
  athlete: AthleteInput
): Promise<AthleteDisplay | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("athletes")
    .insert([athlete])
    .select()
    .single();

  if (error || !data) {
    console.error("Error adding athlete:", error);
    return null;
  }

  // Revalidate the athletes page to refresh the data
  revalidatePath("/athletes");

  return toAthleteDisplay(data as Athlete);
}

// Delete an athlete from the database
export async function deleteAthlete(id: number): Promise<boolean> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("athletes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting athlete:", error);
    return false;
  }

  // Revalidate the athletes page to refresh the data
  revalidatePath("/athletes");

  return true;
}

// Convert a time string to milliseconds for database storage
export function prepareAthleteForDb(athleteInput: {
  firstName: string;
  lastName: string;
  birthday: string;
  grade: number;
  time1600m: string;
}): AthleteInput {
  return {
    first_name: athleteInput.firstName,
    last_name: athleteInput.lastName,
    birthday: athleteInput.birthday,
    grade: athleteInput.grade,
    time1600m: timeStringToMs(athleteInput.time1600m), // Updated to use correct field name
  };
}

// Update an existing athlete in the database
export async function updateAthlete(
  id: number,
  athlete: AthleteInput
): Promise<AthleteDisplay | null> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("athletes")
    .update(athlete)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) {
    console.error("Error updating athlete:", error);
    return null;
  }

  // Revalidate the athletes page to refresh the data
  revalidatePath("/athletes");

  return toAthleteDisplay(data as Athlete);
}
