import { Ahorcado } from "../domain/Ahorcado";

function hangmanSVG(errores: number): string {
  const partes = [
    `<circle cx="60" cy="28" r="8" stroke="black" fill="none" stroke-width="2"/>`,
    `<line x1="60" y1="36" x2="60" y2="65" stroke="black" stroke-width="2"/>`,
    `<line x1="60" y1="45" x2="42" y2="58" stroke="black" stroke-width="2"/>`,
    `<line x1="60" y1="45" x2="78" y2="58" stroke="black" stroke-width="2"/>`,
    `<line x1="60" y1="65" x2="42" y2="85" stroke="black" stroke-width="2"/>`,
    `<line x1="60" y1="65" x2="78" y2="85" stroke="black" stroke-width="2"/>`,
  ];
  return `<svg viewBox="0 0 100 110" width="100" height="110" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="105" x2="90" y2="105" stroke="black" stroke-width="2"/>
    <line x1="10" y1="5" x2="10" y2="105" stroke="black" stroke-width="2"/>
    <line x1="10" y1="5" x2="60" y2="5" stroke="black" stroke-width="2"/>
    <line x1="60" y1="5" x2="60" y2="20" stroke="black" stroke-width="2"/>
    ${partes.slice(0, errores).join("")}
  </svg>`;
}

export function render(app: HTMLElement, juego: Ahorcado, lista: { palabra: string; categoria: string }[], arranco: boolean): void {
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
      <div data-testid="hangman-parts" data-parts="${juego.errores()}">${hangmanSVG(juego.errores())}</div>
      ${terminado ? `<button>Jugar de nuevo</button>` : ""}
      <button>Ver pista</button>
      <div>${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l =>
        `<button data-testid="key-${l}"${juego.letraUsada(l) ? " disabled" : ""}>${l}</button>`
      ).join("")}</div>
    `;

    const input = app.querySelector("input")!;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        juego.adivinar(input.value);
        renderizar();
      }
    });

    app.querySelectorAll<HTMLButtonElement>("[data-testid^='key-']").forEach(btn => {
      const letra = btn.getAttribute("data-testid")!.replace("key-", "");
      btn.addEventListener("click", () => {
        juego.adivinar(letra);
        renderizar();
      });
    });

    Array.from(app.querySelectorAll<HTMLButtonElement>("button"))
      .find(b => b.textContent === "Ver pista")!
      .addEventListener("click", () => {
        app.querySelector<HTMLElement>("[data-testid='message']")!.textContent = juego.categoria();
      });

    if (terminado) {
      app.querySelector("button")!.addEventListener("click", () => {
        const elegida = lista[Math.floor(Math.random() * lista.length)];
        juego.reiniciar(elegida.palabra, elegida.categoria);
        renderizar();
      });
    }
  }

  renderizar();
}
