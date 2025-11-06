import axios from 'axios';
import { Exercise } from '../types';

const api = axios.create({
  baseURL: 'https://www.exercisedb.dev/api/v1',
});

const bodyPartMap: Record<string, string> = {
  'back': 'espalda',
  'cardio': 'cardio',
  'chest': 'pecho',
  'lower arms': 'antebrazos',
  'lower legs': 'piernas inferiores',
  'neck': 'cuello',
  'shoulders': 'hombros',
  'upper arms': 'brazos',
  'upper legs': 'piernas',
  'waist': 'core'
};

const equipmentMap: Record<string, string> = {
  'assisted': 'asistido',
  'band': 'banda',
  'barbell': 'barra',
  'body weight': 'peso corporal',
  'bosu ball': 'bosu',
  'cable': 'polea',
  'dumbbell': 'mancuernas',
  'elliptical machine': 'elíptica',
  'ez barbell': 'barra ez',
  'hammer': 'martillo',
  'kettlebell': 'pesa rusa',
  'leverage machine': 'máquina',
  'medicine ball': 'balón medicinal',
  'olympic barbell': 'barra olímpica',
  'resistance band': 'banda de resistencia',
  'roller': 'rodillo',
  'rope': 'cuerda',
  'skierg machine': 'skierg',
  'sled machine': 'trineo',
  'smith machine': 'smith',
  'stability ball': 'fitball',
  'stationary bike': 'bicicleta estática',
  'stepmill machine': 'stepmill',
  'tire': 'neumático',
  'trap bar': 'barra hexagonal',
  'upper body ergometer': 'ergómetro',
  'weighted': 'con peso',
  'wheel roller': 'rueda abdominal'
};

export const getAllExercises = async (limit: number = 100, query: string = ''): Promise<Exercise[]> => {
  const params = new URLSearchParams();
  if (limit) params.append('limit', limit.toString());
  if (query) params.append('query', query);
  const response = await api.get(`/exercises`, { params });
  console.log('Fetched exercises:', response);
  return response.data.data.map((ex: any) => ({
    id: ex.exerciseId,
    name: ex.name,
    gifUrl: ex.gifUrl,
    bodyParts: ex.bodyParts,
    equipments: ex.equipments,
    targets: ex.targetMuscles,
    instructions: ex.instructions,
    secondaryMuscles: ex.secondaryMuscles
  }));
};

export const getExerciseById = async (id: string): Promise<Exercise> => {
  const response = await api.get(`/exercises/exercise/${id}`);
  const ex = response.data;
  return {
    id: ex.id,
    name: ex.name,
    gifUrl: ex.gifUrl,
    bodyParts: ex.bodyParts,
    equipments: ex.equipments,
    targets: ex.targetMuscles,
    instructions: ex.instructions,
    secondaryMuscles: ex.secondaryMuscles
  };
};