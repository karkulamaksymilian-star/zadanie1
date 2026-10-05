import { useState } from 'react';
import movies from './data/movies.json';
import MovieCard from './components/MovieCard';
import './App.css';

type Filter = 'all' | 'watched' | 'unwatched';

function App() {

  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);

  const [filter, setFilter] = useState<Filter>('all');

  const [ratings, setRatings] = useState<Record<number, number>>({});

  const toggleWatched = (movieId: number) => {
    setWatchedMovies((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const handleRating = (movieId: number, rating: number) => {
    setRatings((prev) => ({
      ...prev,
      [movieId]: rating,
    }));
  };

  const filteredMovies = movies.filter((movie) => {
    if (filter === 'watched') {
      return watchedMovies.includes(movie.id);
    }

    if (filter === 'unwatched') {
      return !watchedMovies.includes(movie.id);
    }

    return true;
  });

  return (
    <div>
      <h1>
        Obejrzane: {watchedMovies.length} / {movies.length}
      </h1>

      <div>
        <button onClick={() => setFilter('all')}>
          Wszystkie
        </button>

        <button onClick={() => setFilter('watched')}>
          Obejrzane
        </button>

        <button onClick={() => setFilter('unwatched')}>
          Nieobejrzane
        </button>
      </div>

      <ul>
  {filteredMovies.length > 0 ? (
    filteredMovies.map((movie) => (
      <li key={movie.id}>
        <MovieCard
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          watched={watchedMovies.includes(movie.id)}
          onToggleWatched={() => toggleWatched(movie.id)}
          rating={ratings[movie.id] || 0}
          onRate={(rating) => handleRating(movie.id, rating)}
        />
      </li>
    ))
  ) : (
    <p className="empty-message">
      🌸 Brak filmów na tej liście 🌸
    </p>
  )}
</ul>
    </div>
  );
}

export default App;
