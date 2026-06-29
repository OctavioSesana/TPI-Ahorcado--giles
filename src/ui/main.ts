import { Ahorcado } from "../domain/Ahorcado";

export function render(app: HTMLElement, juego: Ahorcado, lista: string[], arranco: boolean): void {
  if (!arranco) {
    app.innerHTML = `<button>Comenzar juego</button>`;
    app.querySelector("button")!.addEventListener("click", () => render(app, juego, lista, true));
    return;
  }

  function renderizar(): void {
    const terminado = juego.gano() || juego.perdio();

    app.innerHTML = `
      <input type="text" />
      <div data-testid="word">${juego.perdio() ? juego.palabraRevelada() : juego.palabraEnmascarada()}</div>
      <div data-testid="lives">${juego.vidas()}</div>
      <div data-testid="message">${juego.gano() ? "GANASTE" : juego.perdio() ? "PERDISTE" : juego.mensaje()}</div>
      ${terminado ? `<button>Jugar de nuevo</button>` : ""}
    `;

    const input = app.querySelector("input")!;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        juego.adivinar(input.value);
        renderizar();
      }
    });

    if (terminado) {
      app.querySelector("button")!.addEventListener("click", () => {
        const nuevaPalabra = lista[Math.floor(Math.random() * lista.length)];
        juego.reiniciar(nuevaPalabra);
        renderizar();
      });
    }
  }

  renderizar();
}
