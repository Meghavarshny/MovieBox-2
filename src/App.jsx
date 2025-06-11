import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([])
  const [serachTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
  if (!title.trim()) return;
  
  try {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    if (data.Response === "True") {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  } catch (err) {
    console.error("Error fetching movies:", err);
    setMovies([]);
  }
};

  useEffect(() => {
    searchMovies("Batman");
  }, []);


  return (
    <>
      <div className="app">
        <h1>MovieBox</h1>

        <div className="search">
          <input placeholder="Search for movies"
            value={BatMan}
            onClick={(e) => searchMovies(e.target.value)}/>

          <img src={SearchIcon} alt="search" onClick={() => searchMovies(serachTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
          {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
           ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
    </>
  )
}

export default App;
