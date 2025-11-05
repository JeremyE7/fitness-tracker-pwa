import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getAllExercises, getExerciseById } from '../services/exerciseApi';
import { Exercise, BodyPart } from '../types';

export const exerciseKeys = {
  all: ['exercises'] as const,
  lists: () => [...exerciseKeys.all, 'list'] as const,
  list: (filters: string) => [...exerciseKeys.lists(), { filters }] as const,
  details: () => [...exerciseKeys.all, 'detail'] as const,
  detail: (id: string) => [...exerciseKeys.details(), id] as const,
};

export const useAllExercises = () => {
  return useQuery({
    queryKey: exerciseKeys.lists(),
    queryFn: () => getAllExercises(1500),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
};

export const useFilteredExercises = (
  search: string = '',
  bodyPart: BodyPart = 'todo',
  equipment: string = ''
) => {
  const { data: allExercises, isLoading, error } = useAllExercises();

  const filtered = useMemo(() => {
    if (!allExercises) return [];

    return allExercises.filter((exercise) => {
      const matchesSearch = search
        ? exercise.name.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchesBodyPart = bodyPart !== 'todo'
        ? exercise.bodyPart === bodyPart
        : true;

      const matchesEquipment = equipment
        ? exercise.equipment === equipment
        : true;

      return matchesSearch && matchesBodyPart && matchesEquipment;
    });
  }, [allExercises, search, bodyPart, equipment]);

  return { data: filtered, isLoading, error };
};

export const useExercise = (id: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: exerciseKeys.detail(id),
    queryFn: async () => {
      const cached = queryClient.getQueryData<Exercise[]>(exerciseKeys.lists());
      const cachedExercise = cached?.find((ex) => ex.id === id);
      
      if (cachedExercise) {
        return cachedExercise;
      }
      
      return getExerciseById(id);
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: !!id,
  });
};

export const useExercisesByBodyPart = (bodyPart: BodyPart) => {
  const { data: allExercises, isLoading, error } = useAllExercises();

  const filtered = useMemo(() => {
    if (!allExercises || bodyPart === 'todo') return allExercises || [];
    return allExercises.filter((ex) => ex.bodyPart === bodyPart);
  }, [allExercises, bodyPart]);

  return { data: filtered, isLoading, error };
};

export const useExerciseStats = () => {
  const { data: exercises } = useAllExercises();

  const stats = useMemo(() => {
    if (!exercises) return {};

    const bodyPartCounts: Record<string, number> = {};
    const equipmentCounts: Record<string, number> = {};

    exercises.forEach((ex) => {
      bodyPartCounts[ex.bodyPart] = (bodyPartCounts[ex.bodyPart] || 0) + 1;
      equipmentCounts[ex.equipment] = (equipmentCounts[ex.equipment] || 0) + 1;
    });

    return { bodyPartCounts, equipmentCounts, total: exercises.length };
  }, [exercises]);

  return stats;
};

export const usePrefetchExercise = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: exerciseKeys.detail(id),
      queryFn: async () => {
        const cached = queryClient.getQueryData<Exercise[]>(exerciseKeys.lists());
        const cachedExercise = cached?.find((ex) => ex.id === id);
        
        if (cachedExercise) {
          return cachedExercise;
        }
        
        return getExerciseById(id);
      },
      staleTime: 1000 * 60 * 60 * 24,
    });
  };
};

export const useInvalidateExercises = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: exerciseKeys.all });
  };
};
