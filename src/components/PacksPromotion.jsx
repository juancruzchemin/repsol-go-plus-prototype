import React from 'react';
import { Package } from 'lucide-react';

const PacksPromotion = ({ onExploreClick }) => {
  return (
    <div className="mx-4 mt-1 mb-6">
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        {/* Fondo animado con gradientes */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 animate-pulse"></div>
        
        {/* Elementos animados de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Círculo animado 1 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full animate-spin-slow"></div>
          {/* Círculo animado 2 */}
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-yellow-300 bg-opacity-20 rounded-full animate-bounce-slow"></div>
          {/* Elemento flotante */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-b from-orange-400 to-red-500 rounded-full opacity-20 animate-ping-slow"></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 p-4">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-bold text-lg">
                  Packs GO+
                </h2>
                <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 -mt-2 animate-bounce-gentle">
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
            onClick={onExploreClick}
            className="w-full bg-white text-red-600 py-3 rounded-xl font-bold text-base transition-all duration-300 shadow-lg transform animate-pulse-button"
          >
            Explorar Packs GO+
          </button>
        </div>
      </div>
    </div>
  );
};

export default PacksPromotion;