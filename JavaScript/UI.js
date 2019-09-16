// UI Class: Handle UI Tasks
class UI {

    constructor() {
        this.tr,
        this.tdsText
    }

    static displayBooks() {
        const books = Store.getBooks()
        books.forEach(book => UI.addBookToList(book))
    }

    static reDisplayBooks() {
        document.querySelector('#book-list').innerHTML = ''
        this.displayBooks()
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="actions">
                <a href="#" class="btn-edit fa fa-pencil-alt" title="Edit"></a>
                <a href="#" class="btn-delete fa fa-times" title="Delete"></a>
            </td>`

        list.appendChild(row)
    }

    static deleteBook(el) {
        if(el.classList.contains('btn-delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static editBook(el, modalEl) {
        const modal = document.querySelector(modalEl)
        const modalForm = modal.querySelector('.modal-form')

        // Show the modal
        modal.style.display = 'grid'

        // Get the Table line and column data
        this.tr = el.parentElement.parentElement
        this.findTdsText()

        modalForm.title.value = this.tdsText[0]
        modalForm.author.value = this.tdsText[1]
        modalForm.isbn.value = this.tdsText[2]
    }

    static saveEditedBook(el) {
        const modalForm = document.querySelector('.modal-form')
        const list = Store.getBooks()

        // Verify if the isbn of the book already exists or it's did not has changed
        if(Store.checkIsbn(modalForm.isbn.value) ||
            this.tdsText[2] === modalForm.isbn.value) {

            // Find the index of the edited book
            const i = Store.findBookIndex(this.tdsText[2].innerHTML)

            // Changing the book attributes the new ones
            list[i].title = modalForm.title.value
            list[i].author = modalForm.author.value
            list[i].isbn = modalForm.isbn.value

            // Re posting the book on the Storage
            Store.rePostBooks(list)

            return true
        }
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')

            return false
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

        document.body.appendChild(div)
        div.style.transform = 'translateX(0px)'

        // Vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000)
    }

    static closeModal(el) {
        document.querySelector(el).style.display = 'none'
    }

    // Grab the text inside of each table cell of the line
    static findTdsText() {
        const array = []
        for(let i of this.tr.children) {
            array.push(i.innerHTML)
        }
        this.tdsText = array
    }

}