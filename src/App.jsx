import React, { useState } from 'react';
import { 
  Bell, User, Lightbulb, ShoppingCart, Truck, ParkingCircle,
  Fuel, Zap, Car, Store, Home, CreditCard, Gift, Users, Briefcase, CheckCircle, Package, Plus
} from 'lucide-react';const WayletApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPack, setSelectedPack] = useState(null);
  const [hasContractedPack, setHasContractedPack] = useState(false); // Empieza sin pack para demostrar flujo
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [userBalance] = useState({
    saldo: 0,
    cupones: 0,
    plan: '10 cts./l'
  });

  // Datos simulados del pack familiar contratado
  const contractedPack = {
    name: 'Pack Familia',
    monthlyPrice: 89,
    renewalDate: '15 Oct 2025',
    consumption: {
      electricity: { used: 245, total: 400, unit: 'kWh' },
      fuel: { used: 320, total: 500, unit: 'L' },
      evCharging: { used: 12, total: 30, unit: 'sesiones' },
      wayletCards: { used: 2, total: 2, unit: 'tarjetas activas' },
      storeDiscounts: { used: 8, total: 'ilimitado', unit: 'descuentos usados' }
    }
  };

  // Packs de servicios disponibles
  const availablePacks = [
    {
      id: 1,
      name: 'Pack Familia',
      subtitle: 'Perfecto para hogares con 2+ vehículos',
      monthlyPrice: 89,
      originalPrice: 120,
      savings: 31,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      features: [
        'Tarifa hogar inteligente con solar',
        'Carga EV ilimitada en casa',
        '500L combustible/mes con 5% extra cashback',
        '2 tarjetas Waylet familiares',
        'Descuentos en Tienda Repsol'
      ],
      bestFor: 'Familias con casa propia y 2+ vehículos'
    },
    {
      id: 2,
      name: 'Pack Empresa',
      subtitle: 'Gestión de flota simplificada',
      monthlyPrice: 199,
      originalPrice: 280,
      savings: 81,
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-600',
      features: [
        'Hasta 10 vehículos incluidos',
        'Dashboard de gestión de flota',
        'Facturación unificada',
        'Carga rápida prioritaria',
        'Soporte 24/7 para empresas'
      ],
      bestFor: 'PYMEs con flota de 5-10 vehículos'
    },
    {
      id: 3,
      name: 'Pack Drive',
      subtitle: 'Para el conductor urbano',
      monthlyPrice: 39,
      originalPrice: 55,
      savings: 16,
      icon: Car,
      color: 'from-green-500 to-teal-500',
      features: [
        '300L combustible/mes con 3% cashback',
        'Carga EV en estaciones Repsol',
        'Parking gratuito en centros comerciales',
        'Lavado de coche 2x/mes',
        'Asistencia en carretera'
      ],
      bestFor: 'Conductores que hacen 15,000+ km/año'
    }
  ];

  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient and cards */}
      <div className="relative bg-gradient-to-b from-red-500 via-orange-400 via-75% via-yellow-400 to-white px-4 pt-4 pb-8 overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-300 to-yellow-200 rounded-full opacity-30 transform translate-x-32 -translate-y-32"></div>
        <div className="absolute top-20 left-0 w-64 h-64 bg-gradient-to-br from-red-400 to-orange-300 rounded-full opacity-20 transform -translate-x-20"></div>
        <div className="absolute bottom-0 right-10 w-48 h-48 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-25"></div>
        
        {/* Content with relative positioning */}
        <div className="relative z-10">
          {/* Top icons */}
          <div className="flex justify-between items-center gap-3 mb-6">
            {/* Demo button - temporal para testing */}
            <button 
              onClick={() => setHasContractedPack(!hasContractedPack)}
              className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded text-white backdrop-blur-sm"
            >
              {hasContractedPack ? 'Consumo' : 'PackGo+'}
            </button>
            
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-white bg-opacity-30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="flex gap-3 mb-4">
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
        <div className="mx-4 mt-1 mb-6">
          <button 
            onClick={() => setCurrentView('consumption')}
            className="w-full bg-white rounded-2xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-800 font-bold text-lg">
                  Controla tus consumos
                </h3>
                <p className="text-gray-600 text-sm">
                  Pack Familia activo • Vence 15 Oct 2025
                </p>
              </div>
              <div className="text-right">
                <div className="text-green-600 font-bold text-lg">€89/mes</div>
                <div className="text-gray-500 text-xs">Renovación automática</div>
              </div>
            </div>
          </button>
        </div>
      ) : (
        /* Packs GO+ Section - Solo si NO tiene pack contratado */
        <div className="mx-4 mt-1 mb-6">
          <div className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-bold text-lg">
                    Packs GO+
                  </h2>
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 -mt-2">
                    <span className="text-white text-xs font-semibold">
                      Ahorra hasta 40%
                    </span>
                  </div>
                </div>
                <p className="text-white text-sm font-semibold">
                  Todos los servicios por mes a un único precio
                </p>
              </div>
            </div>

            <button 
              onClick={() => setCurrentView('packs')}
              className="w-full bg-white text-red-600 py-3 rounded-xl font-bold text-base hover:bg-gray-50 transition-colors shadow-sm"
            >
              Explorar Packs GO+
            </button>
          </div>
        </div>
      )}

      {/* Services Section */}
      <div className="px-4 mb-6 pb-20">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Paga y genera saldo</h2>

        <div className="grid grid-cols-2 gap-4">
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white">
        <div className="relative flex items-end justify-between max-w-md mx-auto px-4 pb-4">
          {/* Left Button - Inicio */}
          <button className="flex flex-col items-center py-2 text-orange-500 flex-1">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Inicio</span>
          </button>

          {/* Center Button - Pagar (Elevated) */}
          <button className="flex flex-col items-center relative -top-3 flex-1">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
            <span className="text-xs text-gray-600 mt-2 font-medium">Pagar</span>
          </button>

          {/* Right Button - Beneficios */}
          <button className="flex flex-col items-center py-2 text-gray-400 flex-1">
            <Gift className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Beneficios</span>
          </button>
        </div>
      </div>
    </div>
  );

  const PacksView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-4">
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
                  <span className="text-xs font-semibold">Ahorras €{pack.savings}/mes</span>
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
          {/* Electricity */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Electricidad del hogar</h4>
                <p className="text-gray-600 text-sm">Tarifa inteligente con solar</p>
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
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.electricity.used}
              </span>
              <span className="text-gray-500">
                de {contractedPack.consumption.electricity.total} {contractedPack.consumption.electricity.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${(contractedPack.consumption.electricity.used / contractedPack.consumption.electricity.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Fuel */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Fuel className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Combustible</h4>
                <p className="text-gray-600 text-sm">5% cashback extra incluido</p>
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
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.fuel.used}
              </span>
              <span className="text-gray-500">
                de {contractedPack.consumption.fuel.total} {contractedPack.consumption.fuel.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(contractedPack.consumption.fuel.used / contractedPack.consumption.fuel.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* EV Charging */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Carga EV en casa</h4>
                <p className="text-gray-600 text-sm">Carga ilimitada incluida</p>
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
            <div className="flex justify-between items-end mb-2">
              <span className="text-2xl font-bold text-gray-800">
                {contractedPack.consumption.evCharging.used}
              </span>
              <span className="text-gray-500">
                de {contractedPack.consumption.evCharging.total} {contractedPack.consumption.evCharging.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${(contractedPack.consumption.evCharging.used / contractedPack.consumption.evCharging.total) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Waylet Cards */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
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
          </div>

          {/* Store Discounts */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Descuentos Tienda</h4>
                <p className="text-gray-600 text-sm">Este mes</p>
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
                {contractedPack.consumption.storeDiscounts.used}
              </span>
              <span className="text-gray-500">
                {contractedPack.consumption.storeDiscounts.unit}
              </span>
            </div>
          </div>
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
                • Activación gratuita este mes<br/>
                • Renovación automática<br/>
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
              <div className="absolute inset-0 w-24 h-24 bg-white bg-opacity-5 rounded-full mx-auto animate-ping" style={{animationDelay: '0.5s'}}></div>
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
            <div className="absolute top-10 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-20 right-16 w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-32 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-16 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-40 right-10 w-3 h-3 bg-green-300 rounded-full animate-bounce" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute top-24 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{animationDelay: '0.8s'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WayletApp;