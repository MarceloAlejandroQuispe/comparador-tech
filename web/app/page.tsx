'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  // Acá la web va a leer la base de datos real que hizo tu bot
  useEffect(() => {
    fetch('/productos_db.json')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error cargando los datos:", error);
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter(item => 
    item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    item.comercio.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 py-12 relative z-10">
        <header className="mb-10 text-center">
          <div className="inline-block mb-3 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-semibold tracking-wide uppercase">
            Motor de Comparación en Tiempo Real
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
            Hardware <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Inteligente</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Datos reales extraídos automáticamente del mercado argentino.
          </p>
        </header>

        <div className="mb-10 max-w-2xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative flex items-center bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 shadow-2xl">
              <svg className="w-5 h-5 text-slate-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscá por componente (ej. RTX, Ryzen)..." 
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="p-5">Producto</th>
                  <th className="p-5">Comercio</th>
                  <th className="p-5">Actualización</th>
                  <th className="p-5 text-right">Precio Final</th>
                  <th className="p-5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cargando ? (
                  <tr><td colSpan={5} className="p-12 text-center text-cyan-400 animate-pulse">Cargando base de datos en vivo...</td></tr>
                ) : productosFiltrados.length > 0 ? (
                  productosFiltrados.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="p-5 flex items-center gap-4">
                        {/* ACÁ ESTÁ LA MAGIA DE LA IMAGEN */}
                        {item.imagen && (
                          <img src={item.imagen} alt={item.titulo} className="w-12 h-12 rounded bg-white object-cover border border-slate-700" />
                        )}
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors max-w-xs truncate">
                            {item.titulo}
                          </div>
                          {item.envioGratis && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium rounded">
                              Envío Gratis
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5 text-slate-300 font-medium">{item.comercio}</td>
                      <td className="p-5 text-slate-500 text-xs">{item.actualizado}</td>
                      <td className="p-5 text-right">
                        <div className="text-lg font-bold text-cyan-400">
                          ${item.precio.toLocaleString('es-AR')}
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-lg transition-all">
                          Ver Oferta
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-12 text-center text-slate-500">No se encontraron resultados.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}