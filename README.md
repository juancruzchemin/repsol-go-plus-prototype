# Repsol GO+ Mobile Prototype

## 🚀 Descripción

Prototipo de aplicación móvil para **Repsol GO+** desarrollado con React y Vite. Una interfaz moderna que simula la experiencia de usuario de la app Waylet con funcionalidades de packs de servicios, seguimiento de consumos y gestión de pagos.

## ✨ Características

- 🎨 **UI/UX Moderna**: Diseño inspirado en Waylet con gradientes y animaciones
- 📱 **Responsive**: Optimizado para dispositivos móviles
- 🎯 **Gestión de Packs**: Sistema completo de contratación de servicios
- 📊 **Seguimiento de Consumos**: Dashboard para monitorear gastos
- ✅ **Flujo de Confirmación**: Modal y animaciones para contratar servicios  
- 🎭 **Estados Condicionales**: UI que cambia según el estado del usuario
- 🚀 **Navegación Fluida**: Transiciones entre vistas optimizadas

## 🛠️ Tecnologías

- **React 19** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 5.4.20** - Build tool y development server
- **Tailwind CSS 3.4.16** - Framework de CSS utility-first
- **Lucide React 0.544.0** - Librería de iconos SVG
- **PostCSS & Autoprefixer** - Procesamiento de CSS

## 📦 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/repsol-go-plus-prototype.git
   cd repsol-go-plus-prototype
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador en:** `http://localhost:5173`

## 🚀 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter ESLint

## 🎯 Funcionalidades Principales

### 🏠 Pantalla Principal
- Tarjetas de balance (Saldo, Cupones, Plan)
- Sección condicional de Packs GO+ o Control de Consumos
- Grid de servicios (Repostar, Recargar, Lavados, etc.)
- Navegación inferior con botón central elevado

### 📦 Sistema de Packs
- **Pack Familia** (€89/mes) - Para hogares con múltiples vehículos
- **Pack Empresa** (€199/mes) - Gestión de flotas empresariales  
- **Pack Drive** (€39/mes) - Para conductores urbanos frecuentes

### 📊 Control de Consumos
- Seguimiento de electricidad del hogar
- Monitoreo de combustible con cashback
- Gestión de carga EV
- Tarjetas Waylet familiares
- Descuentos en tienda

### 🎭 Experiencia de Usuario
- Modal de confirmación para contratación
- Animación de éxito con confeti
- Transición automática entre estados
- Interfaz adaptativa según pack contratado

## 🌐 Deployment en Netlify

Este proyecto está configurado para deployment automático en Netlify:

1. **Conecta tu repositorio** en [netlify.com](https://netlify.com)
2. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Deploy automático** en cada push a main

## 📱 Demo en Vivo

🔗 **[Ver Demo](https://repsolgo-prototype.netlify.app)** 

## 📋 Roadmap

- [ ] Integración con APIs reales
- [ ] Autenticación de usuario
- [ ] Persistencia de datos
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Multi-idioma

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es un prototipo desarrollado con fines educativos y de demostración.

## 👥 Equipo

Desarrollado para el equipo de ISDI - EY

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐
