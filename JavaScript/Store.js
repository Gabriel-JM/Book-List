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

    static rePostBooks(books) {
        if(localStorage.getItem('Books') !== null) {
            localStorage.setItem('Books', JSON.stringify(books))
        }
    }

    static checkIsbn(isbn) {
        
        // Catch the isbn of the stored books
        const storeIsbns = this.getBooks().map(e => e.isbn)

        let result = true

        storeIsbns.forEach(e => {
            if(e === isbn) {
                result = false
            }
        })

        return result
    }

}