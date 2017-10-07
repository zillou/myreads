import React from 'react'
import { Route, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./Bookshelf";
import update from "immutability-helper";
import SearchBook from "./SearchBook";

import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }

    this.changeBookShelf = this.changeBookShelf.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => this.setState({books}));
  }

  changeBookShelf(book, shelf) {
    const originalBooks = this.state.books;

    BooksAPI.update(book, shelf).then(data => {
      const originalBook = originalBooks.find(b => book.id === b.id);
      if (originalBook) {
        const updatedBook = update(originalBook, {shelf: {$set: shelf}});
        const bookIndex = originalBooks.findIndex(b => book.id === b.id);
        const updatedBooks = update(originalBooks, {
          $splice: [[bookIndex, 1, updatedBook]]
        });

        this.setState({books: updatedBooks});
      } else {
        originalBooks.push(book)
        this.setState({books: originalBooks});
      }
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <SearchBook existingBooks={this.state.books} changeBookShelf={this.changeBookShelf} />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  title="Currently Reading"
                  books={this.state.books.filter(book => book.shelf === "currentlyReading")}
                  changeBookShelf={this.changeBookShelf}
                />
                <Bookshelf title="Want to Read"
                  books={this.state.books.filter(book => book.shelf === "wantToRead")}
                  changeBookShelf={this.changeBookShelf}
                />
                <Bookshelf title="Read"
                  books={this.state.books.filter(book => book.shelf === "read")}
                  changeBookShelf={this.changeBookShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
