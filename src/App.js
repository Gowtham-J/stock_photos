import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;
// XKToakipRqq-bMMAhdhVEI2iUc3zbT7G3sTihr0VLP0
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const getPhotos = async () => {
    setLoading(true);

    let url;
    const queryUrl = `&query=${query}`;
    const pageUrl = `&page=${page}`;

    if (query) {
      url = `${searchUrl}${clientID}${pageUrl}${queryUrl}`;
    } else {
      url = `${mainUrl}${clientID}${pageUrl}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.scrollY + window.innerHeight) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => oldPage + 1);
      }
    });
    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            placeholder="search"
            type="text"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="submit-btn" type="submit" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((item, index) => {
            return <Photo key={index} {...item} />;
          })}
        </div>
      </section>
      {loading && <h2 className="loading">loading...</h2>}
    </main>
  );
}

export default App;
