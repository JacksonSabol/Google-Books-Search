import axios from "axios";

export default {

  getGoogleBooks:function(book) {
    require('dotenv').config();
    
    var secret = process.env.googlebookskey;
    var url = ` https://www.googleapis.com/books/v1/volumes?q=${book}+robot&key=${secret}`;
    return ( axios.get( url))

    // structure: objet with array of items
    // structure of one item: https://www.googleapis.com/books/v1/volumes/2vnbMzYXBQsC
  },

  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  }
};
