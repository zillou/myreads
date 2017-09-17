import React from 'react'
import { Route, Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import Bookshelf from "./Bookshelf";
import update from "immutability-helper";

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
      const updatedBook = update(originalBook, {shelf: {$set: shelf}});
      const bookIndex = originalBooks.findIndex(b => book.id === b.id);
      const updatedBooks = update(originalBooks, {
        $splice: [[bookIndex, 1, updatedBook]]
      });
      this.setState({books: updatedBooks})
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={() => (
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
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
