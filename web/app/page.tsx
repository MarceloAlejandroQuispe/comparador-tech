'use client';

import React, { useState } from 'react';

// Datos enriquecidos para simular un catálogo real y moderno
const productosMock = [
  { 
    id: 1, 
    titulo: "Placa de Video NVIDIA RTX 4060 8GB OC", 
    precio: 485000, 
    comercio: "Venex", 
    envioGratis: true,
    actualizado: "Hace 5 min",
    url: "#" 
  },
  { 
    id: 2, 
    titulo: "Procesador AMD Ryzen 5 5600X AM4", 
    precio: 210000, 
    comercio: "CompuGarde", 
    envioGratis: false,
    actualizado: "Hace 1 hora",
    url: "#" 
  },
  { 
    id: 3, 
    titulo: "Memoria RAM DDR4 16GB 3200MHz Fury Beast", 
    precio: 65000, 
    comercio: "Mercado Libre", 
    envioGratis: true,
    actualizado: "Hace 30 min",
    url: "#" 
  },
  { 
    id: 4, 
    titulo: "Motherboard ASUS Prime B550M-A", 
    precio: 145000, 
    comercio: "FullH4rd", 
    envioGratis: true,
    actualizado: "Hace 2 horas",
    url: "#" 
  },
];

export default function Home() {
  const [busqueda, setBusqueda] = useState('');

  // Filtrado dinámico en tiempo real según lo que escriba el usuario
  const productosFiltrados = productosMock.filter(item => 
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.comercio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      
      {/* Efectos de iluminación ambiental de fondo (Glow effects) */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        
        {/* Encabezado Principal */}
        <header className="mb-10 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            Motor de Comparación en Tiempo Real
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Inteligente</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Cruzamos precios de los principales comercios del país para que ahorres tiempo y dinero al instante.
          </p>
        </header>

        {/* Buscador Moderno */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shadow-2xl">
              <svg className="w-5 h-5 text-slate-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                type="text" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscá por componente, marca o comercio (ej. RTX, Ryzen, Venex)..." 
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base"
              />
              {busqueda && (
                <button 
                  onClick={() => setBusqueda('')}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                >
                  Limpiar
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Contenedor de Resultados / Tabla Moderna */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-5">Componente / Hardware</th>
                  <th className="p-5">Comercio</th>
                  <th className="p-5">Actualización</th>
                  <th className="p-5 text-right">Precio Final</th>
                  <th className="p-5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {productosFiltrados.length > 0 ? (
                  productosFiltrados.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="p-5">
                        <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                          {item.titulo}
                        </div>
                        {item.envioGratis && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium rounded">
                            Envío Gratis
                          </span>
                        )}
                      </td>
                      <td className="p-5 text-slate-300 font-medium">
                        {item.comercio}
                      </td>
                      <td className="p-5 text-slate-500 text-xs">
                        {item.actualizado}
                      </td>
                      <td className="p-5 text-right">
                        <div className="text-lg font-bold text-cyan-400">
                          ${item.precio.toLocaleString()}
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg shadow-lg shadow-cyan-900/30 transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                          Ver Tienda
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-500">
                      No se encontraron resultados para <span className="text-slate-300 font-medium">"{busqueda}"</span>.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Informativo */}
        <footer className="mt-12 text-center text-slate-600 text-xs">
          Comparador Tech • Desarrollado con arquitectura optimizada para rendimiento y SEO.
        </footer>

      </div>
    </main>
  );
}