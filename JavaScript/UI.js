// UI Class: Handle UI Tasks
class UI {

    constructor() {
        this.tr
    }

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
        this.tr = el.parentElement.parentElement
        const tdsText = []

        modal.style.display = 'grid'

        for(let i of this.tr.children) {
            tdsText.push(i.innerHTML)
        }

        modalForm.title.value = tdsText[0]
        modalForm.author.value = tdsText[1]
        modalForm.isbn.value = tdsText[2]
    }

    static saveEditedBook(el) {
        const modalForm = document.querySelector('.modal-form')
        const tdsText = []
        let ind = 0

        for(let i of this.tr.children) {
            tdsText.push(i)
        }

        if(Store.checkIsbn(modalForm.isbn.value)) {

            const list = Store.getBooks()
            list.forEach((e, i) => {
                if(e.isbn === tdsText[2].innerHTML) {
                    ind = i
                }
            })

            list[ind].title = modalForm.title.value
            list[ind].author = modalForm.author.value
            list[ind].isbn = modalForm.isbn.value

            tdsText[0].innerHTML = list[ind].title
            tdsText[1].innerHTML = list[ind].author
            tdsText[2].innerHTML = list[ind].isbn

            Store.rePostBooks(list)

            this.closeModal('.modal-container')
            this.showAlerts('Book edited with success!', 'alert-success')
        }
        else {
            // Alert if the isbn already exists
            UI.showAlerts('Please change the isbn of the book', 'alert-danger')
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

}