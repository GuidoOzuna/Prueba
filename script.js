let postsData = [];

// Cargar artículos desde JSON
fetch("data.json")
  .then(response => response.json())
  .then(posts => {
    postsData = posts;
    mostrarPosts(postsData);
    mostrarTags(postsData);
  })
  .catch(error => console.error("Error cargando JSON:", error));

function mostrarPosts(posts) {
  const container = document.getElementById("blog-container");
  container.innerHTML = "";
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
}

function mostrarTags(posts) {
  const tagsContainer = document.getElementById("tags-container");
  const allTags = [...new Set(posts.flatMap(post => post.tags))];
  tagsContainer.innerHTML = "";
  allTags.forEach(tag => {
    const tagElement = document.createElement("span");
    tagElement.classList.add("tag");
    tagElement.textContent = tag;
    tagElement.addEventListener("click", () => {
      const filtrados = postsData.filter(post =>
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      );
      mostrarPosts(filtrados);
    });
    tagsContainer.appendChild(tagElement);
  });
}

// Filtrar mientras se escribe
document.getElementById("search").addEventListener("input", function() {
  const query = this.value.toLowerCase();
  const filtrados = postsData.filter(post =>
    post.titulo.toLowerCase().includes(query) ||
    post.tags.some(tag => tag.toLowerCase().includes(query))
  );
  mostrarPosts(filtrados);
});