import { Ahorcado } from "../domain/Ahorcado";

export function render(app: HTMLElement, juego: Ahorcado, arranco: boolean): void {
  if (!arranco) {
    app.innerHTML = `<button>Comenzar juego</button>`;
    app.querySelector("button")!.addEventListener("click", () => render(app, juego, true));
    return;
  }

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
