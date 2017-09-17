import React from "react";
import Book from "./Book";

const BookList = ({books, changeBookShelf}) =>
  <ol className="books-grid">
    {books.map(({id, title, authors, imageLinks, shelf}) =>
      <li key={id}>
        <Book
          id={id}
          title={title}
          authors={authors}
          thumbnail={imageLinks.thumbnail}
          shelf={shelf}
          changeBookShelf={changeBookShelf}
        />
      </li>
    )}
  </ol>

export default BookList;
