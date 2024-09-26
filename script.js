class Book {
    constructor(title, author, year, genre) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }
}

const books = [];

function addBook(book) {
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    storedBooks.forEach((book, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} - ${book.author} (${book.year}) - ${book.genre} <button onclick="removeBook(${index})">Remover</button>`;
        bookList.appendChild(li);
    });
}

function removeBook(index) {
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    storedBooks.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(storedBooks));
    displayBooks();
}

document.getElementById('bookForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;
    const genre = document.getElementById('genre').value;

    const newBook = new Book(title, author, year, genre);
    addBook(newBook);

    document.getElementById('bookForm').reset();
});

if (document.getElementById('bookList')) {
    displayBooks();
}
