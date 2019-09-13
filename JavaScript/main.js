// Book Class: represents a Book
class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks())

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
    }
    //Verify if the target is the edit button
    else if(e.target.title === 'Edit') {
        // Open the modal for editing the book
        UI.editBook(e.target, '.modal-container')
    }

})

//Event: Save edited Book
document.querySelector('.modal-actions .save').addEventListener('click', e => {
    // Verify if has success on save the edited book
    if(UI.saveEditedBook(e.target)) {
        // Re display the books, close the modal and show success message
        UI.reDisplayBooks()
        UI.closeModal('.modal-container')
        UI.showAlerts('Book edited with success!', 'alert-success')
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
