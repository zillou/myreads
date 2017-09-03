import React from "react";
import Book from "./Book";

const BookList = ({books}) =>
  <ol className="books-grid">
    {books.map(({title, authors, coverURL, shelf}) =>
      <li key={title}>
        <Book
          title={title}
          authors={authors}
          coverURL={coverURL}
          shelf={shelf} />
      </li>
    )}
  </ol>

export default BookList;
