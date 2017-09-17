import React from "react";
import BookList from "./BookList";

const Bookshelf = ({title, books, changeBookShelf}) =>
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <BookList books={books} changeBookShelf={changeBookShelf} />
    </div>
  </div>

export default Bookshelf
