import { useStore } from '../store/useStore';
import { User, Mail, Calendar, Award } from 'lucide-react';

const Profile = () => {
  const { user, weightEntries, routines } = useStore();

  const stats = [
    { label: 'Rutinas', value: routines.length, icon: Award },
    { label: 'Registros de Peso', value: weightEntries.length, icon: Calendar }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Mi Perfil</h1>

      <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-green-primary/20 rounded-full flex items-center justify-center">
            <User size={40} className="text-green-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-400 text-sm">Fitness Enthusiast</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-dark-tertiary rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon size={20} className="text-green-primary" />
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-green-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-dark-card rounded-2xl p-6 border border-green-primary/20">
        <h3 className="text-lg font-semibold mb-4">Información</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <Mail size={20} className="text-green-primary" />
            <span>usuario@ejemplo.com</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <Calendar size={20} className="text-green-primary" />
            <span>Miembro desde 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;