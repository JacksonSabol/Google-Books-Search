import axios from "axios";

export default {

  // Gets the books from Google
  getBooksGoo: function (input) {
    console.log("input: ", input)
    return axios.get("/api/books/google/" + input);
  },
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    console.log("I am in savebook");
    return axios.post("/api/books", bookData);
  }
};
