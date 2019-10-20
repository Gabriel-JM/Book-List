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
    if(Store.getBooks().length === 0) {
        UI.addNoBookMessage()
    } else {
        UI.hideNoBookMessage()
        UI.displayBooks(currentPage)
    }

    UI.displayPaginationPages(currentPage)
})

// Event: Search Books
document.querySelector('[search-input]').addEventListener('input', e => {
    UI.showSearchedBooks(e.target, currentPage)
})

// Event: Show Modal to Add a Book
document.querySelector('#add-book-btn').addEventListener('click', () => {
    // Change the modal title
    document.querySelector('[modal-title]').innerHTML = 'Add Book'

    UI.clearFields()

    UI.showModal('.modal-container')
})

//Event: Prevent letter on isbn input
document.querySelector('.isbn').addEventListener('input', e => UI.onlyNumbers(e.target))

// Event: Save a new or edited Book
document.querySelector('.modal-form').addEventListener('submit', e => {
    e.preventDefault()

    let noBooks = document.querySelector('tr.no-books')
    const list = Store.getBooks()
    const modalForm = document.querySelector('.modal-form')

    const infos = {
        title: modalForm.title.value,
        author: modalForm.author.value,
        isbn: modalForm.isbn.value
    }

    if(UI.isAnyFieldEmpty(modalForm)) {
        UI.showAlerts('Fill out all the fields', 'alert-danger')
    }
    // Verify the isbn size
    else if(UI.isAnyFieldOutOfLength(modalForm)) {
        UI.showAlerts('Please Fill the fields with the correct size', 'alert-danger')
    }
    // Verify the Modal title to see if is a new book
    else if(document.querySelector('[modal-title]').innerHTML === 'Add Book') {

        const book = new Book(infos.title, infos.author, infos.isbn)

        // Verify if the isbn already exists
        if(Store.isbnAlreadyExists(book.isbn)) {
            // Add the book to the store
            Store.addBook(book)

            // Show success message
            UI.showAlerts('Book Added with success!', 'alert-success')

            UI.clearFields()

            // Verify if the next book go to a new page
            if(Store.getBooksMaxPagination() !== currentPage) {
                currentPage = Store.getBooksMaxPagination()
                UI.displayPaginationPages(currentPage)
            }

            UI.fadeModal('.modal-container')

            UI.reDisplayBooks(currentPage)

            UI.hideNoBookMessage()
        } 
        else {
            // Alert if the isbn already exists
            UI.showAlerts('This isbn already exists!', 'alert-danger')
        }
    }
    else {
        const tds = UI.findTdsText()

        // Verify if the isbn of the book already exists or it's did not has changed
        if(Store.isbnAlreadyExists(infos.isbn) || tds[2] === infos.isbn) {

            // Find the index of the edited book
            const i = Store.findBookIndex(tds[2])

            // Changing the book attributes the new ones
            UI.changeBookAttributes(list[i], modalForm)

            // Re posting the book on the Storage
            Store.rePostBooks(list)

             // Re display the books, close the modal and show success message
            UI.reDisplayBooks(currentPage)
            UI.fadeModal('.modal-container')
            UI.showAlerts('Book edited with success!', 'alert-success')
        }
        else {
            // Alert if the isbn already exists
            UI.showAlerts('This isbn already exists!', 'alert-danger')

        }
    }
})

// Event: Remove or Edit a Book
document.querySelector('#book-list').addEventListener('click', e => {
    
    // Verify if the target is the delete button
    if(e.target.title === 'Delete') {
        UI.deleteBook(e.target)

        Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

        // Show success message
        UI.showAlerts('Book Removed with success!', 'alert-success')
        
        // If don't has any book in current page, go to the previous
        if(Store.getBooksMaxPagination() < currentPage && currentPage !== 1) {
            currentPage -= 1
            UI.displayPaginationPages(currentPage)
        }

        UI.reDisplayBooks(currentPage)
        
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

//Event: Cancel Editing/adding Book
document.querySelector('.modal-actions .cancel').addEventListener('click', e => {
    e.preventDefault()
    document.querySelector('.modal-container').classList.add('fade-out')
})

// Event: Close Modal
document.querySelector('.modal-container').addEventListener('animationend', e => {
    if(e.animationName === 'fade-out') {
        UI.closeModal('.modal-container')
        document.querySelector('.modal-container').classList.remove('fade-out')
    } 
})

// Event: Next page of pagination
document.querySelector('[next-page]').addEventListener('click', () => {
    if(currentPage < Store.getBooksMaxPagination()) {
        currentPage += 1
        UI.displayPaginationPages(currentPage)
        UI.reDisplayBooks(currentPage)
    }
})

// Event: Previous page of pagination
document.querySelector('[previous-page]').addEventListener('click', () => {
    if(currentPage > 1) {
        currentPage -= 1
        UI.displayPaginationPages(currentPage)
        UI.reDisplayBooks(currentPage)
    }
})
