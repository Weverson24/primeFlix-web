import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favoritos.css";

export default function Favoritos() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    const minhaLista = localStorage.getItem("@primeFlix");
    setFilmes(JSON.parse(minhaLista) || []);
  }, []);

  function excluirFavoritos(id) {
    let filterFavoritos = filmes.filter((filme) => {
      return filme.id !== id;
    });
    setFilmes(filterFavoritos);
    localStorage.setItem("@primeFlix", JSON.stringify(filterFavoritos));
    alert("FILME REMOVIDO COM SUCESSO");
  }

  return (
    <div className="meus-filmes">
      <h1>Meus favoritos</h1>
      {filmes.length === 0 && <span>Não possui nenhum filme salvo : (</span>}
      <ul>
        {filmes.map((filme) => {
          return (
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFavoritos(filme.id)}>
                  Excluir
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
