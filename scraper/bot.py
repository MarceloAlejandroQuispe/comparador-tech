import requests
from bs4 import BeautifulSoup
import json
import os
from datetime import datetime

def scrapear_fullh4rd(busqueda):
    print(f"Buscando '{busqueda}' en FullH4rd...")
    # Formateamos la búsqueda para la URL (ej: rtx 4060 -> rtx%204060)
    busqueda_url = busqueda.replace(" ", "%20")
    url = f"https://www.fullh4rd.com.ar/cat/search/{busqueda_url}"
    
    # El disfraz de navegador
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    try:
        respuesta = requests.get(url, headers=headers)
        if respuesta.status_code != 200:
            return []
            
        # Parseamos el HTML real de la página
        soup = BeautifulSoup(respuesta.text, 'html.parser')
        productos = []
        
        # FullH4rd guarda sus productos en contenedores con la clase 'item'
        items = soup.find_all('div', class_='item')[:3] # Traemos los 3 primeros resultados
        
        for item in items:
            # 1. Extraemos el nombre
            titulo_tag = item.find('h3')
            if not titulo_tag: continue
            titulo = titulo_tag.text.strip()
            
            # 2. Extraemos el precio
            precio_tag = item.find('div', class_='price')
            precio_str = precio_tag.text.replace('$', '').replace('.', '').strip() if precio_tag else "0"
            precio = int(precio_str) if precio_str.isdigit() else 0
            
            # 3. Extraemos la imagen
            img_tag = item.find('img')
            imagen_url = "https://www.fullh4rd.com.ar" + img_tag['src'] if img_tag and 'src' in img_tag.attrs else ""
            
            # 4. Extraemos el link de compra
            link_tag = item.find('a')
            link = "https://www.fullh4rd.com.ar" + link_tag['href'] if link_tag and 'href' in link_tag.attrs else url

            productos.append({
                "id": f"FH-{titulo[:5]}-{precio}",
                "titulo": titulo,
                "precio": precio,
                "comercio": "FullH4rd",
                "envioGratis": False,
                "actualizado": datetime.now().strftime("%d/%m/%Y %H:%M"),
                "url": link,
                "imagen": imagen_url
            })
        return productos
    except Exception as e:
        print(f"Error scrapeando la página: {e}")
        return []

if __name__ == "__main__":
    print("=== INICIANDO VORTEX SCRAPER (WEB SCRAPING PURO) ===")
    
    # Intentamos scrapear datos en vivo
    resultados_rtx = scrapear_fullh4rd("rtx 4060")
    resultados_ryzen = scrapear_fullh4rd("ryzen 5")
    
    todos_los_productos = resultados_rtx + resultados_ryzen
    
    # SALVAVIDAS: Si el scraping falla, usamos datos de respaldo
    if len(todos_los_productos) == 0:
        print("Bloqueo detectado o sin resultados. Activando base de respaldo...")
        fecha_actual = datetime.now().strftime("%d/%m/%Y %H:%M")
        todos_los_productos = [
            {
                "id": "RES-1",
                "titulo": "Placa De Video Nvidia RTX 4060 (Dato de Respaldo)",
                "precio": 435000,
                "comercio": "FullH4rd",
                "envioGratis": True,
                "actualizado": fecha_actual,
                "url": "https://www.fullh4rd.com.ar",
                "imagen": "https://http2.mlstatic.com/D_NQ_NP_900253-MLA71070624017_082023-O.webp"
            }
        ]
        
    ruta_web_public = os.path.join(os.path.dirname(__file__), "..", "web", "public")
    os.makedirs(ruta_web_public, exist_ok=True)
    ruta_archivo = os.path.join(ruta_web_public, "productos_db.json")
    
    with open(ruta_archivo, "w", encoding="utf-8") as archivo:
        json.dump(todos_los_productos, archivo, ensure_ascii=False, indent=4)
        
    print(f"¡Éxito! Se guardaron {len(todos_los_productos)} productos en {ruta_archivo}")
    print("==================================================")