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
            <td><a href="#" class="btn-delete">X</a></td>
        `

        list.appendChild(row)
    }

    static deleteBook(el) {
        if(el.classList.contains('btn-delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static clearFields() {
        document.querySelector('#title').value = ''
        document.querySelector('#author').value = ''
        document.querySelector('#isbn').value = ''
    }

    static showAlerts(message, className) {
        const div = document.createElement('div')
        div.className = className
        div.appendChild(document.createTextNode(message))
        const mainDiv = document.querySelector('#main')
        const mainSection = document.querySelector('#main-section')
        mainDiv.insertBefore(div, mainSection)

    }

}

// Store Class: Handles Storage

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks)

// Event: Add Book
document.querySelector('#book-form').addEventListener('submit', e => {
    // Prevent Actual Submit
    e.preventDefault()

    // Get form values
    const title = document.querySelector('#title').value
    const author = document.querySelector('#author').value
    const isbn = document.querySelector('#isbn').value

    // Validate the fields
    if(title === '' || author === '' || isbn === '') {
        UI.showAlerts('Please Fill in all the fields', 'blue')
    } else {

        // Create book object
        const book = new Book(title, author, isbn)

        // Add the new Book to UI
        UI.addBookToList(book)

        //Clear fields
        UI.clearFields()
    }
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', e => UI.deleteBook(e.target) )
