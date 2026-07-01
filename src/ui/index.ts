import { render } from "./main";
import { Ahorcado } from "../domain/Ahorcado";

type PalabraConCategoria = { palabra: string; categoria: string };

const LISTA: PalabraConCategoria[] = [
  { palabra: "GATO", categoria: "Animal" },
  { palabra: "PERRO", categoria: "Animal" },
  { palabra: "PATO", categoria: "Animal" },
  { palabra: "CASA", categoria: "Objeto" },
  { palabra: "ÁRBOL", categoria: "Naturaleza" },
];

const app = document.getElementById("app")!;
const params = new URLSearchParams(window.location.search);
const word = params.get("word");
const lista = params.get("lista");
const categoriaParam = params.get("categoria") ?? "";

let juego: Ahorcado;
let listaActual: PalabraConCategoria[];

if (word !== null) {
  juego = new Ahorcado(word, undefined, categoriaParam);
  listaActual = [{ palabra: word, categoria: categoriaParam }];
} else if (lista !== null) {
  juego = new Ahorcado(lista, undefined, "");
  listaActual = [{ palabra: lista, categoria: "" }];
} else {
  const elegida = LISTA[Math.floor(Math.random() * LISTA.length)];
  juego = new Ahorcado(elegida.palabra, undefined, elegida.categoria);
  listaActual = LISTA;
}

render(app, juego, listaActual, word !== null);
