import React from 'react';
import { Home, CreditCard, Gift } from 'lucide-react';

const HomeBar = ({}) => {
  return (
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
    );
};

export default HomeBar;