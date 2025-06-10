let books = [];
let history = [];

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const category = document.getElementById("category").value.trim();

  if (!title || !author || !category) {
    alert("Fill all fields");
    return;
  }

  books.push({ title, author, category, isBorrowed: false });
  renderBooks();
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("category").value = "";
}

function renderBooks(filtered = null) {
  const list = document.getElementById("book-list");
  list.innerHTML = "";

  const displayBooks = filtered || books;

  displayBooks.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${book.title} by ${book.author} [${book.category}]
      <button onclick="toggleBorrow(${index})">
        ${book.isBorrowed ? "Return" : "Borrow"}
      </button>`;
    list.appendChild(li);
  });
}

function toggleBorrow(index) {
  books[index].isBorrowed = !books[index].isBorrowed;

  history.push({
    title: books[index].title,
    action: books[index].isBorrowed ? "Borrowed" : "Returned",
    date: new Date().toLocaleString()
  });

  renderBooks();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";

  history.slice().reverse().forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.title} - ${entry.action} on ${entry.date}`;
    list.appendChild(li);
  });
}

function searchBooks() {
  const term = document.getElementById("search").value.toLowerCase();
  const filtered = books.filter(book =>
    book.title.toLowerCase().includes(term)
  );
  renderBooks(filtered);
}
