let myLibrary = [];

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

const HarryPotter = new Book("Harry Potter", "J.K. Rowling", 545, true);

console.log(HarryPotter.info());
console.log(HarryPotter.constructor);
