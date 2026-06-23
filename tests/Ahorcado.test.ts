import { describe, it, expect } from "vitest";
import { Ahorcado } from "../src/domain/Ahorcado";

describe("Ahorcado", () => {
  it("muestra la palabra enmascarada al iniciar", () => {
    const juego = new Ahorcado("GATO");
    expect(juego.palabraEnmascarada()).toBe("_ _ _ _");
  });
});