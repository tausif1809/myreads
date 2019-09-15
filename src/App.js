import React from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filteredBooks: [],
      searchError: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
    this.setState({
      filteredBooks: []
    });
  }

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books: books
      }));
    });
  }
  onUpdateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks();
    });
  };

  handleInputChange(e) {
    if (e.target.value.length > 0) {
      this.searchBooks(e.target.value);
    } else {
      this.setState({
        filteredBooks: [],
        noResults: true
      });
    }
  }

  searchBooks(query) {
    if (query !== "") {
      BooksAPI.search(query).then(filteredBooks => {
        if ("error" in filteredBooks) {
          this.setState({
            filteredBooks: [],
            noResults: true
          });
        } else {
          this.state.books.forEach(b => {
            filteredBooks
              .filter(f => f.id === b.id)
              .map(m => (m.shelf = b.shelf));
          });

          this.setState({
            filteredBooks: filteredBooks,
            noResults: false
          });
        }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <Route
          path="/search"
          exact
          render={({ history }) => (
            <div className="search-books">
              <div className="custom-nav-bar">
                <Link className="close-create-contact" to="/">
                  Home
                </Link>
              </div>
              <div className="search-books-bar">
                <button className="close-search">Close</button>
                <div className="search-books-input-wrapper">
                  <form>
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      onChange={this.handleInputChange}
                    />
                  </form>
                </div>
              </div>

              <div className="search-books-results">
                {this.state.noResults === true && <div>No results found</div>}
                {this.state.filteredBooks.length > 0 && (
                  <Book
                    books={this.state.filteredBooks}
                    onUpdateBook={(book, shelf) => {
                      this.onUpdateBook(book, shelf);
                    }}
                  />
                )}
              </div>
            </div>
          )}
        />
        <Route
          path="/"
          exact
          render={({ history }) => (
            <div className="list-books">
              <div className="custom-nav-bar">
                <Link
                  className="close-create-contact"
                  to="/search"
                  onClick={() => this.setState({ filteredBooks: [] })}
                >
                  Search
                </Link>
              </div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                      <Book
                        books={this.state.books.filter(x => {
                          return x.shelf === "currentlyReading";
                        })}
                        onUpdateBook={(book, shelf) => {
                          this.onUpdateBook(book, shelf);
                        }}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                      <Book
                        books={this.state.books.filter(x => {
                          return x.shelf === "wantToRead";
                        })}
                        onUpdateBook={(book, shelf) => {
                          this.onUpdateBook(book, shelf);
                        }}
                      />
                    </div>
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <Book
                        books={this.state.books.filter(x => {
                          return x.shelf === "read";
                        })}
                        onUpdateBook={(book, shelf) => {
                          this.onUpdateBook(book, shelf);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="open-search">
                <button>Add a book</button>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
