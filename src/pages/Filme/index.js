import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../../services";

import "./Filme.css";

export default function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "338548ff71ef864f137bd2d29c0cd9f7",
            language: "pt-BR"
          }
        })
        .then((response) => {
          setFilmes(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("FILME NÃO ENCONTRADO");
          navigate("/", { replace: true });
        });
    }
    loadFilme();

    return () => {
      console.log("COMPONENTE DESMONTADO");
    };
  }, [navigate, id]);

  function filmesSalvo() {
    const minhaLista = localStorage.getItem("@primeFlix");

    let filmeSalvo = JSON.parse(minhaLista) || [];

    const repFilmes = filmeSalvo.some((salvo) => salvo.id === filmes.id);

    if (repFilmes) {
      alert("ESSE FILME JÁ ESTÁ NA LISTA");
      return;
    }

    filmeSalvo.push(filmes);
    localStorage.setItem("@primeFlix", JSON.stringify(filmeSalvo));
    alert("FILME SALVO COM SUCESSO");
  }

  if (loading) {
    return <h1 className="filme-info">Carregando detalhes do filme..</h1>;
  }

  return (
    <div className="filme-info">
      <h1>{filmes.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filmes.backdrop_path}`}
        alt={filmes.title}
      />
      <h3>Sinopse</h3>
      <span>{filmes.overview}</span>
      <strong>Avaliação: {filmes.vote_average} /10</strong>

      <div className="area-buttom">
        <button onClick={filmesSalvo}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filmes.title} trailer`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
