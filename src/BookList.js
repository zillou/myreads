import React from "react";
import Book from "./Book";

const BookList = ({books}) =>
  <ol className="books-grid">
    {books.map(({title, authors, imageLinks, shelf}) =>
      <li key={title}>
        <Book
          title={title}
          authors={authors}
          thumbnail={imageLinks.thumbnail}
          shelf={shelf} />
      </li>
    )}
  </ol>

export default BookList;
