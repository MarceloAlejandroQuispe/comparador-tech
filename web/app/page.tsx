'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [busqueda, setBusqueda] = useState('');
  const [productos, setProductos] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

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
    <main className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500 selection:text-white relative overflow-hidden">
      {/* Fondo decorativo súper sutil */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* BARRA DE NAVEGACIÓN SUPERIOR (Logo ajustado a tamaño ideal) */}
      <nav className="border-b border-slate-800/50 bg-[#0B0F19]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="w-full px-6 md:px-8 py-3 flex items-center justify-start">
          <img 
            src="/logo.png" 
            alt="Vortex Logo" 
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10 flex-grow w-full">
        
        {/* CABECERA TEXTUAL CENTRAL */}
        <header className="mb-10 text-center flex flex-col items-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest uppercase">
            Tu setup al mejor precio
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Encontrá el mejor precio
          </h1>
          
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium">
            Datos reales extraídos automáticamente del mercado argentino.
          </p>
        </header>

        {/* Buscador */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-indigo-500/30 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <div className="relative flex items-center bg-[#111827] border border-slate-700/50 rounded-xl px-5 py-3.5 shadow-xl">
              <svg className="w-5 h-5 text-slate-400 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input 
                type="text" 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscá por componente (ej. RTX, Ryzen)..." 
                className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm md:text-base font-medium"
              />
            </div>
          </div>
        </div>

        {/* Tabla de Productos */}
        <div className="bg-[#111827]/80 backdrop-blur-md border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0B0F19]/50 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <th className="p-5">Producto</th>
                  <th className="p-5">Comercio</th>
                  <th className="p-5">Actualización</th>
                  <th className="p-5 text-right">Precio Final</th>
                  <th className="p-5 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {cargando ? (
                  <tr><td colSpan={5} className="p-12 text-center text-cyan-400 text-sm animate-pulse">Cargando base de datos en vivo...</td></tr>
                ) : productosFiltrados.length > 0 ? (
                  productosFiltrados.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                      <td className="p-5 flex items-center gap-4">
                        {item.imagen && (
                          <img src={item.imagen} alt={item.titulo} className="w-10 h-10 md:w-12 md:h-12 rounded bg-white object-cover border border-slate-700/50" />
                        )}
                        <div>
                          <div className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors text-sm md:text-base max-w-[200px] md:max-w-xs truncate">
                            {item.titulo}
                          </div>
                          {item.envioGratis && (
                            <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold tracking-wider rounded">
                              ENVÍO GRATIS
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-5 text-slate-300 text-sm font-medium">{item.comercio}</td>
                      <td className="p-5 text-slate-500 text-xs">{item.actualizado}</td>
                      <td className="p-5 text-right">
                        <div className="text-base md:text-lg font-bold text-cyan-400">
                          ${item.precio.toLocaleString('es-AR')}
                        </div>
                      </td>
                      <td className="p-5 text-center">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wide rounded-lg transition-all shadow-lg shadow-cyan-900/20">
                          Ver Oferta
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={5} className="p-16 text-center text-slate-500 text-sm">No se encontraron resultados para tu búsqueda.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FOOTER (Copyright) */}
      <footer className="border-t border-slate-800/50 bg-[#0B0F19] py-6 mt-auto relative z-10">
        <div className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-2">
           <img src="/logo.png" alt="Vortex Icon" className="h-5 md:h-6 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"/>
          <p className="text-slate-600 text-xs font-medium">
            © {new Date().getFullYear()} VORTEX. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
}