import React, { useState, useEffect } from 'react';
import {
  Bell, User, Lightbulb, ShoppingCart, Truck, ParkingCircle,
  Fuel, Zap, Car, Store, Home, CreditCard, Gift, Users, Briefcase, CheckCircle, Package, Plus
} from 'lucide-react';
import HomeBar from './components/HomeBar';
import logoBackground from './assets/logo-removebg-preview.PNG';

const WayletApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedPack, setSelectedPack] = useState(null);
  const [hasContractedPack, setHasContractedPack] = useState(false); // Empieza sin pack para demostrar flujo
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showDeviceAlertModal, setShowDeviceAlertModal] = useState(false);
  const [showCouponsModal, setShowCouponsModal] = useState(false);
  const [temperatureMode, setTemperatureMode] = useState('heating'); // 'heating' or 'cooling'
  const [targetTemperature, setTargetTemperature] = useState(21);

  // Estados para modales de ayuda
  const [showEfficiencyHelp, setShowEfficiencyHelp] = useState(false);
  const [showHomeTypeHelp, setShowHomeTypeHelp] = useState(false);
  const [showSquareMetersHelp, setShowSquareMetersHelp] = useState(false);

  // Función para actualizar el color del header del navegador móvil
  const updateThemeColor = (view) => {
    const colors = {
      'home': '#f36900', // Naranja Repsol base
      'packs': '#f36900', // Naranja Repsol 
      'initial-setup': '#f36900', // Naranja Repsol
      'home-services': '#f36900', // Naranja Repsol
      'pack-detail': '#f36900', // Naranja Repsol (se actualiza dinámicamente)
      'consumption': '#10b981', // Verde de los consumos (from-green-500)
    };

    const color = colors[view] || '#f36900';

    // Actualizar meta tags
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const msAppMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');

    if (themeColorMeta) themeColorMeta.setAttribute('content', color);
    if (msAppMeta) msAppMeta.setAttribute('content', color);
  };

  // Efecto para cambiar el color cuando cambia la vista
  useEffect(() => {
    updateThemeColor(currentView);
  }, [currentView]);

  // Efecto especial para PackDetailView - usar color del pack seleccionado
  useEffect(() => {
    if (currentView === 'pack-detail' && selectedPack) {
      // Extraer color del gradiente del pack
      let packColor = '#f36900'; // Default

      if (selectedPack.color) {
        if (selectedPack.color.includes('from-orange-400')) {
          packColor = '#fb923c'; // from-orange-400
        } else if (selectedPack.color.includes('#f6aa00')) {
          packColor = '#f6aa00'; // Repsol orange
        }
      }

      // Actualizar con el color específico del pack
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      const msAppMeta = document.querySelector('meta[name="msapplication-navbutton-color"]');

      if (themeColorMeta) themeColorMeta.setAttribute('content', packColor);
      if (msAppMeta) msAppMeta.setAttribute('content', packColor);
    }
  }, [currentView, selectedPack]);  // Calcular cupones dinámicamente basado en si tiene pack contratado
  const availableCoupons = hasContractedPack ? 1 : 0;

  // Balance del usuario con cupones dinámicos
  const userBalance = {
    saldo: 0,
    cupones: availableCoupons,
    plan: '10 cts./l'
  };

  // Estados para configuración inicial
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [showCalculatedPrice, setShowCalculatedPrice] = useState(false);
  const [homeConfig, setHomeConfig] = useState({
    efficiency: '', // A, B, C, D, E, F
    homeType: '', // departamento, casa, chalet, etc.
    squareMeters: ''
  });
  const [calculatedPrices, setCalculatedPrices] = useState({
    basicPack: 89,
    goldPack: 129
  });

  // Función para calcular precios personalizados
  const calculateCustomPrices = (efficiency, homeType, squareMeters) => {
    const basePrices = { basicPack: 89, goldPack: 129 };

    // Factor de eficiencia energética
    const efficiencyFactors = {
      'A': 0.75, // -25%
      'B': 0.85, // -15%
      'C': 0.95, // -5%
      'D': 1.0,  // base
      'E': 1.15, // +15%
      'F': 1.30  // +30%
    };

    // Factor de tipo de hogar
    const homeTypeFactors = {
      'departamento': 0.90,     // -10%
      'casa': 1.0,              // base
      'chalet': 1.20,           // +20%
      'piso-terraza': 1.05,     // +5%
      'duplex': 1.10            // +10%
    };

    // Factor de metros cuadrados
    const getSquareMetersFactor = (meters) => {
      if (meters < 50) return 0.80;      // -20%
      if (meters <= 80) return 0.90;     // -10%
      if (meters <= 120) return 1.0;     // base
      if (meters <= 180) return 1.15;    // +15%
      if (meters <= 250) return 1.30;    // +30%
      return 1.50;                       // +50%
    };

    const efficiencyFactor = efficiencyFactors[efficiency] || 1.0;
    const homeTypeFactor = homeTypeFactors[homeType] || 1.0;
    const squareMetersFactor = getSquareMetersFactor(parseInt(squareMeters));

    const totalFactor = efficiencyFactor * homeTypeFactor * squareMetersFactor;

    return {
      basicPack: Math.round(basePrices.basicPack * totalFactor),
      goldPack: Math.round(basePrices.goldPack * totalFactor)
    };
  };

  // Datos simulados del pack confort gold contratado
  const contractedPack = {
    name: 'Pack Confort gold',
    monthlyPrice: hasCompletedSetup ? calculatedPrices.goldPack : 129,
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
      color: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)',
      features: [
        'Control de temperatura inteligente con Google Nest',
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
        'Control de temperatura inteligente con Google Nest',
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

  // Componente de configuración inicial
  const InitialSetupView = () => (
    <div className="min-h-screen bg-gray-50" style={{
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      position: 'relative'
    }}>
      {/* Header */}
      <div className="text-white p-4 relative" style={{ background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)' }}>
        {/* Botón de volver - posicionado absolutamente */}
        <button
          onClick={() => setCurrentView('home')}
          className="absolute top-4 left-4 text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors z-10"
          title="Volver al inicio"
        >
          ←
        </button>

        {/* Contenido central - mantiene centrado */}
        <div className="text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-bold mb-2">Configuremos tu Hogar</h1>
          <p className="text-sm opacity-90">
            Para ofrecerte el mejor precio, necesitamos conocer tu vivienda
          </p>
        </div>
      </div>

      <div className="p-4 space-y-6" style={{
        paddingBottom: '100px', // Extra padding para el teclado móvil
        minHeight: 'calc(100vh - 200px)'
      }}>
        {/* Eficiencia Energética */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Eficiencia Energética de tu Hogar</h3>
            <button
              onClick={() => setShowEfficiencyHelp(true)}
              className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              title="¿Cómo saber mi eficiencia energética?"
            >
              <span className="text-blue-600 text-sm font-bold">?</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Puedes encontrar esta información en tu certificado energético
          </p>
          <div className="grid grid-cols-3 gap-2">
            {['A', 'B', 'C', 'D', 'E', 'F'].map(grade => (
              <button
                key={grade}
                onClick={() => setHomeConfig({ ...homeConfig, efficiency: grade })}
                className={`p-3 rounded-lg border-2 transition-all ${homeConfig.efficiency === grade
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
              >
                <div className="text-lg font-bold">{grade}</div>
                <div className="text-xs">
                  {grade === 'A' && 'Excelente'}
                  {grade === 'B' && 'Muy buena'}
                  {grade === 'C' && 'Buena'}
                  {grade === 'D' && 'Regular'}
                  {grade === 'E' && 'Deficiente'}
                  {grade === 'F' && 'Muy deficiente'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Hogar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Tipo de Vivienda</h3>
            <button
              onClick={() => setShowHomeTypeHelp(true)}
              className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              title="¿Cómo elegir mi tipo de vivienda?"
            >
              <span className="text-blue-600 text-sm font-bold">?</span>
            </button>
          </div>
          <div className="space-y-2">
            {[
              { value: 'departamento', label: '🏢 Departamento', desc: 'Vivienda en edificio' },
              { value: 'casa', label: '🏠 Casa unifamiliar', desc: 'Casa independiente' },
              { value: 'chalet', label: '🏡 Chalet/Villa', desc: 'Casa con jardín amplio' },
              { value: 'piso-terraza', label: '🏠 Piso con terraza', desc: 'Piso con espacio exterior' },
              { value: 'duplex', label: '🏘️ Dúplex', desc: 'Vivienda de dos plantas' }
            ].map(type => (
              <button
                key={type.value}
                onClick={() => setHomeConfig({ ...homeConfig, homeType: type.value })}
                className={`w-full p-3 rounded-lg border-2 text-left transition-all ${homeConfig.homeType === type.value
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 bg-gray-50'
                  }`}
              >
                <div className="font-medium text-gray-800">{type.label}</div>
                <div className="text-sm text-gray-600">{type.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Metros Cuadrados */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">Metros Cuadrados</h3>
            <button
              onClick={() => setShowSquareMetersHelp(true)}
              className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              title="¿Cómo calcular mis metros cuadrados?"
            >
              <span className="text-blue-600 text-sm font-bold">?</span>
            </button>
          </div>
          <p className="text-gray-600 text-sm mb-4">
            Superficie aproximada de tu vivienda
          </p>
          <div className="relative">
            <input
              type="number"
              placeholder="Ej: 85"
              defaultValue={homeConfig.squareMeters}
              onBlur={(e) => {
                const newSquareMeters = e.target.value;
                setHomeConfig({ ...homeConfig, squareMeters: newSquareMeters });
                
                // Auto-calcular precio si todos los campos están completos
                if (homeConfig.efficiency && homeConfig.homeType && newSquareMeters) {
                  const prices = calculateCustomPrices(homeConfig.efficiency, homeConfig.homeType, newSquareMeters);
                  setCalculatedPrices(prices);
                  setShowCalculatedPrice(true);
                }
              }}
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg text-center font-semibold focus:border-orange-500 focus:outline-none"
              inputMode="numeric"
            />
          </div>
          <div className="text-center mt-2 text-sm text-gray-500">m²</div>
        </div>

        {/* Vista previa de precio si se ha calculado */}
        {showCalculatedPrice && homeConfig.efficiency && homeConfig.homeType && homeConfig.squareMeters && (
          <div className="bg-gradient-to-b from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4">
            <h4 className="font-bold text-green-800 mb-2">💡 Precio Personalizado Calculado</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">Pack Confort Básico</span>
                <span className="text-lg font-bold text-green-800">€{calculatedPrices.basicPack}/mes</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-700">Pack Confort Gold</span>
                <span className="text-lg font-bold text-green-800">€{calculatedPrices.goldPack}/mes</span>
              </div>
              <div className="text-xs text-green-600 mt-2">
                ⭐ Precio personalizado basado en tu hogar
              </div>
              <button
                onClick={() => {
                  setShowCalculatedPrice(false);
                }}
                className="w-full mt-2 text-green-700 text-sm underline hover:text-green-800 transition-colors"
              >
                Recalcular precio
              </button>
            </div>
          </div>
        )}

        {/* Botón continuar */}
        <button
          onClick={() => {
            if (showCalculatedPrice) {
              setHasCompletedSetup(true);
              setCurrentView('home-services');
            }
          }}
          disabled={!showCalculatedPrice}
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${showCalculatedPrice
            ? 'bg-gradient-to-b from-orange-500 to-red-500 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          {showCalculatedPrice 
            ? 'Continuar y Ver Packs Personalizados' 
            : 'Primero calcula tu precio personalizado'
          }
        </button>

        <p className="text-center text-xs text-gray-500">
          Esta información solo se usa para personalizar tu oferta
        </p>
      </div>

      {/* Modal de ayuda - Eficiencia Energética */}
      {showEfficiencyHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cómo conocer mi eficiencia energética?</h3>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">🔍 Busca en tu certificado energético:</h4>
                <p>Es un documento obligatorio que indica la eficiencia de tu vivienda con una letra de la A (más eficiente) a la F (menos eficiente).</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📍 Dónde encontrarlo:</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Contrato de alquiler o compra</li>
                  <li>Anuncios inmobiliarios</li>
                  <li>Registro de tu comunidad autónoma</li>
                  <li>Solicítalo a tu propietario</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">
                  💡 <strong>Si no lo tienes:</strong> Selecciona "D" como estimación media. Luego podrás actualizarlo para obtener precios más precisos.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEfficiencyHelp(false)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de ayuda - Tipo de Vivienda */}
      {showHomeTypeHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Qué tipo de vivienda tienes?</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-1">🏢 Departamento</h4>
                <p>Vivienda en edificio con vecinos arriba, abajo o a los lados</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-1">🏠 Casa unifamiliar</h4>
                <p>Casa independiente, sin viviendas adosadas</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-1">🏡 Chalet/Villa</h4>
                <p>Casa independiente con jardín o terreno amplio</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-1">🏠 Piso con terraza</h4>
                <p>Apartamento con terraza, balcón o patio</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-semibold text-gray-800 mb-1">🏘️ Dúplex</h4>
                <p>Vivienda distribuida en dos plantas</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">
                  💡 <strong>Tip:</strong> El tipo de vivienda afecta las necesidades de climatización. Las casas independientes suelen requerir más energía que los departamentos.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowHomeTypeHelp(false)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

      {/* Modal de ayuda - Metros Cuadrados */}
      {showSquareMetersHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¿Cómo calcular los metros cuadrados?</h3>
            </div>

            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📋 Dónde encontrar la información:</h4>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Contrato de alquiler o escritura</li>
                  <li>Cédula de habitabilidad</li>
                  <li>Anuncio inmobiliario original</li>
                  <li>Registro de la propiedad</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">📏 Si necesitas medirlo:</h4>
                <p>Multiplica el largo × ancho de cada habitación y suma todos los espacios habitables (sin incluir terrazas, balcones o trasteros).</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-semibold text-green-800 mb-1">📊 Referencia por habitaciones:</h4>
                <div className="space-y-1 text-green-700">
                  <p>• 1 dormitorio: 40-60 m²</p>
                  <p>• 2 dormitorios: 60-80 m²</p>
                  <p>• 3 dormitorios: 80-120 m²</p>
                  <p>• 4+ dormitorios: 120+ m²</p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-xs">
                  💡 <strong>Nota:</strong> Una estimación aproximada es suficiente. Esto nos ayuda a calcular las necesidades de climatización de tu hogar.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSquareMetersHelp(false)}
              className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );

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
              className="text-xs bg-white bg-opacity-15 px-3 py-2 rounded-full text-white backdrop-blur-sm font-semibold border border-white border-opacity-40"
            >
              {hasContractedPack ? 'Pack Activo' : 'Contratar Pack'}
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
            <div
              className={`flex-1 bg-white bg-opacity-80 rounded-2xl p-4 backdrop-blur-sm ${availableCoupons > 0 ? 'cursor-pointer hover:bg-opacity-90 transition-all' : ''
                }`}
              onClick={() => availableCoupons > 0 && setShowCouponsModal(true)}
            >
              <div className="text-gray-600 text-sm mb-1">Cupones</div>
              <div className={`text-2xl font-bold ${availableCoupons > 0 ? 'text-orange-600' : 'text-gray-800'}`}>
                {availableCoupons}
              </div>
              {availableCoupons > 0 && (
                <div className="text-xs text-orange-500 font-medium">¡Toca para ver!</div>
              )}
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
                    background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)'
                  }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-gray-800 font-bold text-lg">
                    Controla tu confort
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {hasCompletedSetup ? 'Pack Confort gold activo • Vence 15 Nov 2025' : '🎮 Modo Demo: Simula tu Pack Gold'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg" style={{ color: '#ff4e00' }}>
                    €{hasCompletedSetup ? calculatedPrices.goldPack : 129}/mes
                  </div>
                  <div className="text-gray-500 text-xs">
                    {hasCompletedSetup ? 'Precio personalizado' : 'Demo - Sin formulario'}
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      ) : (
        /* Promoción Hogar Inteligente - Solo si NO tiene pack contratado */
        <div className="packs-animate-gradient" style={{ borderRadius: '16px', justifyContent: 'center', margin: "10px" }}>
          <div className="mx-4 mt-1 mb-6 relative z-50">
            <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl p-3 shadow-xl border border-white border-opacity-40 relative z-50" style={{ background: 'linear-gradient(#f6aa00 0%, #ff4e00 100%)', marginTop: "17px" }}>
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
                onClick={() => {
                  if (!hasCompletedSetup) {
                    setCurrentView('initial-setup');
                  } else {
                    setCurrentView('home-services');
                  }
                }}
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
            onClick={() => {
              if (!hasCompletedSetup) {
                setCurrentView('initial-setup');
              } else {
                setCurrentView('home-services');
              }
            }}
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
      <div className="text-white p-4" style={{ background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)' }}>
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
              <div className={`bg-gradient-to-b ${pack.color} text-white p-4`}>
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
                  className={`w-full bg-gradient-to-b ${pack.color} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
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
      <div className="text-white p-4" style={{ background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)' }}>
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
        <div className="p-4 mb-20 space-y-6">
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
                <div className="text-xs text-gray-500">Objetivo: {targetTemperature}°C</div>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => {
                  setTemperatureMode('heating');
                  setTargetTemperature(26);
                }}
                className={`rounded-lg p-3 text-center transition-colors ${temperatureMode === 'heating'
                  ? 'bg-orange-100 text-orange-600 border-2 border-orange-300'
                  : 'bg-gray-100 text-gray-600'
                  }`}
              >
                <div className="text-sm font-medium">🔥 Calefacción</div>
                <div className="text-xs">{temperatureMode === 'heating' ? 'Activa' : 'Standby'}</div>
              </button>
              <button
                onClick={() => {
                  setTemperatureMode('cooling');
                  setTargetTemperature(20);
                }}
                className={`rounded-lg p-3 text-center transition-colors ${temperatureMode === 'cooling'
                  ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                  : 'bg-gray-100 text-gray-600'
                  }`}
              >
                <div className="text-sm font-medium">❄️ A/C</div>
                <div className="text-xs">{temperatureMode === 'cooling' ? 'Activa' : 'Standby'}</div>
              </button>
            </div>

            {/* Temperature Control */}
            <div className="bg-gray-50 rounded-lg p-4 mb-3">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Temperatura objetivo</span>
                <span className="text-lg font-bold text-gray-800">{targetTemperature}°C</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const min = temperatureMode === 'cooling' ? 18 : 26;
                    if (targetTemperature > min) {
                      setTargetTemperature(targetTemperature - 1);
                    }
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  disabled={targetTemperature <= (temperatureMode === 'cooling' ? 18 : 26)}
                >
                  <span className="text-lg font-bold text-gray-600">−</span>
                </button>

                <div className="flex-1 relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${temperatureMode === 'cooling' ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                      style={{
                        width: temperatureMode === 'cooling'
                          ? `${Math.max(8, ((targetTemperature - 18) / (22 - 18)) * 100)}%`
                          : `${Math.max(8, ((targetTemperature - 26) / (28 - 26)) * 100)}%`
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{temperatureMode === 'cooling' ? '18°C' : '26°C'}</span>
                    <span>{temperatureMode === 'cooling' ? '22°C' : '28°C'}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const max = temperatureMode === 'cooling' ? 22 : 28;
                    if (targetTemperature < max) {
                      setTargetTemperature(targetTemperature + 1);
                    }
                  }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                  disabled={targetTemperature >= (temperatureMode === 'cooling' ? 22 : 28)}
                >
                  <span className="text-lg font-bold text-gray-600">+</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Consumo mensual medido por Google Home</span>
                <span>65 kWh de 100 kWh</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full" style={{ width: '65%' }}></div>
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

          {/* Smart Home Devices */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">Dispositivos conectados a Google Home</h4>
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
                  <p className="text-2xl font-bold">€{calculatedPrices.basicPack}</p>
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
                  <span className="text-sm">Control de temperatura inteligente con Google Nest</span>
                </div>
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
                    id: 1,
                    name: 'Pack Confort Básico',
                    subtitle: 'Temperatura como servicio',
                    monthlyPrice: calculatedPrices.basicPack,
                    originalPrice: 89,
                    savings: Math.max(0, 89 - calculatedPrices.basicPack),
                    icon: Home,
                    color: 'from-orange-400 to-red-500',
                    features: [
                      'Control de temperatura inteligente con Google Nest',
                      'Hub de control energético',
                      'Sugerencias básicas de eficiencias energeticas'
                    ],
                    bestFor: 'Perfecto para mantener tu hogar a la temperatura ideal todo el año',
                    isPersonalized: hasCompletedSetup
                  });
                  setCurrentView('pack-detail');
                }}
                className="w-full text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)' }}
              >
                Contratar Pack - €{calculatedPrices.basicPack}/mes
              </button>
            </div>
          </div>

          {/* Pack para el hogar 2*/}
          <div className="bg-white rounded-2xl shadow-sm mb-4 overflow-hidden">
            <div className="w-full bg-gradient-to-b from-orange-400 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity" >
              <div className="flex items-center gap-3 mb-2">
                <Home className="w-6 h-6" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">Pack Confort gold</h3>
                  <p className="text-sm opacity-90">Temperatura como servicio con domotica incluida</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">€{calculatedPrices.goldPack}</p>
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
                  <span className="text-sm">Control de temperatura inteligente con Google Nest</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Hub de control energetico</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">Domótica básica incluida con Google Home con Google Home</span>
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
                    monthlyPrice: calculatedPrices.goldPack,
                    originalPrice: 129,
                    savings: Math.max(0, 129 - calculatedPrices.goldPack),
                    icon: Home,
                    color: 'from-orange-400 to-red-500',
                    features: [
                      'Control de temperatura inteligente con Google Nest',
                      'Hub de control energetico',
                      'Domótica básica incluida con Google Home',
                      'Optimización energética automática',
                    ],
                    bestFor: 'Perfecto para mantener tu hogar a la temperatura ideal todo el año',
                    isPersonalized: hasCompletedSetup
                  });
                  setCurrentView('pack-detail');
                }}
                className="w-full bg-gradient-to-b from-orange-400 to-red-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Contratar Pack - €{calculatedPrices.goldPack}/mes
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

          {/* Botón para recalcular planes */}
          <div>
            <div className="text-center">              
              <button
                onClick={() => {
                  // Resetear el formulario para permitir recalcular
                  setShowCalculatedPrice(false);
                  setHasCompletedSetup(false);
                  setHomeConfig({
                    efficiency: '',
                    homeType: '',
                    squareMeters: ''
                  });
                  setCurrentView('initial-setup');
                }}
                className="w-full bg-orange-200 text-black py-2 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                📋 Recalcular Mis Planes Personalizados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ConsumptionView = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-500 to-emerald-600 text-white p-4">
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

        {/* Consumption Cards */}
        <div className="space-y-4">
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
                <p className="text-gray-600 text-sm">IA de Google Home automática para eficiencia</p>
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
        <div className={`bg-gradient-to-b ${selectedPack.color} text-white p-4`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('home-services')} className="text-white">
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

            {selectedPack.isPersonalized && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 text-green-700">
                  <span className="text-sm">💡</span>
                  <span className="font-semibold text-sm">Precio Personalizado</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Calculado según la eficiencia energética de tu hogar ({homeConfig.efficiency}),
                  tipo de vivienda ({homeConfig.homeType.replace('-', ' ')}) y superficie ({homeConfig.squareMeters}m²)
                </p>
              </div>
            )}

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
              {selectedPack.isPersonalized && selectedPack.originalPrice !== selectedPack.monthlyPrice && (
                <div className="text-center text-sm text-green-600 font-medium">
                  💰 Ahorras €{selectedPack.originalPrice - selectedPack.monthlyPrice}/mes
                </div>
              )}
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
            className={`w-full bg-gradient-to-b ${selectedPack.color} text-white py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity`}
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
      {currentView === 'initial-setup' && <InitialSetupView />}

      {/* Modal de Confirmación */}
      {showConfirmationModal && selectedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
            {/* Header del modal */}
            <div className="text-center mb-4">
              <div className={`w-16 h-16 bg-gradient-to-b ${selectedPack.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
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
                  
                  // Cambiar color del header del navegador móvil a verde
                  updateThemeColor('#10b981'); // Verde de éxito
                  
                  // Después de 2.5 segundos, contratar pack y volver al home
                  setTimeout(() => {
                    setHasContractedPack(true);
                    setShowSuccessAnimation(false);
                    setCurrentView('home');
                    // Restaurar color del header basado en la vista home
                    updateThemeColor('#f6aa00'); // Color naranja del home
                  }, 2500);
                }}
                className={`flex-1 bg-gradient-to-b ${selectedPack.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity`}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animación de Éxito */}
      {showSuccessAnimation && selectedPack && (
        <div className="fixed inset-0 bg-gradient-to-b from-green-500 to-emerald-600 flex items-center justify-center z-50">
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
            <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-32 right-16 w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute top-44 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-28 right-1/3 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-52 right-10 w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
            <div className="absolute top-36 left-1/4 w-2 h-2 bg-orange-300 rounded-full animate-bounce" style={{ animationDelay: '0.8s' }}></div>
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
                  background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)'
                }}
              >
                Ver Configuración
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Cupones */}
      {showCouponsModal && hasContractedPack && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            {/* Header del Modal */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">¡Felicitaciones!</h3>
              <p className="text-gray-600 text-sm">
                Has ganado un cupón exclusivo por contratar el Pack Confort Gold
              </p>
            </div>

            {/* Cupón de Amazon */}
            <div className="bg-gradient-to-b from-orange-50 to-yellow-50 border-2 border-dashed border-orange-300 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  <div className="text-2xl font-bold text-black">amazon</div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg">€20 de descuento</h4>
                  <p className="text-sm text-gray-600">en tu próxima compra en Amazon</p>
                  <div className="bg-white rounded px-3 py-1 mt-2 inline-block">
                    <span className="font-mono text-sm font-bold text-orange-600">REPSOL20</span>
                  </div>
                </div>
              </div>

              {/* Información del cupón */}
              <div className="mt-4 pt-4 border-t border-orange-200">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>• Válido hasta: 31 Diciembre 2025</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>• Compra mínima: €50</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>• Un uso por cliente</span>
                </div>
              </div>
            </div>

            {/* Mensaje de gratitud */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-2 text-green-700 mb-2">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold text-sm">Gracias por confiar en Repsol GO+</span>
              </div>
              <p className="text-xs text-green-600">
                Este descuento es nuestro regalo de bienvenida al Pack Confort Gold.
                ¡Disfruta de tu nuevo hogar inteligente!
              </p>
            </div>

            {/* Botón de cierre */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCouponsModal(false)}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-colors"
                style={{
                  background: 'linear-gradient( #f6aa00 0%, #ff4e00 100%)'
                }}
              >
                ¡Genial! Usar más tarde
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WayletApp;