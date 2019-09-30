// Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

let currentPage = 1

// Event: Display Books
document.addEventListener('DOMContentLoaded', () => {
    // If has no book show the "No book" message
    if(Store.getBooks().length === 0) {
        UI.showNoBookMessage()
    } else {
        UI.hideNoBookMessage()
        UI.displayBooks(currentPage)
    }
})

// Event: Search Books
document.querySelector('[search-input]').addEventListener('input', e => {
    UI.showSearchedBooks(e.target)
})

// Event: Show Modal to Add a Book
document.querySelector('#add-book-btn').addEventListener('click', () => {
    // Change the modal title
    document.querySelector('[modal-title]').innerHTML = 'Add Book'

    // Reset Form
    UI.clearFields()

    // Show the modal
    UI.showModal('.modal-container')
})

// Event: Save a new or edited Book
document.querySelector('.modal-actions .save').addEventListener('click', e => {
    let noBooks = document.querySelector('tr.no-books')
    const list = Store.getBooks()
    const modalForm = document.querySelector('.modal-form')

    const infos = {
        title: modalForm.title.value,
        author: modalForm.author.value,
        isbn: modalForm.isbn.value
    }

    if(infos.title === '' || infos.author === '' || infos.isbn === '') {
        UI.showAlerts('Please Fill in all the fields', 'alert-danger')
    }
    // Verify the isbn size
    else if(infos.isbn > 9999999) {
        UI.showAlerts('The ISBN number is too big', 'alert-danger')
    }
    // Verify the Modal title to see if is a new book
    else if(document.querySelector('[modal-title]').innerHTML === 'Add Book') {

        // Create a new book object
        const book = new Book(infos.title, infos.author, infos.isbn)

        // Verify if the isbn already exists
        if(Store.checkIsbn(book.isbn)) {

            // Add the new Book to UI
            UI.addBookToList(book)

            // Add the book to the store
            Store.addBook(book)

            // Show success message
            UI.showAlerts('Book Added with success!', 'alert-success')

            // Clear fields
            UI.clearFields()

            // Close the modal
            UI.closeModal('.modal-container')

            // Vanish "No Books" message
            noBooks.style.display = 'none'
        } 
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')
        }
    }
    else {
        const tds = UI.findTdsText()

        // Verify if the isbn of the book already exists or it's did not has changed
        if(Store.checkIsbn(infos.isbn) || tds[2] === infos.isbn) {

            // Find the index of the edited book
            const i = Store.findBookIndex(tds[2])

            // Changing the book attributes the new ones
            UI.changeBookAttributes(list[i], modalForm)

            // Re posting the book on the Storage
            Store.rePostBooks(list)

             // Re display the books, close the modal and show success message
            UI.reDisplayBooks()
            UI.closeModal('.modal-container')
            UI.showAlerts('Book edited with success!', 'alert-success')
        }
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')

        }
    }
})

// Event: Remove or Edit a Book
document.querySelector('#book-list').addEventListener('click', e => {
    
    // Verify if the target is the delete button
    if(e.target.title === 'Delete') {
        // Remove Book from UI
        UI.deleteBook(e.target)

        // Remove Book from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show success message
        UI.showAlerts('Book Removed with success!', 'alert-success')

        // If don't has any book show "No books" message
        if(Store.getBooks().length === 0) {
            document.querySelector('.no-books').style.display = ''
        } else {
            UI.reDisplayBooks = currentPage
        }
    }
    //Verify if the target is the edit button
    else if(e.target.title === 'Edit') {
        // Show the modal
        UI.showModal('.modal-container')
        // Change the modal title
        document.querySelector('[modal-title]').innerHTML = 'Edit Book'
        // Open the modal for editing the book
        UI.editBook(e.target)
    }

})

//Event: Cancel Edited Book
document.querySelector('.modal-actions .cancel').addEventListener('click', () => UI.closeModal('.modal-container'))

// Event: Close modal
document.querySelector('.modal-container').addEventListener('click', e => {

    // Verify if the target is the modal container
    if(e.target.className === "modal-container") {
        UI.closeModal('.modal-container')
    } 

})
