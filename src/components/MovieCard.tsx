type MovieCardProps = {
  title: string;
  year: number;
  genre: string;
  watched: boolean;
  onToggleWatched: () => void;
  rating: number;
  onRate: (rating: number) => void;
};

function MovieCard({title, year, genre, watched, onToggleWatched, rating, onRate,}: MovieCardProps) {
  return (
    <div className={`movie-card ${watched ? 'watched' : ''}`}>

      <h2>{title}</h2>
      <p>📅 Rok: {year}</p>
      <p>🎞️ Gatunek: {genre}</p>

      <div className="rating">
        <span className="rating-label">Twoja ocena:</span>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className={star <= rating ? 'star active' : 'star'}
              onClick={() => onRate(star)}
              aria-label={`Oceń na ${star} gwiazdek`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <button onClick={onToggleWatched}>
        {watched ? '( •̀ ω •́ )✧ Obejrzany' : 'Oznacz jako obejrzany'}
      </button>
    </div>
  );
}

export default MovieCard;
