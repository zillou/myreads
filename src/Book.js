import React from "react";

const Book = (book) => {
  const {title, authors, thumbnail, shelf, changeBookShelf } = book;

  return (
  <div className="book">
    <div className="book-top">
      <div className="book-cover"
        style={
          {
            width: 128,
            height: 192,
            backgroundImage: `url("${thumbnail}")`
          }
        }></div>

      <div className="book-shelf-changer">
        <select onChange={e => changeBookShelf(book, e.target.value)} defaultValue={shelf}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{ title }</div>
    { authors && <div className="book-authors">{ authors.join(", ") }</div> }
  </div>
  )
}

export default Book;
