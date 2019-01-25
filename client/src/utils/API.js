import axios from "axios";
import googleAPIKey from "./keys.js"

export default {

  getGoogleBooks: function (book) {

    var secret = googleAPIKey;
    var url = ` https://www.googleapis.com/books/v1/volumes?q=${book}+robot&key=${secret}`;
    return axios.get(url);
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
    return axios.post("/api/books", bookData);
  }
};
