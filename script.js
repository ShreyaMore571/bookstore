document.addEventListener("DOMContentLoaded", async () => {
  const bookList = document.getElementById("bookList");
  const searchInput = document.getElementById("searchInput");

  let books = [];

  async function loadBooks() {
    try {
      const res = await fetch("books.json");
      books = await res.json();
      displayBooks(books);
    } catch (error) {
      bookList.innerHTML = `<p class='text-red-600'>Failed to load books. Check your JSON file.</p>`;
    }
  }

  function displayBooks(bookArray) {
    bookList.innerHTML = bookArray.map(book => `
      <div class="bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transition">
        <img src="${book.cover}" alt="${book.title}" class="rounded-lg h-56 w-full object-cover mb-3">
        <h3 class="text-lg font-semibold">${book.title}</h3>
        <p class="text-gray-600">by ${book.author}</p>
        <p class="text-blue-700 font-bold mt-2">$${book.price.toFixed(2)}</p>
        <button class="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Add to Cart</button>
      </div>
    `).join("");
  }

  searchInput.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(term) ||
      book.author.toLowerCase().includes(term)
    );
    displayBooks(filtered);
  });

  await loadBooks();
});
