import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import Wrapper from "../components/Wrapper";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";
import Moment from "moment";
import "../index.css";

class Search extends Component {
  state = {
    books: [],
    title: "",
    errorMessage: "Type in the title of a book you'd like to read!"
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
          this.loadBooks(res.data.items);
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errorMessage: "Oh No! We couldn't find any books related to your query!"
          });
        });
    }
  };
  // Add to this function 
  handleSaveBook = id => {
    const savedBook = this.state.books.filter(book => book.id === id)
    const bookDetails = {
      googleId: id,
      title: savedBook[0].title,
      author: savedBook[0].authors,
      description: savedBook[0].description,
      image: savedBook[0].image,
      link: savedBook[0].link,
      date: savedBook[0].publishedDate
    }
    API.saveBook(bookDetails)
      .then(res => {
        this.props.history.push("/saved");
      })
      .catch(err => console.log(err));

  };

  render() {
    return (
      <Container >
        <Jumbotron />
        <Row className="search">
          <Col size="md-12">
            <Wrapper>
              <form className="search__form">
              <p className= "search__form--heading">Book Search:</p>
                <Input className="search__form--input"
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn className="search__form--button"
                  disabled={!(this.state.title)}
                  onClick={this.handleSearchSubmit}
                >
                  Search
              </FormBtn>
              </form>
            </Wrapper>
          </Col>
        </Row>
        <Row>
          <Col size="md-12 sm-12">
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <a href={book.link} rel="noopener noreferrer" target="_blank">{book.title}</a>
                    <img src={book.image} alt={book.title} className="book-image" />
                    <p className="list-author">Written by: {book.authors}</p>
                    <p className="list-publish">Published on: {Moment(book.publishedDate, "YYYY-MM-DDTHh:mm:ss").format("MM/DD/YYYY")}</p>
                    <p className="list-description">{book.description}</p>
                    <button className="list-button" onClick={() => this.handleSaveBook(book.id)}>Save </button>
                  </ListItem>
                ))}
              </List>
            ) : (
                <p className="search__form--openmsg">{this.state.errorMessage}</p>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Search;
