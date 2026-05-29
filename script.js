async function cargarBandas() {
  const respuesta = await fetch('bandas.json');
  const datos = await respuesta.json();
  
  const letras = Object.keys(datos); // ["A", "B", "C"...]
  const cabecera = document.getElementById('cabecera');
  const cuerpo = document.getElementById('cuerpo-tabla');

  // 1. Crear los encabezados (A, B, C...)
  letras.forEach(letra => {
    const th = document.createElement('th');
    th.textContent = letra;
    cabecera.appendChild(th);
  });

  // 2. Encontrar cuál es el grupo con más bandas
  const maxBandas = Math.max(...letras.map(l => datos[l].length));

  // 3. Crear las filas de bandas
  for (let i = 0; i < maxBandas; i++) {
    const fila = document.createElement('tr');
    
    letras.forEach(letra => {
      const celda = document.createElement('td');
      const banda = datos[letra][i];
      
      if (banda) {
        const enlace = document.createElement('a');
        enlace.textContent = banda.nombre;
        enlace.href = banda.url;
        enlace.target = "_blank"; // abre en nueva pestaña
        enlace.classList.add("link-sin-estilo");
        celda.appendChild(enlace);
      }
      
      fila.appendChild(celda);
    });
    
    cuerpo.appendChild(fila);
  }
}

cargarBandas();