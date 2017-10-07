import React, { Component } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      books: []
    }
  }

  handleSearch = (e) => {
    const term = e.target.value;
    this.setState({term});
    BooksAPI.search(term, 20).then(books => {
      this.setState({
        books: books.map((book) => {
          const existingBook = this.props.existingBooks.find(existingBook => existingBook.id === book.id)
          if (existingBook) {
            book["shelf"] = existingBook["shelf"]
          } else {
            book["shelf"] = "none"
          }
          return book;
        })
      });
    })
  }

  render() {
    const { term } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={term}
              onChange={this.handleSearch}
              placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <BookList books={this.state.books} changeBookShelf={this.props.changeBookShelf} />
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;
