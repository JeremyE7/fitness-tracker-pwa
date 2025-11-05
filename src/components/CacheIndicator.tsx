import { Wifi, WifiOff, Database } from 'lucide-react';
import { useExerciseStats } from '../hooks/useExercises';
import { useState, useEffect } from 'react';

const CacheIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const stats = useExerciseStats();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
        isOnline ? 'bg-green-primary/20 text-green-primary' : 'bg-orange-500/20 text-orange-500'
      }`}>  
        {isOnline ? <Wifi size={14} /> : <WifiOff size={14} />}
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      {stats.total && (
        <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-green-primary/20 text-green-primary">
          <Database size={14} />
          <span>{stats.total} ejercicios</span>
        </div>
      )}
    </div>
  );
};

export default CacheIndicator;