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

});