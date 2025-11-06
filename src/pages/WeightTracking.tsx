import { useState } from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import WeightChart from '../components/WeightChart';

const WeightTracking = () => {
  const { weightEntries, addWeightEntry, deleteWeightEntry } = useStore();
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weight) return;

    addWeightEntry({
      weight: parseFloat(weight),
      date,
      notes: notes || undefined
    });

    setWeight('');
    setNotes('');
    setDate(format(new Date(), 'yyyy-MM-dd'));
  };

  const latestWeight = weightEntries[0];
  const previousWeight = weightEntries[1];
  const difference = latestWeight && previousWeight
    ? latestWeight.weight - previousWeight.weight
    : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold">Registrar Peso</h1>
      </div>

      {/* New Entry Form */}
      <form onSubmit={handleSubmit} className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Peso (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-dark-tertiary border border-green-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-green-primary transition-colors"
              placeholder="75.5"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Fecha</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-dark-tertiary border border-green-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-green-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Notas (opcional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-dark-tertiary border border-green-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-green-primary transition-colors resize-none"
              placeholder="Ej: Después del entrenamiento"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-primary hover:bg-green-secondary text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Guardar Registro
          </button>
        </div>
      </form>

      {/* Recent Progress */}
      {latestWeight && previousWeight && (
        <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
          <h2 className="text-lg font-semibold mb-4">Progreso Reciente</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cambio desde última medición</p>
              <div className="flex items-center gap-2 mt-1">
                {difference > 0 ? (
                  <TrendingUp className="text-orange-500" size={20} />
                ) : difference < 0 ? (
                  <TrendingDown className="text-green-primary" size={20} />
                ) : null}
                <span className={`text-xl font-bold ${
                  difference > 0 ? 'text-orange-500' : difference < 0 ? 'text-green-primary' : 'text-gray-400'
                }`}>
                  {difference > 0 ? '+' : ''}{difference.toFixed(1)} kg
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weight Chart */}
      {weightEntries.length > 0 && (
        <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
          <h2 className="text-lg font-semibold mb-4">Historial</h2>
          <WeightChart entries={weightEntries} />
        </div>
      )}

      {/* History List */}
      <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <h2 className="text-lg font-semibold mb-4">Registros</h2>
        {weightEntries.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No hay registros aún</p>
        ) : (
          <div className="space-y-2">
            {weightEntries.map((entry, index) => {
              const prev = weightEntries[index + 1];
              const diff = prev ? entry.weight - prev.weight : 0;

              return (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 bg-dark-tertiary rounded-lg"
                >
                  <div>
                    <p className="font-medium">{entry.weight} kg</p>
                    <p className="text-sm text-gray-400">
                      {format(new Date(entry.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                    {entry.notes && (
                      <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {prev && diff !== 0 && (
                      <span className={`text-sm font-medium ${
                        diff > 0 ? 'text-orange-500' : 'text-green-primary'
                      }`}>
                        {diff > 0 ? '+' : ''}{diff.toFixed(1)}
                      </span>
                    )}
                    <button
                      onClick={() => deleteWeightEntry(entry.id)}
                      className="text-red-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeightTracking;