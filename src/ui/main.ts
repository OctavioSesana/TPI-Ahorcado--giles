import { Ahorcado } from "../domain/Ahorcado";

export function render(app: HTMLElement, palabra: string): void {
  const juego = new Ahorcado(palabra);

  function renderizar(): void {
    app.innerHTML = `
      <input type="text" />
      <div data-testid="word">${juego.perdio() ? juego.palabraRevelada() : juego.palabraEnmascarada()}</div>
      <div data-testid="lives">${juego.vidas()}</div>
      <div data-testid="message">${juego.gano() ? "GANASTE" : juego.perdio() ? "PERDISTE" : juego.mensaje()}</div>
    `;

    const input = app.querySelector("input")!;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        juego.adivinar(input.value);
        renderizar();
      }
    });
  }

  renderizar();
}
