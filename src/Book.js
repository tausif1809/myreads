import React, { Component } from "react";

class Book extends Component {
  render() {
    const { books, onUpdateBook } = this.props;
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${
                      book.imageLinks === undefined
                        ? "no image"
                        : book.imageLinks.smallThumbnail
                    })`
                  }}
                ></div>
                <div className="book-shelf-changer">
                  <select
                    defaultValue={book.shelf}
                    onChange={e => onUpdateBook(book, e.target.value)}
                  >
                    <option value="move" disabled>
                      Move to...
                    </option>
                    <option value="none">None</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                {book.title === null ? "" : book.title}
              </div>
              {book.authors !== undefined &&
                book.authors.map(author => (
                  <div className="book-authors" key={author}>
                    {author}
                  </div>
                ))}
            </div>
          </li>
        ))}
      </ol>
    );
  }
}

export default Book;
