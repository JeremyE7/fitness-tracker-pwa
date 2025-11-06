# 🏋️ Fitness Tracker PWA

Progressive Web App moderna para tracking de fitness con soporte offline completo, más de 1300 ejercicios, gestión de rutinas y seguimiento de peso.

## ✨ Características Principales

- 🔥 **PWA Completa** - Funciona offline con service workers y caché inteligente
- 💪 **1300+ Ejercicios** - Base de datos completa con GIFs animados
- 📊 **Tracking de Peso** - Gráficos interactivos con Chart.js
- 📅 **Gestión de Rutinas** - Crea y organiza tus entrenamientos
- 🎨 **UI Moderna** - Tema oscuro con Tailwind CSS (verde #22c55e)
- ⚡ **React Query** - Caché inteligente con persistencia de 7 días
- 🗄️ **Zustand** - Estado global con persistencia en localStorage
- 📱 **Responsive** - Optimizado para móviles y desktop
- 🌐 **Offline First** - Funciona sin conexión a internet

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand + React Query
- **Routing**: React Router v6
- **Charts**: Chart.js + react-chartjs-2
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa
- **API**: ExerciseDB (RapidAPI)

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JeremyE7/fitness-tracker-pwa.git
cd fitness-tracker-pwa

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env y agregar tu VITE_RAPIDAPI_KEY

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview