import { render } from "./main";
import { Ahorcado } from "../domain/Ahorcado";

type PalabraConCategoria = { palabra: string; categoria: string };

const LISTA: PalabraConCategoria[] = [
  { palabra: "GATO", categoria: "Animal" },
  { palabra: "PERRO", categoria: "Animal" },
  { palabra: "ROSA", categoria: "Flor" },
  { palabra: "CASA", categoria: "Construcción" },
  { palabra: "ARBOL", categoria: "Naturaleza" },
  { palabra: "AVION", categoria: "Transporte" },
  { palabra: "GUITARRA", categoria: "Instrumento" },
  { palabra: "FUTBOL", categoria: "Deporte" },
];

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
  const elegida = LISTA[Math.floor(Math.random() * LISTA.length)];
  juego = new Ahorcado(elegida.palabra, undefined, elegida.categoria);
  listaActual = LISTA.map(p => p.palabra);
}

render(app, juego, listaActual, word !== null);
