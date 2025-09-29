# Repsol GO+ Mobile App Prototype

Un prototipo de aplicación móvil para Repsol GO+ construido con React, Vite, Tailwind CSS y Lucide React.

## 🚀 Configuración del Proyecto

### Prerrequisitos
- Node.js (versión 18.0 o superior recomendada)
- npm (viene con Node.js)

### Instalación y Ejecución

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Ejecuta el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

3. **Abre tu navegador:**
   Ve a `http://localhost:5173/` para ver la aplicación en funcionamiento.

## 📱 Funcionalidades

La aplicación incluye las siguientes pantallas y funcionalidades:

### Dashboard Principal
- **Wallet Multienergía**: Muestra saldos de kWh y combustible
- **Cashback Cruzado**: Permite usar saldos entre diferentes tipos de energía
- **Acciones Rápidas**: Botones para cargar EV y repostar
- **Packs GO+**: Vista previa de paquetes disponibles

### Mapa de Puntos de Carga EV
- **Mapa Interactivo**: Muestra estaciones de carga cercanas
- **Disponibilidad en Tiempo Real**: Estado actual de las estaciones
- **Filtros**: Por distancia, precio y tipo de cargador
- **Reservas**: Sistema de reserva de plaza garantizada

### Sistema de Reservas
- **Configuración de Carga**: kWh estimados y tiempo de reserva
- **Precio Transparente**: Desglose detallado de costos
- **Cashback Aplicado**: Descuentos automáticos
- **Confirmación**: Pantalla de confirmación con navegación

### Packs GO+ 
- **Pack Familia**: Perfecto para hogares con 2+ vehículos
- **Pack Empresa**: Gestión de flota simplificada
- **Pack Drive**: Para el conductor urbano
- **Pack Hogar Verde**: Transición energética completa

## 🛠️ Tecnologías Utilizadas

- **React 19**: Biblioteca de interfaz de usuario
- **Vite**: Herramienta de construcción rápida
- **Tailwind CSS**: Framework de estilos utilitarios
- **Lucide React**: Iconos SVG optimizados
- **PostCSS**: Procesamiento de CSS
- **ESLint**: Linting de código

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la construcción de producción
- `npm run lint` - Ejecuta ESLint en el código

## 🎨 Diseño y UI

La aplicación está diseñada como una app móvil con:
- **Responsive Design**: Optimizada para dispositivos móviles
- **Colores Corporativos**: Esquema de colores de Repsol (rojos, naranjas)
- **Interacciones Fluidas**: Transiciones y hover effects
- **UX Intuitiva**: Navegación clara y botones de acción evidentes

## 📝 Notas de Desarrollo

- La aplicación usa datos mock para demostración
- Las funcionalidades están simuladas (reservas, pagos, etc.)
- Optimizada para mostrar en un contenedor de max-width mobile
- Compatible con navegadores modernos

## 🐛 Solución de Problemas

Si encuentras problemas:

1. **Limpia la caché de npm:**
   ```bash
   npm cache clean --force
   ```

2. **Reinstala las dependencias:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Verifica la versión de Node.js:**
   ```bash
   node --version
   ```

## 📄 Licencia

Este es un proyecto de prototipo para fines de demostración.