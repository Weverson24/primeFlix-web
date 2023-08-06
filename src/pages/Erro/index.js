import { Link } from "react-router-dom";
import "./Erro.css";

export default function Erro() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Pagina não encontrada</h2>
      <Link to="/">Vela todos os filmes</Link>
    </div>
  );
}
