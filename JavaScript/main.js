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
        const books = Store.getBooks()
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
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))

        const mainDiv = document.querySelector('#main')
        const mainSection = document.querySelector('#main-section')
        mainDiv.insertBefore(div, mainSection)

        // Vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2500)
    }

}

// Store Class: Handles Storage
class Store {
    static getBooks() {
        let books
        if(localStorage.getItem('Books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('Books'))
        }

        return books
    }

    static addBook(book) {
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('Books', JSON.stringify(books))
    }

    static removeBook(isbn) {
        const books = Store.getBooks()

        books.forEach((book, index) => {
            if(book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('Books', JSON.stringify(books))
    }
}

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
        UI.showAlerts('Please Fill in all the fields', 'alert-danger')
    } else {

        // Create book object
        const book = new Book(title, author, isbn)

        // Add the new Book to UI
        UI.addBookToList(book)

        // Add the book to the store
        Store.addBook(book)

        // Show success message
        UI.showAlerts('Book Added with success!', 'alert-success')

        // Clear fields
        UI.clearFields()
    }
})

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', e => {
    
    // Verify if the target is the delete button
    if(e.target.innerHTML === 'X') {
        // Remove Book from UI
        UI.deleteBook(e.target)

        // Remove Book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show success message
        UI.showAlerts('Book Removed with success!', 'alert-success')
    }

})
