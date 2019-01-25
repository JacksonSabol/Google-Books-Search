import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";
import API from "../utils/API";

class Saved extends Component {
  state = {
    books: []
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
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>(React) Google Books Search</h1>
          <h2>Search for and Save Books of Interest</h2>
        </Jumbotron>
        <Row>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={book.link}>
                        {book.title}
                    </Link>
                    <p>Written by: {book.author}</p>
                    <p>Published on: {book.date}</p>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    <img src={book.link} alt={book.title} className="book-image" />
                    <p>{book.description}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>Oh No! You have no saved books!</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
