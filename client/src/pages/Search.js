import React, { Component } from "react";
// import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Search extends Component {
  state = {
    books: [],
    title: "",
    errorMessage: ""
  };

  loadBooks = (data) => {

    let objBooks = { books: [] };

    for (let i = 0; i < data.length; i++) {
      if (data[i].volumeInfo.imageLinks) {
        let item = {
          id: data[i].id,
          title: data[i].volumeInfo.title,
          authors: data[i].volumeInfo.authors,
          publishedDate: data[i].volumeInfo.publishedDate,
          description: data[i].volumeInfo.description,
          image: data[i].volumeInfo.imageLinks.thumbnail,
          link: data[i].volumeInfo.previewLink,
        }
        objBooks.books.push(item)
      }
    }
    console.log(objBooks.books)
    // console.log(objBooks.books[0].title)
    this.setState({ books: objBooks.books, title: ""})
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
          console.log(res.data.items);
          this.loadBooks(res.data.items);
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errorMessage: "We didn't find any book with this information"
          });
        });
    }
  };
  // Add to this function 
  handleSaveBook = id => {

    const savedBook = this.state.books.filter(book => book.id === id)
    console.log(savedBook);
    const bookDetails = {
      googleId: id,
      title: savedBook[0].title,
      author: savedBook[0].authors,
      description: savedBook[0].description,
      image: savedBook[0].image,
      link: savedBook[0].link,
    }
    API.saveBook(bookDetails)
      .then(res => {
        console.log("I am back from saved");
        this.setState({
          books: [],
        });
      })
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
                    <Link to={book.link}>
                      {book.title}
                    </Link>
                    <p>Written by: {book.authors}</p>
                    <p>Published on: {book.publishedDate}</p>
                    <img src={book.image} alt={book.title} className="book-image" />
                    <p>{book.description}</p>
                    <button onClick={() => this.handleSaveBook(book.id)}>Save </button>
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
