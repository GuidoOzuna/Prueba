// Cargar artículos desde JSON
fetch("data.json")
  .then(response => response.json())
  .then(posts => {
    const container = document.getElementById("blog-container");
    posts.forEach(post => {
      const article = document.createElement("div");
      article.classList.add("post");
      article.innerHTML = `
        <img src="${post.imagen}" alt="${post.titulo}">
        <h2>${post.titulo}</h2>
        <p class="meta">Publicado el ${post.fecha} | Tags: ${post.tags.join(", ")}</p>
        <p>${post.cuerpo}</p>
      `;
      container.appendChild(article);
    });
  })
  .catch(error => console.error("Error cargando JSON:", error));
