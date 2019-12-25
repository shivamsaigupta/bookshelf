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

const libraryContainer = document.querySelector(".library-container");

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

function onAddBtnClick(){
  const title = document.getElementsByName("title")[0].value;
  const author = document.getElementsByName("author")[0].value;
  const pages = document.getElementsByName("pages")[0].value;
  const read = document.getElementsByName("read")[0].checked;

  //reset error msg
  let errElement = document.querySelector("#error");
  if(errElement != null){
    libraryContainer.removeChild(errElement);
  }

  // Form data validation
  if(title === '' || author === '' || pages === ''){
    showError('Please fill all the fields');
    return;
  }

  // TODO : look at the ID of the last element of the array, then increment it and add it to bookObj

  let bookObj = {
    title,
    author,
    pages,
    read
  }

  // Add to the array
  myLibrary.push(bookObj);

  // Update the DOM
  addBookToDom(bookObj);

}

function showError(msg){
  if (typeof(msg) != 'string') return

  let errElement = document.querySelector("#error");
  if(errElement != null) return;

  const errorMsg = document.createElement('h4')
  errorMsg.style.cssText = 'color: maroon; font-weight: bold;'
  errorMsg.id = "error";
  errorMsg.textContent = msg;
  libraryContainer.prepend(errorMsg);
}

function removeBook(bookId){
  //Starting at index bookId, remove 1 element
  //remove from array
  myLibrary.splice(bookId, 1);
  //remove from DOM
  const elementToDelete = document.querySelector(`.book-container[id='${bookId}']`);
  console.log('element to delete: ', elementToDelete)
  libraryContainer.removeChild(elementToDelete);
}

function addBookToDom(book){
  // expects book to be an object
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
}

function render(){
  let readText;
  console.log(myLibrary);
  myLibrary.forEach((book) => {
    addBookToDom(book)
  });
}

const btnRef = document.querySelector(".button");
btnRef.addEventListener('click', (e) => {
  onAddBtnClick();
});

render();

const HarryPotter = new Book("Harry Potter", "J.K. Rowling", 545, true);

console.log(HarryPotter.info());
