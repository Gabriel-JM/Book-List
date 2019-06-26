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

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="" class="btn-delete">X</a></td>
        `

        list.appendChild(row)
    }
}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', e => {
    //Get form values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value
})

// Event: Remove a Book