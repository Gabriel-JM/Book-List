// UI Class: Handle UI Tasks
class UI {

    constructor() {
        this.tr,
        this.currentPageBooks = []
    }

    static displayBooks(currentPage, list = null) {
        let books = Store.getBooks()

        if(!books.length) {
            this.addNoBookMessage()
        } else if(list){
            list.forEach(book => this.addBookToList(book))
        } else {
            this.currentPageBooks = books.filter((book, index) => {
                if(index + 1 >= (6 * currentPage) - 6 + 1 && index + 1 <= currentPage * 6) {
                    return book
                } 
            })

            this.currentPageBooks.forEach(book => this.addBookToList(book))
        }
    }

    static reDisplayBooks(currentPage, list = null) {
        this.removeList()
        list ? this.displayBooks(currentPage, list) : this.displayBooks(currentPage)
    }

    static removeList() {
        document.querySelector('#book-list').innerHTML = ''
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list')

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="actions">
                <a href="#" class="btn-edit pencil" title="Edit"></a>
                <a href="#" class="btn-delete trash" title="Delete"></a>
            </td>`

        list.appendChild(row)
    }

    static addNoBookMessage() {
        if(!document.querySelector('#book-list tr.no-books')) {
            const list = document.querySelector('#book-list')

            const row = document.createElement('tr')
            row.className = 'no-books'
            row.innerHTML = '<td colspan="4">No Book Available.</td>'

            list.appendChild(row)
        }
    }

    static deleteBook(el) {
        if(el.classList.contains('btn-delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static hideNoBookMessage() {
        let message = document.querySelector('tr.no-books')

        if(message) message.remove()
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
        document.querySelector('.modal-form').reset()
    }

    static isAnyFieldEmpty(form) {
        const [title, author, isbn] = form

        return (title.value === '' || author.value === '' || isbn.value === '')
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
        }, 2990)
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

    static showSearchedBooks(input, currentPage) {
        const books = this.currentPageBooks

        if(!RegExp(/\s/).test(input.value)) {
            let result = books.filter(({ title }) => (
                RegExp(input.value.toLowerCase()).test(title.toLowerCase()) &&
                input.value !== '')
            )

            if(!result.length && input.value !== '') {
                this.removeList()
                this.addNoBookMessage()
            } else if(input.value === '') {
                this.reDisplayBooks(currentPage)
            } else {
                this.hideNoBookMessage()
                this.reDisplayBooks(currentPage, result)
            }
        }

        
    }

    static setPaginationCurrentPage(number) {
        document.querySelector('[current-page]').innerHTML = number
    }

}