let myLibrary = [
  {
    id: 0,
    title: "Harry Potter",
    author: "J K Rowling",
    pages: 256,
    read: true
  },
  {
    id: 1,
    title: "A Million Thoughts",
    author: "Om Swami",
    pages: 306,
    read: false
  },
  {
    id: 2,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    pages: 548,
    read: true
  }
];

function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function(){
    let readText = "not read yet";
    if(read){
      readText = "read"
    }
    return `${this.title} by ${this.author}, ${this.pages}, ${readText}.`
  }
}

function removeBook(bookId){
  //Starting at index bookId, remove 1 element
  //remove from array
  myLibrary.splice(bookId, 1);
  //remove from DOM
  const libraryContainer = document.querySelector(".library-container");
  const elementToDelete = document.querySelector(`.book-container[id='${bookId}']`);
  console.log('element to delete: ', elementToDelete)
  libraryContainer.removeChild(elementToDelete);
}

function render(){
  const libraryContainer = document.querySelector(".library-container");
  let readText;
  console.log(myLibrary);
  myLibrary.forEach((book) => {
    console.log(book);

    if(book.read){
      readText = "read"
    }else{
      readText = "not read yet";
    }
    let bookContainer = document.createElement("div");
    bookContainer.classList.add('book-container');
    bookContainer.setAttribute("id", book.id);
    libraryContainer.appendChild(bookContainer);

    let bookInfo = document.createElement("div");
    bookInfo.classList.add('book-info');
    bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages}, ${readText}.`
    bookContainer.appendChild(bookInfo);

    let del = document.createElement("div");
    del.classList.add('remove');
    del.textContent = 'X';
    del.addEventListener('click', (e) => {
      removeBook(e.target.parentElement.attributes.id.value);
    });
    bookContainer.appendChild(del);

  });
}

render();

const HarryPotter = new Book("Harry Potter", "J.K. Rowling", 545, true);

console.log(HarryPotter.info());
