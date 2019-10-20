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
            <td>
                <span class="btn-edit pencil" title="Edit"></span>
                <span class="btn-delete trash" title="Delete"></span>
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

    static closeModal(modal) {
        document.querySelector(modal).style.display = 'none'
    }

    static fadeModal(modal) {
        document.querySelector(modal).classList.add('fade-out')
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

    static onlyNumbers(target) {
        target.value = target.value.replace(/\D/, '')
    }

    static isAnyFieldEmpty(form) {
        const [title, author, isbn] = form

        return (RegExp(/^\s*$|\s+(?=\W)/).test(title.value) ||
                RegExp(/^\s*$|\s+(?=\W)/).test(author.value) ||
                RegExp(/^\s*$|\s+(?=\W)/).test(isbn.value))
    }

    static isAnyFieldOutOfLength(form) {
        const [title, author, isbn] = form

        return (title.value.length > 80 || author.value.length > 80 || isbn.value.length > 30)
    }

    static showAlerts(message, className) {
        const div = document.createElement('div')
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))

        document.body.appendChild(div)

        document.querySelectorAll('.alert').forEach( element => {
            element.addEventListener('animationend', () => element.remove())
        })
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
            const result = books.filter(({ title }) => (
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

    static displayPaginationPages(number) {
        const pagination = document.querySelector('[current-page]')
        pagination.innerHTML = ''

        let className = ''
        for(let i = 1; i <= Store.getBooksMaxPagination(); i++) {
            className = i == number ? 'paginationCurrentPage' : 'paginationPageNumber'
            pagination.innerHTML += `<span class=${className}>${i}</span>`
        }
    }

}