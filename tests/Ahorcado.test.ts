import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("muestra la palabra enmascarada al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("tiene 6 vidas al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.vidas()).toBe(6);
  });

  it("revela todas las ocurrencias de la letra acertada", () => {
  const juego = new Ahorcado("ALA");
  juego.adivinar("A");
  expect(juego.palabraEnmascarada()).toBe("A _ A");
});

it("acertar una letra no descuenta vidas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  expect(juego.vidas()).toBe(6);
});

it("es case-insensitive al adivinar", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("g");
  expect(juego.palabraEnmascarada()).toBe("G _ _ _");
});

it("fallar una letra descuenta una vida", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.vidas()).toBe(5);
});

it("fallar una letra no modifica la palabra enmascarada", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
});

it("gano() devuelve true al revelar todas las letras", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  juego.adivinar("A");
  juego.adivinar("T");
  juego.adivinar("O");
  expect(juego.gano()).toBe(true);
});

it("gano() devuelve false con letras pendientes", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("G");
  expect(juego.gano()).toBe(false);
});

it("perdio() devuelve true al llegar a 0 vidas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  juego.adivinar("I");
  juego.adivinar("U");
  juego.adivinar("B");
  juego.adivinar("C");
  juego.adivinar("D");
  expect(juego.perdio()).toBe(true);
});

it("perdio() devuelve false con vidas restantes", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E");
  expect(juego.perdio()).toBe(false);
});

it("palabraRevelada() devuelve la palabra completa", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.palabraRevelada()).toBe("GATO");
});

it("repetir una letra ya intentada no descuenta vidas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  juego.adivinar("A");
  expect(juego.vidas()).toBe(6);
});

it("repetir una letra ya intentada informa que ya fue ingresada", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("A");
  juego.adivinar("A");
  expect(juego.mensaje()).toBe("Letra ya ingresada");
});

it("ingresar un número no descuenta vidas", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("1");
  expect(juego.vidas()).toBe(6);
});

it("ingresar un número informa entrada inválida", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("1");
  expect(juego.mensaje()).toBe("Entrada inválida");
});

it("elige una palabra de la lista usando el selector inyectado", () => {
  const lista = ["GATO", "PERRO", "PATO"];
  const juego = new Ahorcado(lista, () => 1); // siempre elige índice 1 = "PERRO"
  expect(juego.palabraEnmascarada()).toBe("_ _ _ _ _");
});

it("reiniciar() resetea las vidas y la palabra enmascarada", () => {
  const juego = new Ahorcado("GATO");
  juego.adivinar("E"); // falla, vidas = 5
  juego.reiniciar("PERRO");
  expect(juego.vidas()).toBe(6);
  expect(juego.palabraEnmascarada()).toBe("    _");
});

});