import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10&order=RANDOM&has_breeds=true&include_breeds=true";

const VIBES = [
  "Soulmates!! This kitty's gonna steal half your blanket and you'd get all cozied up with it.",
  "Strong bond. You'd both nap through your alarms together.",
  "Good match! It would knock exactly one thing off your desk, out of love :3",
  "It's complicated.. This cat has its own agenda, and you're part of it.",
  "Platonic energy. Great for a staring contest, not much else.",
  "Chaotic duo. Neither of you reads instructions. Respect.",
];

function loadFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem("veni-vici-favorites"));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function App() {
  const [cat, setCat] = useState(null);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [vibe, setVibe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("veni-vici-favorites", JSON.stringify(favorites));
  }, [favorites]);

  async function discoverCat() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        headers: {
          "x-api-key": "DEMO-API-KEY",
        },
      });

      if (!response.ok){
        throw new Error("Failed to fetch cat data.");
      }

      const data = await response.json();

      // remove cats with attribute from ban list
      const availableCats = data.filter((cat) => {
        if (!cat.breeds || cat.breeds.length === 0){
          return false;
        }

        const breed = cat.breeds[0];

        const attributes = [
          {
            type: "Breed",
            value: breed.name,
          },
          {
            type: "Origin",
            value: breed.origin,
          },
          {
            type: "Temperament",
            value: breed.temperament,
          },
        ];

        return !attributes.some ((attribute) => 
        banList.some(
          (banned) =>
            banned.type === attribute.type && banned.value === attribute.value
        )
      );
      });

      if (availableCats.length === 0){
        setError("No matching cats found. Remove something from your ban list and try again.");
        setLoading(false);
        return;
      }

      // pick random cat from the results
      const randomCat = availableCats[Math.floor(Math.random() * availableCats.length)];

      setCat(randomCat);
      setVibe(VIBES[Math.floor(Math.random() * VIBES.length)]);

      // add previous/current result to history
      setHistory((previousHistory) => {
        if (!cat) {
          return previousHistory;
        }

        return [cat, ...previousHistory];
      });
    } catch (error) {
      console.error(error);
      setError("Something went wrong while fetching the cat.");
    }

    setLoading(false);
  }

  function toggleBan(type,value){
    const alreadyBanned = banList.some(
      (item) => item.type === type && item.value === value
    );

    if (alreadyBanned) {
      setBanList((previousList) =>
      previousList.filter(
        (item) => !(item.type === type && item.value === value)
      )
    );
    } else {
      setBanList((previousList) => [
        ...previousList,
        {
          type,
          value,
        },
      ]);
    }
  }

  function removeBan(type, value){
    setBanList((previousList) =>
    previousList.filter(
      (item) => !(item.type === type && item.value === value)
    )
  );
}

function isBanned(type, value) {
  return banList.some(
    (item) => item.type === type && item.value === value
  );
}

function isFavorited(id) {
  return favorites.some((item) => item.id === id);
}

function toggleFavorite(favCat) {
  setFavorites((previousFavorites) =>
    isFavorited(favCat.id)
      ? previousFavorites.filter((item) => item.id !== favCat.id)
      : [favCat, ...previousFavorites]
  );
}

return (
    <div className="app">
  <header className="header">
    <h1>Veni Vici!</h1>
    <p>Discover something new</p>
  </header>

  <main className="container">
    <section className="discover-section">
      <h2>Discover</h2>

      <p className="instructions">
        Click Discover to find a random cat. Click an attribute to add it to your ban list.
      </p>

      <button className="discover-button" onClick={discoverCat} disabled={loading}>
        {loading ? "Discovering..." : "Discover"}
      </button>

      {error && <p className="error">{error}</p>}

      {cat && cat.breeds && cat.breeds.length > 0 && (
        <div className="cat-card">
          <button
            className={`favorite-toggle ${isFavorited(cat.id) ? "favorited" : ""}`}
            onClick={() => toggleFavorite(cat)}
            aria-label={isFavorited(cat.id) ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited(cat.id) ? "★ Favorited" : "☆ Favorite"}
          </button>

          <img src={cat.url} alt={`A ${cat.breeds[0].name}`} className="cat-image" />

          <div className="cat-info">
            <h2>{cat.breeds[0].name}</h2>

            <button className={`attribute-button ${isBanned("Breed", cat.breeds[0].name) ? "banned" : ""}`} onClick={() => toggleBan("Breed", cat.breeds[0].name)}>
              <strong>Breed:</strong> {cat.breeds[0].name}
            </button>

            <button className={`attribute-button ${isBanned("Origin", cat.breeds[0].origin) ? "banned" : ""}`} onClick={() => toggleBan("Origin", cat.breeds[0].origin)}>
              <strong>Origin:</strong> {cat.breeds[0].origin}
            </button>

            <button className={`attribute-button ${isBanned("Temperament", cat.breeds[0].temperament) ? "banned" : ""}`} onClick={() => toggleBan("Temperament", cat.breeds[0].temperament)}>
              <strong>Temperament:</strong>{" "}
              {cat.breeds[0].temperament}
            </button>

            {vibe && <p className="vibe-match">🔮 Vibe check: {vibe}</p>}
          </div>
        </div>
      )}

    </section>

    <aside className="ban-section">
      <h2>Ban List</h2>

      <p>Click an attribute above to prevent cats with that attribute from showing up.</p>

      {banList.length === 0 ? (
        <p className="empty-message">Nothing banned yet.</p>
      ) : (
        <div className="ban-list">
          {banList.map((item) => (
            <button key={`${item.type}-${item.value}`} className="ban-item" onClick={() => removeBan(item.type, item.value)}>
              {item.type} : {item.value} x
            </button>
          ))}
        </div>
      )}
    </aside>

    <section className="favorites-section">
      <h2>Favorites</h2>

      <p>Click ☆ Favorite on a cat card to save it here. Saved cats stick around between visits.</p>

      {favorites.length === 0 ? (
        <p className="empty-message">No favorites saved yet.</p>
      ) : (
        <div className="history-grid">
          {favorites.map((item) => (
            <div className="history-card favorite-card" key={item.id}>
              <button
                className="remove-favorite"
                onClick={() => toggleFavorite(item)}
                aria-label="Remove from favorites"
              >
                ×
              </button>

              <img src={item.url} alt="Favorited cat" />

              {item.breeds && item.breeds.length > 0 && (
                <div>
                  <strong>{item.breeds[0].name}</strong>
                  <p>{item.breeds[0].origin}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>

    {history.length > 0 && (
      <section className="history-section">
      <h2>Previous Discovered</h2>

      <div className="history-grid">
      {history.map((item, index) => (
        <div className="history-card" key={`${item.id}-${index}`}>
          <img src={item.url} alt="Previously discovered cat" />

          {item.breeds && item.breeds.length > 0 && (
            <div>
              <strong>{item.breeds[0].name}</strong>
              <p>{item.breeds[0].origin}</p>
            </div>
          )}
          </div>
      ))}
      </div>
      </section>
    )}
    </main>
    </div>
  );
}

export default App;