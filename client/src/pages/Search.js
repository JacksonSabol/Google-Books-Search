import React, { Component } from "react";
// import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: ""
  };

  loadBooks = (data) => {
    this.setState({ books: data, title: "" })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSearchSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getBooksGoo(this.state.title)
        .then(res => {
          console.log(res)
          this.loadBooks(res.data.items);
        })
        .catch(err => console.log(err));
    }
  };
  // Add to this function 
  handleSaveBook = id => {
    // event.preventDefault();
    // if (this.state.title) {
    //   API.saveBook({
    //     title: this.state.title,
    //     author: this.state.author,
    //     synopsis: this.state.synopsis
    //   })
    //     .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // }
    const savedBook = this.state.books.filter(book => book.id === id)
    console.log(savedBook);
    const bookDetails = {
      googleId: id,
      title: savedBook[0].volumeInfo.title,
      author: savedBook[0].volumeInfo.authors,
      description: savedBook[0].volumeInfo.description,
      image: savedBook[0].volumeInfo.imageLinks.thumbnail,
      link: savedBook[0].volumeInfo.previewLink,
    }
    API.saveBook(bookDetails)
      .then(res => console.log("I am back from saved"))
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
          <Col size="md-12">
            <Jumbotron>
              <h4>Book Search:</h4>
              <form>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleSearchSubmit}
                >
                  Search
              </FormBtn>
              </form>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    {/* Don't use Link in this way - it will prepend the URL with the current URL */}
                    <Link to={book.volumeInfo.previewLink}>
                      {book.volumeInfo.title}
                    </Link>
                    <p>Written by: {book.volumeInfo.authors[0]}</p>
                    <p>Published on: {book.volumeInfo.publishedDate}</p>
                    <button onClick={() => this.handleSaveBook(book.id)}>Save </button>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} className="book-image" />
                    <p>{book.volumeInfo.description}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>Oh No! We couldn't find any books matching that title!</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
