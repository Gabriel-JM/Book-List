// Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            new Book('Book One', 'Jonh Doe', '343434'),
            new Book('Book Two', 'Jane Doe', '45454')
        ];

        const books = storedBooks
        books.forEach(book => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')
    }
}

// Store Class: Handles Storage

// Event: Display Books

// Event: Add Book

// Event: Remove a Book