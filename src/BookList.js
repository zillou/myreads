import React from "react";
import Book from "./Book";

const BookList = ({books, changeBookShelf}) => {
  const DEFAULT_COVER = "https://books.google.com.hk/googlebooks/images/no_cover_thumb.gif"

  return(
    <ol className="books-grid">
      {books.map(({id, title, authors, imageLinks, shelf}) =>
        <li key={id}>
          <Book
            id={id}
            title={title}
            authors={authors}
            thumbnail={imageLinks ? imageLinks.thumbnail : DEFAULT_COVER}
            shelf={shelf}
            changeBookShelf={changeBookShelf}
          />
        </li>
      )}
    </ol>
  )
}

export default BookList;
