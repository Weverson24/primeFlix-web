import api from "../../services";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("discover/movie", {
        params: {
          api_key: "338548ff71ef864f137bd2d29c0cd9f7",
          language: "pt-BR",
          page: 1
        }
      });
      setFilmes(response.data.results.splice(10, 20));
      setLoading(false);
    }
    loadFilmes();
  }, []);

  if (loading) {
    return <h1>Carregando pagina...</h1>;
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
