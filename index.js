// TODO: Add book details by ISBN
// TODO: Add book image
// TODO: Add a tileview for books

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

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function runAtStart(){
  if (storageAvailable('localStorage')) {
    if(!localStorage.getItem('myLibrary')){
      localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }else{
      const retrievedObject = localStorage.getItem('myLibrary');
      let parsed = JSON.parse(retrievedObject);
      console.log("parsed ", parsed);
      myLibrary = parsed;
    }
  }
  else {
    console.log('local storage not available');
  }
}

function updateLocalStorage(){
  if (storageAvailable('localStorage')) {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  }else{
    console.log('local storage not available');
  }
}

function onAddBtnClick(){
  let titleElement = document.getElementById("title");
  let authorElement = document.getElementById("author");
  let pagesElement = document.getElementById("pages");
  let readElement = document.getElementById("read");

  let [title, author, pages, read] = [titleElement.value, authorElement.value, pagesElement.value, readElement.checked];

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
  if(isNaN(pages)){
    showError('Page number must be a number');
    return;
  }else if(pages > 3000){
    showError('Pages more than 3000 not supported');
    return;
  }

  let id = myLibrary[myLibrary.length -1].id;
  if(id == undefined){
    id = 0;
  }else{
    id++;
  }

  let bookObj = {
    id,
    title,
    author,
    pages,
    read
  }

  // Add to the array
  myLibrary.push(bookObj);
  updateLocalStorage();

  // Update the DOM
  addBookToDom(bookObj);

  // Reset form values
  resetFormValues(titleElement, authorElement, pagesElement);
  readElement.checked = false;
}

//expects input DOM elements as arguments
function resetFormValues(){
  if(arguments.length === 0) return
  for(let i=0; i<arguments.length; i++){
    if('value' in arguments[i]){
      arguments[i].value = '';
    }
  }

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

function toggleRead(bookId){
  myLibrary[bookId].read = !myLibrary[bookId].read;
  modifyBook(myLibrary[bookId]);
}

function removeBook(bookId){
  //Starting at index bookId, remove 1 element
  //remove from array
  myLibrary.splice(bookId, 1);
  //remove from DOM
  const elementToDelete = document.querySelector(`.book-container[id='${bookId}']`);
  console.log('element to delete: ', elementToDelete)
  libraryContainer.removeChild(elementToDelete);
  updateLocalStorage();
}

function modifyBook(book){
  // expects book to be an object
  let readText = '';
  let readToggleText = '';

  if(book.read){
    readText = "read"
    readToggleText = "Unread"
  }else{
    readText = "not read yet";
    readToggleText = "Read"
  }
  let bookInfo = document.querySelector(`.book-container[id='${book.id}'] .book-info`);
  bookInfo.textContent = `${book.title} by ${book.author}, ${book.pages}, ${readText}.`

  let readBtn = document.querySelector(`.book-container[id='${book.id}'] .readBtn`);
  readBtn.textContent = readToggleText;

  updateLocalStorage();
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

  let readBtn = document.createElement("div");
  readBtn.classList.add('readBtn');
  readBtn.textContent = 'Read';
  readBtn.addEventListener('click', (e) => {
    toggleRead(e.target.parentElement.attributes.id.value);
  });
  bookContainer.appendChild(readBtn);
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

runAtStart();
render();
