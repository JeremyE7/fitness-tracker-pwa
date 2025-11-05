import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, WeightEntry, Routine, RoutineExercise } from '../types';

interface AppState {
  user: User;
  weightEntries: WeightEntry[];
  routines: Routine[];
  favoriteExercises: string[];
  setUser: (user: Partial<User>) => void;
  addWeightEntry: (entry: Omit<WeightEntry, 'id'>) => void;
  deleteWeightEntry: (id: string) => void;
  getWeightHistory: () => WeightEntry[];
  addRoutine: (routine: Omit<Routine, 'id' | 'createdAt'>) => void;
  updateRoutine: (id: string, routine: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  getTodayRoutine: () => Routine | undefined;
  toggleExerciseComplete: (routineId: string, exerciseId: string) => void;
  addFavoriteExercise: (exerciseId: string) => void;
  removeFavoriteExercise: (exerciseId: string) => void;
}

export const useStore = create<AppState>()(persist(
  (set, get) => ({
    user: { name: 'Usuario' },
    weightEntries: [],
    routines: [],
    favoriteExercises: [],

    setUser: (user) => set((state) => ({
      user: { ...state.user, ...user }
    })),

    addWeightEntry: (entry) => set((state) => ({
      weightEntries: [
        { ...entry, id: Date.now().toString() },
        ...state.weightEntries
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    })),

    deleteWeightEntry: (id) => set((state) => ({
      weightEntries: state.weightEntries.filter((e) => e.id !== id)
    })),

    getWeightHistory: () => get().weightEntries,

    addRoutine: (routine) => set((state) => ({
      routines: [
        ...state.routines,
        {
          ...routine,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        }
      ]
    })),

    updateRoutine: (id, routine) => set((state) => ({
      routines: state.routines.map((r) =>
        r.id === id ? { ...r, ...routine } : r
      )
    })),

    deleteRoutine: (id) => set((state) => ({
      routines: state.routines.filter((r) => r.id !== id)
    })),

    getTodayRoutine: () => {
      const today = new Date().getDay();
      return get().routines.find((r) => r.days.includes(today));
    },

    toggleExerciseComplete: (routineId, exerciseId) => set((state) => ({
      routines: state.routines.map((r) =>
        r.id === routineId
          ? {
              ...r,
              exercises: r.exercises.map((ex) =>
                ex.exerciseId === exerciseId
                  ? { ...ex, completed: !ex.completed }
                  : ex
              )
            }
          : r
      )
    })),

    addFavoriteExercise: (exerciseId) => set((state) => ({
      favoriteExercises: [...state.favoriteExercises, exerciseId]
    })),

    removeFavoriteExercise: (exerciseId) => set((state) => ({
      favoriteExercises: state.favoriteExercises.filter((id) => id !== exerciseId)
    }))
  }),
  {
    name: 'fitness-tracker-storage'
  }
));