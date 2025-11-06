import { useState } from 'react';
import { useFilteredExercises, useExerciseStats, usePrefetchExercise } from '../hooks/useExercises';
import { Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BodyPart } from '../types';

const ExerciseLibrary = () => {
  const [search, setSearch] = useState('');
  const [bodyPart, setBodyPart] = useState<BodyPart>('todo');
  const { data: exercises, isLoading } = useFilteredExercises(search, bodyPart);
  const stats = useExerciseStats();
  const prefetchExercise = usePrefetchExercise();

  const categories: { label: string; value: BodyPart }[] = [
    { label: 'Todo', value: 'todo' },
    { label: 'Pecho', value: 'pecho' },
    { label: 'Piernas', value: 'piernas' },
    { label: 'Espalda', value: 'back' },
    { label: 'Core', value: 'core' },
    { label: 'Brazos', value: 'brazos' },
    { label: 'Hombros', value: 'hombros' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Explorar Ejercicios</h1>
        {stats.total && (
          <span className="text-sm text-gray-400">
            {exercises?.length || 0} de {stats.total}
          </span>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar ejercicios..."
          className="w-full bg-dark-card border border-green-primary/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-green-primary transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => {
          const count = cat.value === 'todo' ? stats.total : stats.bodyPartCounts?.[cat.value] || 0;
          return (
            <button
              key={cat.value}
              onClick={() => setBodyPart(cat.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                bodyPart === cat.value
                  ? 'bg-green-primary text-white'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-green-primary/20'
              }`}
            >
              {cat.label}
              {count && count > 0 && (
                <span className="ml-2 text-xs opacity-75">({count})</span>
              )}
            </button>
          );
        })}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-green-primary" size={40} />
        </div>
      )}

      {!isLoading && exercises && exercises.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              to={`/exercises/${exercise.id}`}
              onMouseEnter={() => prefetchExercise(exercise.id)}
              className="bg-dark-card rounded-xl overflow-hidden border border-green-primary/20 hover:border-green-primary/40 transition-all hover:scale-105"
            >
              <div className="aspect-square bg-dark-tertiary">
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-2">
                  {exercise.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  <span className="text-xs bg-green-primary/20 text-green-primary px-2 py-1 rounded">
                    {exercise.bodyParts.join(', ')}
                  </span>
                  <span className="text-xs bg-dark-tertiary text-gray-400 px-2 py-1 rounded">
                    {exercise.equipments.join(', ')}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!isLoading && exercises && exercises.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No se encontraron ejercicios</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseLibrary;