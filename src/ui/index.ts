import { render } from "./main";
import { Ahorcado } from "../domain/Ahorcado";

const LISTA = ["GATO", "PERRO", "PATO", "CASA", "ÁRBOL"];

const app = document.getElementById("app")!;
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lista = params.get("lista");
const categoria = params.get("categoria") ?? "";

let juego: Ahorcado;
let listaActual: string[];

if (word !== null) {
  juego = new Ahorcado(word, undefined, categoria);
  listaActual = [word];
} else if (lista !== null) {
  juego = new Ahorcado([lista]);
  listaActual = [lista];
} else {
  juego = new Ahorcado(LISTA);
  listaActual = LISTA;
}

render(app, juego, listaActual, word !== null);
