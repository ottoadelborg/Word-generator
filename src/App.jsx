import "./App.css";
import { useState } from "react";

function App() {
  // State för när användaren skriver i input och söker efter det i API
  const [search, setSearch] = useState("");
  // State för try/if som ligger med API fetch
  const [error, setError] = useState("");
  // State som sparar info om vad som kommer tillbaka från API fetchen
  const [results, setResults] = useState([]);

  // API fetch med try/if om användaren skriver ett ord som inte finns eller finns-
  // plockar if upp
  async function WordFinder() {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
      );
      if (!response.ok) {
        throw new error("Word cannot be found");
      }
      const data = await response.json();
      setResults(data);
      console.log(data);
    } catch (error) {
      setError("Word cannot be found");
    }
  }

  // Passerar audioURL direkt för att kalla den genom knappen
  function PlayAudio(audioUrl) {
    let audio = new Audio(audioUrl);
    audio.play();
  }

  return (
    <div className="App">
      <h1>WORD GENERATOR</h1>
      <section className="input--Wrapper">
        <input
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          data-testid="searchbar"
        />
        <button
          onClick={WordFinder}
          className="search--button"
          data-testid="searchbutton"
        >
          Search
        </button>
        {error ? <p className="error--message">{error}</p> : null}
        <section className="result--container">
          {/* Mappar ut allt som jag behöver från setResults state */}
          {results.map((result, index) => (
            <div key={index}>
              <h2 data-testid="word">{result?.word}</h2>
              <p>{error?.title}</p>
              <p>{result.meanings?.antonyms}</p>
              <p data-testid="definition">
                Definition: {result.meanings[0].definitions[0].definition}
              </p>
              <p>Synonyms: {result.meanings[0].definitions[0].synonyms[0]}</p>
              <p>Example: {result.meanings[0].definitions[0].example}</p>
              <p>Source: {result?.sourceUrls}</p>
              <button
                onClick={() => PlayAudio(result.phonetics[0].audio)}
                className="audio--button"
                data-testid="audiobutton"
              >
                Ljud
              </button>
              <hr />
            </div>
          ))}
        </section>
      </section>
    </div>
  );
}

export default App;
