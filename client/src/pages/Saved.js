import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
// import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";
import Moment from "moment";
import "../index.css";

class Saved extends Component {
  state = {
    books: [],
    errorMessage: ""
  };
  // Life-cycle function that executes when the components mount (page loads)
  componentDidMount() {
    this.loadBooks();
  }
  // Function to load all books from the database
  loadBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  };

  // Function to delete book from Saved page
  handleDeleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks()) //We need to think where this needs to go, and what we show, a clean screen??? because can't load the same books
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container >
        <Jumbotron />
        <Row>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={book.link} rel="noopener noreferrer" target="_blank">{book.title}</a>
                    <img src={book.image} alt={book.title} className="book-image" />
                    <p className="list-author">Written by: {book.author}</p>
                    <p className="list-publish">Published on: {Moment(book.date, "YYYY-MM-DDTHh:mm:ss").format("MM/DD/YYYY")}</p>
                    <p className="list-description">{book.description}</p>
                    <button className="list-button" onClick={() => this.handleDeleteBook(book._id)}>Delete </button>
                  </ListItem>
                ))}
              </List>
            ) : (
              <p className="search__form--alert">Oh No! It looks like you don't have any saved books!</p>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
