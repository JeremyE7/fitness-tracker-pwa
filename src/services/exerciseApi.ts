import axios from 'axios';
import { Exercise } from '../types';

const api = axios.create({
  baseURL: 'https://exercisedb.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
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

export const getAllExercises = async (limit: number = 1500): Promise<Exercise[]> => {
  const response = await api.get(`/exercises?limit=${limit}`);
  return response.data.map((ex: any) => ({
    id: ex.id,
    name: ex.name,
    gifUrl: ex.gifUrl,
    bodyPart: bodyPartMap[ex.bodyPart] || ex.bodyPart,
    equipment: equipmentMap[ex.equipment] || ex.equipment,
    target: ex.target,
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
    bodyPart: bodyPartMap[ex.bodyPart] || ex.bodyPart,
    equipment: equipmentMap[ex.equipment] || ex.equipment,
    target: ex.target,
    instructions: ex.instructions,
    secondaryMuscles: ex.secondaryMuscles
  };
};