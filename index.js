//book class representation

class Book{
    constructor(title,author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// handle ui task
class ui{
    static displaybooks(){
        const books=store.getbooks();
        books.forEach((book)=> ui.addBooksToList(book))
    }
    static addBooksToList(book){
        const list =document.querySelector('#book-list')
        const row=document.createElement('tr')
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `
        list.appendChild(row)
    }
    static deletebook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    
    static showalert(message,className){
        const div=document.createElement('div')
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container=document.querySelector('.container')
        const form=document.querySelector('#book-form')
        container.insertBefore(div,form);

        //vanish alert
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
}

//storage
class store{
    static getbooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[]

        }
        else{
            books=JSON.parse(localStorage.getItem('books')) 
        }
        return books
    }
    static addbook(book){
        const books=store.getbooks()
        books.push(book)
        localStorage.setItem('books',JSON.stringify(books) )
    }
    static removebook(isbn){
        const books=store.getbooks();
        books.forEach((book,index)=>{
            if(book.isbn ===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books))
    }
}
// display books
document.addEventListener('DOMContentLoaded',ui.displaybooks)


//add book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
    //prevent actual submit
    e.preventDefault();
    //get form values
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    //validate
    if(title=== ''|| author === ''|| isbn === ''){
        ui.showalert('Please fill in all fields','danger')
    }
    else {
         //intiates book
    const book=new Book(title,author,isbn);
    
    //add book to ui
    ui.addBooksToList(book)

    //add book to store
    store.addbook(book)

    //show success
    ui.showalert('Book Added','success')

    ui.clearFields();
    }

})
//remove book
document.querySelector('#book-list').addEventListener('click',(e)=>{
  ui.deletebook(e.target)
  store.removebook(e.target.parentElement.previousElementSibling.textcontent);
  ui.showalert('Book Removed','success')
})
