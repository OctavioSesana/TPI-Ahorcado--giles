import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("muestra la palabra enmascarada al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });

  it("inicia con 6 vidas", () => {
  const juego = new Ahorcado("GATO");
  expect(juego.vidas()).toBe(6);
});
});