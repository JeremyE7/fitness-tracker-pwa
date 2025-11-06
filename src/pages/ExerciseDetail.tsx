import { useParams, Link } from 'react-router-dom';
import { useExercise } from '../hooks/useExercises';
import { ArrowLeft, Bookmark, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';

const ExerciseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: exercise, isLoading } = useExercise(id!);
  const { favoriteExercises, addFavoriteExercise, removeFavoriteExercise } = useStore();

  const isFavorite = favoriteExercises.includes(id!);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteExercise(id!);
    } else {
      addFavoriteExercise(id!);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="animate-spin text-green-primary" size={40} />
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Ejercicio no encontrado</p>
        <Link to="/exercises" className="text-green-primary hover:text-green-secondary mt-4 inline-block">
          Volver a explorar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <Link to="/exercises" className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <button
          onClick={toggleFavorite}
          className={`transition-colors ${
            isFavorite ? 'text-green-primary' : 'text-gray-400 hover:text-green-primary'
          }`}
        >
          <Bookmark size={24} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="bg-dark-card rounded-2xl overflow-hidden border border-green-primary/20">
        <div className="aspect-square bg-dark-tertiary">
          <img
            src={exercise.gifUrl}
            alt={exercise.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <h1 className="text-2xl font-bold mb-4">{exercise.name}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 bg-green-primary/20 text-green-primary rounded-lg text-sm font-medium">
            {exercise.bodyPart}
          </span>
          <span className="px-3 py-1 bg-dark-tertiary text-gray-300 rounded-lg text-sm">
            {exercise.equipment}
          </span>
          <span className="px-3 py-1 bg-dark-tertiary text-gray-300 rounded-lg text-sm">
            {exercise.target}
          </span>
        </div>

        {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">Músculos Secundarios</h3>
            <div className="flex flex-wrap gap-2">
              {exercise.secondaryMuscles.map((muscle, index) => (
                <span key={index} className="text-xs bg-dark-tertiary text-gray-400 px-2 py-1 rounded">
                  {muscle}
                </span>
              ))}
            </div>
          </div>
        )}

        {exercise.instructions && exercise.instructions.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3">Instrucciones</h3>
            <ol className="space-y-2">
              {exercise.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-primary/20 text-green-primary rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetail;