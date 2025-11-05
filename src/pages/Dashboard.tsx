import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useStore } from '../store/useStore';
import { Scale, Dumbbell, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import WeightChart from '../components/WeightChart';

const Dashboard = () => {
  const { user, weightEntries, getTodayRoutine } = useStore();
  const todayRoutine = getTodayRoutine();
  const latestWeight = weightEntries[0];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-green-primary">
          Hola, {user.name}
        </h1>
        <p className="text-gray-400 mt-1">
          {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
        </p>
      </div>

      {/* Weight Progress Card */}
      <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-primary/20 p-3 rounded-xl">
              <Scale className="text-green-primary" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Peso Actual</h2>
              <p className="text-gray-400 text-sm">Última medición</p>
            </div>
          </div>
          {latestWeight && (
            <div className="text-right">
              <p className="text-3xl font-bold text-green-primary">
                {latestWeight.weight}
                <span className="text-lg text-gray-400 ml-1">kg</span>
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(latestWeight.date), 'dd MMM', { locale: es })}
              </p>
            </div>
          )}
        </div>
        {weightEntries.length > 0 && (
          <WeightChart entries={weightEntries.slice(0, 10)} />
        )}
        {weightEntries.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>No hay registros de peso</p>
            <Link
              to="/weight"
              className="text-green-primary hover:text-green-secondary mt-2 inline-block"
            >
              Agregar primer registro
            </Link>
          </div>
        )}
      </div>

      {/* Today's Routine */}
      {todayRoutine && (
        <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-primary/20 p-3 rounded-xl">
              <Dumbbell className="text-green-primary" size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Rutina de Hoy</h2>
              <p className="text-gray-400 text-sm">{todayRoutine.name}</p>
            </div>
          </div>
          <div className="space-y-2">
            {todayRoutine.exercises.map((ex) => (
              <div
                key={ex.exerciseId}
                className="flex items-center justify-between p-3 bg-dark-tertiary rounded-lg"
              >
                <span className="text-sm">{ex.exerciseName}</span>
                <span className="text-green-primary text-sm font-medium">
                  {ex.sets} × {ex.reps}
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/routines"
            className="mt-4 w-full bg-green-primary hover:bg-green-secondary text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            Comenzar Rutina
          </Link>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        <Link
          to="/weight"
          className="bg-dark-card rounded-xl p-4 border border-green-primary/20 hover:border-green-primary/40 transition-colors flex flex-col items-center gap-2"
        >
          <TrendingUp className="text-green-primary" size={28} />
          <span className="text-xs text-center">Registrar Peso</span>
        </Link>
        <Link
          to="/routines"
          className="bg-dark-card rounded-xl p-4 border border-green-primary/20 hover:border-green-primary/40 transition-colors flex flex-col items-center gap-2"
        >
          <Dumbbell className="text-green-primary" size={28} />
          <span className="text-xs text-center">Mis Rutinas</span>
        </Link>
        <Link
          to="/exercises"
          className="bg-dark-card rounded-xl p-4 border border-green-primary/20 hover:border-green-primary/40 transition-colors flex flex-col items-center gap-2"
        >
          <Calendar className="text-green-primary" size={28} />
          <span className="text-xs text-center">Explorar</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;