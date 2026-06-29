import { render } from "./main";
import { Ahorcado } from "../domain/Ahorcado";

const LISTA = ["GATO", "PERRO", "PATO", "CASA", "ÁRBOL"];

const app = document.getElementById("app")!;
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lista = params.get("lista");

let juego: Ahorcado;
if (word !== null) {
  juego = new Ahorcado(word);
} else if (lista !== null) {
  juego = new Ahorcado([lista]);
} else {
  juego = new Ahorcado(LISTA);
}

render(app, juego, word !== null);
