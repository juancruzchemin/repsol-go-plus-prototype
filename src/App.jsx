import React, { useState } from 'react';
import {
  Bell, User, Lightbulb, ShoppingCart, Truck, ParkingCircle,
  Fuel, Zap, Car, Store, Home, CreditCard, Gift, Users, Briefcase, CheckCircle, Package, Plus
} from 'lucide-react';
import HomeBar from './components/HomeBar';
import logoBackground from './assets/logo-removebg-preview.PNG'; const WayletApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPack, setSelectedPack] = useState(null);
  const [hasContractedPack, setHasContractedPack] = useState(false); // Empieza sin pack para demostrar flujo
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showDeviceAlertModal, setShowDeviceAlertModal] = useState(false);
  const [userBalance] = useState({
    saldo: 0,
    cupones: 0,
    plan: '10 cts./l'
  });

  // Datos simulados del pack confort gold contratado
  const contractedPack = {
    name: 'Pack Confort gold',
    monthlyPrice: 129,
    renewalDate: '15 Nov 2025',
    consumption: {
      temperature: { used: 145, total: 200, unit: 'kWh climatización' },
      energyHub: { used: 85, total: 100, unit: '% optimización activa' },
      smartDevices: { used: 12, total: 15, unit: 'dispositivos conectados' },
      automation: { used: 8, total: 10, unit: 'consejos utilizados' },
      energyOptimization: { used: 75, total: 100, unit: '% eficiencia energética' }
    }
  };

  // Packs de servicios disponibles
  const availablePacks = [
    {
      id: 1,
      name: 'Pack Confort gold',
      subtitle: 'La experiencia premium completa',
      monthlyPrice: 129,
      originalPrice: 189,
      savings: 32,
      icon: Zap,
      color: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)',
      features: [
        'Control de temperatura inteligente 24/7',
        'Climatización automática premium',
        'Domótica completa (15 dispositivos)',
        'Optimización energética con IA',
        'Hub energético inteligente',
        'Consejos personalizados de ahorro',
        'Soporte técnico prioritario',
        'Instalación y mantenimiento incluidos'
      ],
      bestFor: 'La solución más completa para un hogar inteligente y confortable'
    },
    {
      id: 2,
      name: 'Pack Hogar Inteligente',
      subtitle: 'Temperatura como servicio',
      monthlyPrice: 49,
      originalPrice: 89,
      savings: 45,
      icon: Home,
      color: 'linear-gradient(135deg, #f6aa00 0%, #FFA726 100%)',
      features: [
        'Control de temperatura inteligente 24/7',
        'Aire acondicionado automático en verano',
        'Calefacción inteligente en invierno',
        'Domótica básica (luces y persianas)',
        'Control remoto desde smartphone',
        'Optimización energética automática',
        'Instalación y mantenimiento incluidos'
      ],
      bestFor: 'Perfecto para mantener tu hogar a la temperatura ideal todo el año'
    },
  ];

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient and cards */}
      <div>
        {/* Content with relative positioning */}
        <div className="relative z-10" style={{ height: '200px' }}>
          {/* Imagen de fondo única y centrada */}
          <div
            className="absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${logoBackground})`,
              backgroundSize: '100%',
              marginTop: "-150px"
            }}
          ></div>

          {/* Top icons */}
          <div className="flex justify-between items-center gap-3 mb-6">
            {/* Demo button - temporal para testing */}
            <button
              onClick={() => setHasContractedPack(!hasContractedPack)}
              className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-white backdrop-blur-sm mg-2 px-5"
            >
              {hasContractedPack ? 'Pack gold' : 'Contrataciones'}
            </button>

            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bell className="w-5 h-5 text-black" />
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="flex gap-3 mb-4 mg-2 px-2">
            <div className="flex-1 bg-white bg-opacity-90 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-gray-600 text-sm mb-1">Saldo</div>
              <div className="text-2xl font-bold text-gray-800">{userBalance.saldo} €</div>
            </div>
            <div className="flex-1 bg-white bg-opacity-80 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-gray-600 text-sm mb-1">Cupones</div>
              <div className="text-2xl font-bold text-gray-800">{userBalance.cupones}</div>
            </div>
            <div className="flex-1 bg-white bg-opacity-70 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-gray-700 text-sm mb-1">Plan</div>
              <div className="text-lg font-bold text-gray-800">{userBalance.plan}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Section: Packs GO+ or Controla Consumos */}
      {hasContractedPack ? (
        /* Controla mis consumos Section - Solo si SÍ tiene pack contratado */
        <div>
          <div className="mx-4 mt-1 mb-6">
            <button
              onClick={() => setCurrentView('consumption')}
              className="w-full bg-white rounded-2xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)'
                  }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-800 font-bold text-lg">
                    Controla tu confort
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pack Confort gold activo • Vence 15 Nov 2025
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: '#ff4e00' }}>€129/mes</div>
                  <div className="text-gray-500 text-xs">Renovación automática</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Promoción Hogar Inteligente - Solo si NO tiene pack contratado */
        <div className="packs-animate-gradient" style={{ borderRadius: '16px', justifyContent: 'center', margin: "10px" }}>
          <div className="mx-4 mt-1 mb-6 relative z-50">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-white border-opacity-40 relative z-50" style={{ background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)', marginTop: "17px" }}>
              <div className="flex items-center gap-4 mb-3 relative z-50">
                <div className="w-12 h-12 bg-white bg-opacity-40 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl border border-white border-opacity-50">
                  <div className="relative">
                    <Home className="w-6 h-6 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-white font-bold text-lg drop-shadow-lg" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                      Pack Confort
                    </h2>
                    {/* <div className="bg-white bg-opacity-35 rounded-full px-3 py-1 -mt-2 shadow-xl border border-white border-opacity-30">
                      <span className="text-white text-xs font-bold drop-shadow-lg" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
                        Desde €49/mes
                      </span>
                    </div> */}
                  </div>
                  <p className="text-white text-sm font-semibold drop-shadow-lg" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.4)' }}>
                    Descubre nuestro nuevo servicio de frío y calor
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('home-services')}
                className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold text-base"
              >
                Temperatura como Servicio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <div className="px-4 mb-6 pb-20">
        <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ marginTop: "30px" }}>Paga y genera saldo</h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Hogar */}
          <div
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setCurrentView('home-services')}
          >
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-gray-800 font-semibold">Hogar</div>
          </div>

          {/* Repostar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <div className="relative">
                <Fuel className="w-6 h-6 text-orange-600" />
                <div className="absolute -top-1 -right-1 w-3 h-6 bg-orange-500 rounded-sm"></div>
              </div>
            </div>
            <div className="text-gray-800 font-semibold">Repostar</div>
          </div>

          {/* Recargar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-6 h-8 border-2 border-gray-400 rounded-sm"></div>
                <Zap className="w-4 h-4 text-orange-600 absolute top-1 left-1" />
              </div>
            </div>
            <div className="text-gray-800 font-semibold">Recargar</div>
          </div>

          {/* Lavados */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <div className="relative">
                <Car className="w-6 h-6 text-gray-400" />
                <div className="absolute -top-1 -right-1 flex gap-0.5">
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="text-gray-800 font-semibold">Lavados</div>
          </div>

          {/* Aparcar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-6 h-6 border-2 border-gray-400 rounded-sm bg-white"></div>
                <div className="absolute top-1 left-1 w-4 h-3 bg-orange-500 rounded-sm"></div>
                <div className="absolute top-2 left-2 text-white text-xs font-bold">P</div>
              </div>
            </div>
            <div className="text-gray-800 font-semibold">Aparcar</div>
          </div>

          {/* Gasóleo y butano */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-gray-800 font-semibold">Gasóleo y</div>
            <div className="text-gray-800 font-semibold">butano</div>
          </div>

          {/* Comercios */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
              <Store className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-gray-800 font-semibold">Comercios</div>
          </div>
        </div>
      </div>
      <HomeBar />
    </div>
  );

  const PacksView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white p-4" style={{ background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('home')} className="text-white">
            ←
          </button>
          <div>
            <h1 className="text-lg font-semibold">Packs GO+</h1>
            <p className="text-sm opacity-90">Ahorra hasta 40% combinando servicios</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        {availablePacks.map(pack => {
          const IconComponent = pack.icon;
          return (
            <div key={pack.id} className="bg-white rounded-lg shadow-sm mb-4 overflow-hidden">
              {/* Pack Header */}
              <div className={`bg-gradient-to-r ${pack.color} text-white p-4`}>
                <div className="flex items-center gap-3 mb-2">
                  <IconComponent className="w-6 h-6" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{pack.name}</h3>
                    <p className="text-sm opacity-90">{pack.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">€{pack.monthlyPrice}</p>
                    <p className="text-xs opacity-80 line-through">€{pack.originalPrice}/mes</p>
                  </div>
                </div>
                <div className="bg-white bg-opacity-20 rounded px-2 py-1 inline-block">
                  <span className="text-xs font-semibold">Ahorras {pack.savings}% al mes</span>
                </div>
              </div>

              {/* Pack Content */}
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3 font-medium">{pack.bestFor}</p>

                <div className="space-y-2 mb-4">
                  {pack.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedPack(pack);
                    setCurrentView('pack-detail');
                  }}
                  className={`w-full bg-gradient-to-r ${pack.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  Contratar Pack - €{pack.monthlyPrice}/mes
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const HomeServicesView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="text-white p-4" style={{ background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)' }}>
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('home')} className="text-white">
            ←
          </button>
          <Home className="w-6 h-6" />
          <div>
            <h1 className="text-lg font-semibold">Servicios del Hogar</h1>
            <p className="text-sm opacity-90">
              {hasContractedPack ? 'Gestiona tu hogar inteligente con el Pack gold' : 'Descubre nuestros packs para el hogar'}
            </p>
          </div>
        </div>
      </div>

      {hasContractedPack ? (
        /* Vista de consumos y domotica del hogar */
        <div className="p-4">
          {/* Temperature Control Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-blue-400"></div>
                    <div className="absolute -bottom-1 -right-1 text-xs">🌡️</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Temperatura del Hogar</h3>
                  <p className="text-gray-600 text-sm">Climatización inteligente</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">22°C</div>
                <div className="text-gray-500 text-xs">Objetivo: 21°C</div>
              </div>
            </div>

            {/* <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Consumo mensual</span>
                <span className="font-semibold text-gray-800">145 kWh de 200 kWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72.5%' }}></div>
              </div>
            </div> */}

            <div className="flex gap-2">
              <button className="flex-1 bg-orange-100 text-orange-600 py-2 px-3 rounded-lg text-sm font-medium">
                🔥 Calefacción ON
              </button>
              <button className="flex-1 bg-blue-100 text-blue-600 py-2 px-3 rounded-lg text-sm font-medium">
                ❄️ Aire Acond. OFF
              </button>
            </div>
          </div>

          {/* Smart Devices */}
          <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
            <h3 className="font-bold text-gray-800 mb-4">Dispositivos Conectados</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">💡 Iluminación</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-xs text-gray-600">8 dispositivos</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">🔒 Seguridad</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-xs text-gray-600">Sistema armado</div>
              </div>

              <div 
                className="bg-orange-50 border border-orange-200 rounded-lg p-3 cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => setShowDeviceAlertModal(true)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">📺 Entretenimiento</span>
                  <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="text-xs text-orange-600 font-medium">Requiere atención</div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">🌿 Jardín Smart</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                <div className="text-xs text-gray-600">Riego automático</div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">ⓘ</span>
                </div>
                <div className="text-xs text-blue-800">
                  <span className="font-semibold">Próximamente:</span> Podrás controlar todos tus dispositivos inteligentes directamente desde esta aplicación, incluyendo encendido/apagado, programación y automatización avanzada.
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-blue-50 text-blue-700 py-3 px-4 rounded-lg font-medium text-sm">
                🏠 Modo Casa
              </button>
              <button className="bg-gray-50 text-gray-700 py-3 px-4 rounded-lg font-medium text-sm">
                🚪 Modo Fuera
              </button>
              <button className="bg-green-50 text-green-700 py-3 px-4 rounded-lg font-medium text-sm">
                🌙 Modo Noche
              </button>
              <button className="bg-orange-50 text-orange-700 py-3 px-4 rounded-lg font-medium text-sm">
                ⚡ Ahorro Energía
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Vista de packs disponibles para el hogar */
        <div className="p-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Transforma tu Hogar</h2>
            <p className="text-gray-600 text-sm">
              Controla temperatura, iluminación y más con nuestros packs inteligentes
            </p>
          </div>

          {/* Pack para el hogar */}
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
            <div className="text-white p-4" style={{ background: 'linear-gradient(135deg, #ff4e00 0%, #ff4e00 100%)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-6 h-6" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Pack Confort basico</h3>
                  <p className="text-sm opacity-90">Temperatura como servicio</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">€89</p>
                  <p className="text-xs opacity-80">/mes</p>
                </div>
              </div>
              {/* <div className="bg-white bg-opacity-20 rounded px-2 py-1 inline-block">
                <span className="text-xs font-semibold">Incluye instalación gratuita</span>
              </div> */}
            </div>

            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Control de temperatura inteligente</span>
                </div>
                {/* <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Aire acondicionado + Calefacción</span>
                </div> */}
                {/* <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">💡 Domótica básica incluida</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">📱 Control remoto desde la app</span>
                </div> */}
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Hub de control energético</span>
                </div>  
                 <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Sugerencias básicas de eficiencias energeticas</span>
                </div>               
              </div>

              <button
                onClick={() => {
                  setSelectedPack({
                    id: 2,
                    name: 'Pack Hogar Inteligente',
                    subtitle: 'Temperatura como servicio',
                    monthlyPrice: 89,
                    originalPrice: 180,
                    savings: 91,
                    icon: Home,
                    color: 'from-orange-400 to-red-500',
                    features: [
                      'Control de temperatura inteligente',
                      'Hub de control energético',
                      'Sugerencias básicas de eficiencias energeticas'
                    ],
                    bestFor: 'Perfecto para mantener tu hogar a la temperatura ideal todo el año'
                  });
                  setCurrentView('pack-detail');
                }}
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)' }}
              >
                Contratar Pack - €89/mes
              </button>
            </div>
          </div>

          {/* Pack para el hogar 2*/}
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
            <div className="text-white p-4" style={{ background: 'linear-gradient(135deg, #f7be42ff 0%, #f7be42ff 100%)' }}>
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-6 h-6" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Pack Confort gold</h3>
                  <p className="text-sm opacity-90">Temperatura como servicio con domotica incluida</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">€129</p>
                  <p className="text-xs opacity-80">/mes</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded px-2 py-1 inline-block">
                <span className="text-xs font-semibold">Incluye instalación gratuita</span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Control de temperatura inteligente</span>
                </div>    
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Hub de control energetico</span>
                </div>             
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Domótica básica incluida</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Optimización energética automática</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedPack({
                    id: 2,
                    name: 'Pack Confort gold',
                    subtitle: 'Temperatura como servicio y domotica incluida',
                    monthlyPrice: 129,
                    originalPrice: 200,
                    savings: 71,
                    icon: Home,
                    color: 'from-orange-400 to-red-500',
                    features: [
                      'Control de temperatura inteligente',
                      'Hub de control energetico',
                      'Domótica básica incluida',
                      'Optimización energética automática',
                    ],
                    bestFor: 'Perfecto para mantener tu hogar a la temperatura ideal todo el año'
                  });
                  setCurrentView('pack-detail');
                }}
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)' }}
              >
                Contratar Pack - €129/mes
              </button>
            </div>
          </div>

          {/* Información adicional */}
          <div className="bg-orange-50 rounded-xl p-4">
            <h4 className="font-semibold text-orange-900 mb-2">¿Cómo funciona?</h4>
            <div className="space-y-2 text-sm text-orange-800">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">1</span>
                </div>
                <span>Instalamos los dispositivos inteligentes en tu hogar</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">2</span>
                </div>
                <span>Configuras tu temperatura ideal desde la app</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">3</span>
                </div>
                <span>El sistema mantiene automáticamente el confort perfecto a un precio fijo</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">4</span>
                </div>
                <span>Evalua tu ranking energetico y obten descuentos en tu proxima tarifa</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ConsumptionView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setCurrentView('home')} className="text-white">
            ←
          </button>
          <div>
            <h1 className="text-lg font-semibold">Mis Consumos</h1>
            <p className="text-sm opacity-90">{contractedPack.name} - €{contractedPack.monthlyPrice}/mes</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        {/* Pack Status Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{contractedPack.name}</h3>
                <p className="text-gray-600 text-sm">Pack activo</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-600 font-bold text-lg">€{contractedPack.monthlyPrice}</div>
              <div className="text-gray-500 text-xs">por mes</div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Próxima renovación</span>
              <span className="font-semibold text-gray-800">{contractedPack.renewalDate}</span>
            </div>
          </div>
        </div>

        {/* Consumption Cards */}
        <div className="space-y-4">
          {/* Temperature Control */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-blue-400"></div>
                  <div className="absolute -bottom-1 -right-1 text-xs">🌡️</div>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Control de Temperatura</h4>
                <p className="text-gray-600 text-sm">Climatización inteligente activa</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">22°C</div>
                <div className="text-xs text-gray-500">Objetivo: 21°C</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-orange-50 rounded-lg p-2 text-center">
                <div className="text-sm font-medium text-orange-600">🔥 Calefacción</div>
                <div className="text-xs text-gray-600">Activa</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <div className="text-sm font-medium text-blue-600">❄️ A/C</div>
                <div className="text-xs text-gray-600">Standby</div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Consumo mensual climatización</span>
                <span>65 kWh de 100 kWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>

          {/* Smart Home Devices */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Dispositivos Domóticos</h4>
                <p className="text-gray-600 text-sm">15 dispositivos conectados</p>
              </div>
              <button
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-gray-50 rounded p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">💡 Luces</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">🔒 Seguridad</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              </div>
              <div 
                className="bg-orange-50 border border-orange-200 rounded p-2 cursor-pointer hover:bg-orange-100 transition-colors"
                onClick={() => setShowDeviceAlertModal(true)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">📺 Entretenimiento</span>
                  <div className="w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">🌿 Jardín</span>
                  <CheckCircle className="w-3 h-3 text-green-500" />
                </div>
              </div>
            </div>

            {/* Disclaimer compacto para vista de consumos */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">ⓘ</span>
                </div>
                <div className="text-xs text-blue-800">
                  <span className="font-semibold">Próximamente:</span> Control completo de dispositivos desde la app.
                </div>
              </div>
            </div>
          </div>

          {/* Hub de Control Energético */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Hub de Control Energético</h4>
                <p className="text-gray-600 text-sm">Sistema central de gestión</p>
              </div>
              <button
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group relative"
                title="Ver detalles"
              >
                <Plus className="w-4 h-4 text-gray-600" />
                <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ver detalles
                </div>
              </button>
            </div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.energyHub.used}%
              </span>
              <span className="text-gray-500">
                {contractedPack.consumption.energyHub.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full"
                style={{ width: `${contractedPack.consumption.energyHub.used}%` }}
              ></div>
            </div>
          </div>

          {/* Optimización Energética Automática */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Optimización Energética</h4>
                <p className="text-gray-600 text-sm">AI automática para eficiencia</p>
              </div>
              <button
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group relative"
                title="Ver estadísticas"
              >
                <Plus className="w-4 h-4 text-gray-600" />
                <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ver estadísticas
                </div>
              </button>
            </div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.energyOptimization.used}%
              </span>
              <span className="text-gray-500">
                {contractedPack.consumption.energyOptimization.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${contractedPack.consumption.energyOptimization.used}%` }}
              ></div>
            </div>
          </div>

          {/* Rutinas Automatizadas */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Consejos energeticos</h4>
                <p className="text-gray-600 text-sm">Consejos inteligentes utilizados</p>
              </div>
              <button
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group relative"
                title="Gestionar rutinas"
              >
                <Plus className="w-4 h-4 text-gray-600" />
                <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Gestionar rutinas
                </div>
              </button>
            </div>
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.automation.used}
              </span>
              <span className="text-gray-500">
                de {contractedPack.consumption.automation.total} {contractedPack.consumption.automation.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${(contractedPack.consumption.automation.used / contractedPack.consumption.automation.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Waylet Cards */}
          {/* <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Tarjetas Waylet</h4>
                <p className="text-gray-600 text-sm">Tarjetas familiares activas</p>
              </div>
              <button 
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors group relative"
                title="Ampliar"
              >
                <Plus className="w-4 h-4 text-gray-600" />
                <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Ampliar
                </div>
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.wayletCards.used}
              </span>
              <span className="text-gray-500">
                de {contractedPack.consumption.wayletCards.total} {contractedPack.consumption.wayletCards.unit}
              </span>
            </div>
          </div> */}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
            Gestionar Pack
          </button>
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
            Ver histórico de consumos
          </button>
        </div>
      </div>
    </div>
  );

  const PackDetailView = () => {
    if (!selectedPack) return null;

    const IconComponent = selectedPack.icon;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedPack.color} text-white p-4`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('packs')} className="text-white">
              ←
            </button>
            <IconComponent className="w-6 h-6" />
            <div>
              <h1 className="text-lg font-semibold">{selectedPack.name}</h1>
              <p className="text-sm opacity-90">Configurar contratación</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Contract Summary */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-3">Resumen de Contratación</h3>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span>{selectedPack.name}</span>
                <span className="font-semibold">€{selectedPack.monthlyPrice}/mes</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Activación (gratuita este mes)</span>
                <span className="text-green-600 line-through">€25</span>
              </div>
              <div className="flex justify-between py-2 font-semibold text-lg">
                <span>Total primer mes</span>
                <span>€{selectedPack.monthlyPrice}</span>
              </div>
            </div>
          </div>

          {/* Benefits Recap */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-3">Incluido en tu Pack</h3>
            <div className="space-y-2">
              {selectedPack.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowConfirmationModal(true)}
            className={`w-full bg-gradient-to-r ${selectedPack.color} text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity`}
          >
            Contratar Ahora - €{selectedPack.monthlyPrice}/mes
          </button>

          <p className="text-center text-xs text-gray-500 mt-3">
            Al contratar aceptas los términos y condiciones de Repsol GO+
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentView === 'home' && <HomeScreen />}
      {currentView === 'packs' && <PacksView />}
      {currentView === 'consumption' && <ConsumptionView />}
      {currentView === 'home-services' && <HomeServicesView />}
      {currentView === 'pack-detail' && <PackDetailView />}

      {/* Modal de Confirmación */}
      {showConfirmationModal && selectedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            {/* Header del modal */}
            <div className="text-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${selectedPack.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                ¡Confirmar Contratación!
              </h3>
              <p className="text-gray-600 text-sm">
                Estás a punto de contratar el {selectedPack.name}
              </p>
            </div>

            {/* Detalles del pack */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{selectedPack.name}</span>
                <span className="text-lg font-bold text-green-600">€{selectedPack.monthlyPrice}/mes</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{selectedPack.subtitle}</p>
              <div className="text-xs text-green-600 font-semibold">
                ✓ Ahorras €{selectedPack.savings} cada mes
              </div>
            </div>

            {/* Información adicional */}
            <div className="text-center mb-6">
              <p className="text-xs text-gray-500">
                • Activación gratuita este mes<br />
                • Renovación automática<br />
                • Puedes cancelar cuando quieras
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setShowSuccessAnimation(true);
                  // Después de 2.5 segundos, contratar pack y volver al home
                  setTimeout(() => {
                    setHasContractedPack(true);
                    setShowSuccessAnimation(false);
                    setCurrentView('home');
                  }, 2500);
                }}
                className={`flex-1 bg-gradient-to-r ${selectedPack.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación de Éxito */}
      {showSuccessAnimation && selectedPack && (
        <div className="fixed inset-0 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center z-50">
          <div className="text-center text-white animate-pulse">
            {/* Ícono animado */}
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              {/* Círculos de expansión */}
              <div className="absolute inset-0 w-24 h-24 bg-white bg-opacity-10 rounded-full mx-auto animate-ping"></div>
              <div className="absolute inset-0 w-24 h-24 bg-white bg-opacity-5 rounded-full mx-auto animate-ping" style={{ animationDelay: '0.5s' }}></div>
            </div>

            {/* Texto principal */}
            <h2 className="text-3xl font-bold mb-2 animate-fade-in">
              ¡Pack Contratado!
            </h2>
            <p className="text-lg opacity-90 mb-2">
              {selectedPack.name}
            </p>
            <p className="text-sm opacity-75">
              Activado exitosamente por €{selectedPack.monthlyPrice}/mes
            </p>

            {/* Indicador de progreso */}
            <div className="mt-8 w-48 mx-auto">
              <div className="bg-white bg-opacity-20 rounded-full h-1">
                <div className="bg-white h-1 rounded-full" style={{
                  width: '100%',
                  animation: 'progressBar 2.5s ease-out',
                  transformOrigin: 'left'
                }}></div>
              </div>
              <p className="text-xs mt-2 opacity-75">
                Redirigiendo...
              </p>
            </div>
          </div>

          {/* Confeti animado */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-32 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-16 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-40 right-10 w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute top-24 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
          </div>
        </div>
      )}

      {/* Modal de Alerta de Dispositivos */}
      {showDeviceAlertModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            {/* Header del Modal */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Alerta de Entretenimiento</h3>
                <p className="text-sm text-gray-600">Consumo energético elevado detectado</p>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="space-y-4 mb-6">
              <p className="text-gray-700 text-sm">
                Se detectó que tienes dispositivos de entretenimiento encendidos por más de 4 horas consecutivas:
              </p>
              
              {/* Lista de dispositivos */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📺</span>
                    <span className="text-sm font-medium">Smart TV Salón</span>
                  </div>
                  <span className="text-sm text-orange-600 font-semibold">6h 23m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎮</span>
                    <span className="text-sm font-medium">Consola Gaming</span>
                  </div>
                  <span className="text-sm text-orange-600 font-semibold">4h 45m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔊</span>
                    <span className="text-sm font-medium">Sistema Audio</span>
                  </div>
                  <span className="text-sm text-orange-600 font-semibold">5h 12m</span>
                </div>
              </div>

              {/* Recomendación */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">💡</span>
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Recomendación:</p>
                    <p className="text-sm text-blue-800">
                      Considera programar apagado automático para optimizar el consumo energético y prolongar la vida útil de tus dispositivos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Funcionalidad futura */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-lg">🔧</span>
                  <div>
                    <p className="text-sm font-medium text-purple-900 mb-1">Próximamente:</p>
                    <p className="text-sm text-purple-800">
                      Podrás controlar estos dispositivos directamente desde la app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones del Modal */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeviceAlertModal(false)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Entendido
              </button>
              <button
                onClick={() => {
                  setShowDeviceAlertModal(false);
                  // Aquí se podría navegar a configuración de dispositivos
                }}
                className="flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #f6aa00 0%, #ff4e00 100%)'
                }}
              >
                Ver Configuración
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WayletApp;