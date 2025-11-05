export interface WeightEntry {
  id: string;
  weight: number;
  date: string;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  equipment: string;
  target: string;
  instructions?: string[];
  secondaryMuscles?: string[];
}

export interface RoutineExercise {
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  rest?: number;
  completed?: boolean;
}

export interface Routine {
  id: string;
  name: string;
  days: number[];
  exercises: RoutineExercise[];
  createdAt: string;
  color?: string;
}

export interface User {
  name: string;
  currentWeight?: number;
  goalWeight?: number;
  height?: number;
}

export type BodyPart = 'pecho' | 'piernas' | 'espalda' | 'core' | 'brazos' | 'hombros' | 'todo';