import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Plus, Edit2, Trash2, Check } from 'lucide-react';

const Routines = () => {
  const { routines, deleteRoutine, toggleExerciseComplete } = useStore();
  const [search, setSearch] = useState('');

  const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

  const filteredRoutines = routines.filter((routine) =>
    routine.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Rutinas</h1>
        <button className="text-green-primary hover:text-green-secondary">
          <Search size={24} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar rutinas..."
          className="w-full bg-dark-card border border-green-primary/20 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-green-primary transition-colors"
        />
      </div>

      {filteredRoutines.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No tienes rutinas aún</p>
          <button className="bg-green-primary hover:bg-green-secondary text-white font-medium py-3 px-6 rounded-lg transition-colors">
            Crear Primera Rutina
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRoutines.map((routine) => (
            <div
              key={routine.id}
              className="bg-dark-card rounded-2xl p-6 border border-green-primary/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{routine.name}</h3>
                  <div className="flex gap-1 mt-2">
                    {dayNames.map((day, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                          routine.days.includes(index)
                            ? 'bg-green-primary text-white'
                            : 'bg-dark-tertiary text-gray-500'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-green-primary hover:text-green-secondary">
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => deleteRoutine(routine.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {routine.exercises.map((ex) => (
                  <div
                    key={ex.exerciseId}
                    className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleExerciseComplete(routine.id, ex.exerciseId)}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          ex.completed
                            ? 'bg-green-primary border-green-primary'
                            : 'border-gray-500 hover:border-green-primary'
                        }`}
                      >
                        {ex.completed && <Check size={16} className="text-white" />}
                      </button>
                      <span className={ex.completed ? 'line-through text-gray-500' : ''}>
                        {ex.exerciseName}
                      </span>
                    </div>
                    <span className="text-green-primary font-medium">
                      {ex.sets} × {ex.reps}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="fixed bottom-24 right-6 bg-green-primary hover:bg-green-secondary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110">
        <Plus size={28} />
      </button>
    </div>
  );
};

export default Routines;