/**
 * Database Types
 *
 * This file defines the database schema types for use with Kysely.
 * These types ensure type safety when writing SQL queries.
 */

import { Generated, Insertable, Selectable, Updateable } from "kysely";

export interface DB {
  users: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password_hash: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  athletes: {
    id: number;
    coach_id: number;
    first_name: string;
    last_name: string;
    birthday: string;
    grade: number | null;
    active: boolean;
    gender: string;
    created_at: string;
    updated_at: string;
  };
  teams: {
    id: number;
    coach_id: number;
    name: string;
    created_at: string;
    updated_at: string;
  };
  athlete_teams: {
    id: number;
    athlete_id: number;
    team_id: number;
    created_at: string;
    updated_at: string;
  };
}

export type User = Selectable<DB["users"]>;
export type InsertableUser = Insertable<DB["users"]>;
export type UpdateableUser = Updateable<DB["users"]>;

export type Athlete = Selectable<DB["athletes"]>;
export type InsertableAthlete = Insertable<DB["athletes"]>;
export type UpdateableAthlete = Updateable<DB["athletes"]>;

export type Team = Selectable<DB["teams"]>;
export type InsertableTeam = Insertable<DB["teams"]>;
export type UpdateableTeam = Updateable<DB["teams"]>;

export type AthleteTeam = Selectable<DB["athlete_teams"]>;
export type InsertableAthleteTeam = Insertable<DB["athlete_teams"]>;
export type UpdateableAthleteTeam = Updateable<DB["athlete_teams"]>;
