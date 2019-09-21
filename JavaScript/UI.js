// UI Class: Handle UI Tasks
class UI {

    constructor() {
        this.tr
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

    static showModal(modal) {
        document.querySelector(modal).style.display = 'grid'
    }

    static closeModal(el) {
        document.querySelector(el).style.display = 'none'
    }

    static editBook(el) {
        const modalForm = document.querySelector('.modal-form')

        // Get the Table line and column data
        this.tr = el.parentElement.parentElement
        const tds = this.findTdsText()

        tds.forEach((e, i) => {
            if(modalForm.elements[i]) {
                modalForm.elements[i].value = tds[i]
            }
        })
    }

    static clearFields() {
        document.querySelector('#book-form').reset()
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

    // Grab the text inside of each table cell of the line
    static findTdsText() {
        const array = []
        for(let i of this.tr.children) {
            array.push(i.innerHTML)
        }
        return array
    }

    static changeBookAttributes(book, form) {
        // Grab the object attribute's names
        const keys = Object.keys(book)

        // Loop through the names and change the content
        keys.forEach(e => book[e] = form[e].value)

    }

    static showSearchedBooks(input) {
        const bookTable = document.getElementById('book-list')
        let title = ''
        for(let i=0; i<bookTable.children.length; i++) {
            title = bookTable.children[i].cells[0].innerHTML;
            if(!RegExp(input.value.toLowerCase()).test(title.toLowerCase()) && input.value !== '') {
                bookTable.children[i].style.display = 'none'
            } else {
                bookTable.children[i].style.display =  '';
            }
        }
    }

}