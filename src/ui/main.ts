import { Ahorcado } from "../domain/Ahorcado";

function hangmanSVG(errores: number): string {
  const partes = [
    `<circle cx="60" cy="28" r="8" stroke="#f5f5f5" fill="none" stroke-width="3"/>`,
    `<line x1="60" y1="36" x2="60" y2="65" stroke="#f5f5f5" stroke-width="3"/>`,
    `<line x1="60" y1="45" x2="42" y2="58" stroke="#f5f5f5" stroke-width="3"/>`,
    `<line x1="60" y1="45" x2="78" y2="58" stroke="#f5f5f5" stroke-width="3"/>`,
    `<line x1="60" y1="65" x2="42" y2="85" stroke="#f5f5f5" stroke-width="3"/>`,
    `<line x1="60" y1="65" x2="78" y2="85" stroke="#f5f5f5" stroke-width="3"/>`,
  ];
  return `<svg viewBox="0 0 100 110" width="220" height="242" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="105" x2="90" y2="105" stroke="#f5f5f5" stroke-width="3"/>
    <line x1="10" y1="5" x2="10" y2="105" stroke="#f5f5f5" stroke-width="3"/>
    <line x1="10" y1="5" x2="60" y2="5" stroke="#f5f5f5" stroke-width="3"/>
    <line x1="60" y1="5" x2="60" y2="20" stroke="#f5f5f5" stroke-width="3"/>
    ${partes.slice(0, errores).join("")}
  </svg>`;
}

const ESTILOS = `
  <style>
    body {
      margin: 0;
      background: #1a1a2e;
      color: #f0f0f5;
      font-family: "Segoe UI", Roboto, Arial, sans-serif;
    }
    .ahorcado-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1.25rem;
      padding: 2rem 1rem;
      text-align: center;
    }
    .ahorcado-hangman {
      display: flex;
      justify-content: center;
    }
    .ahorcado-word {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: 0.4rem;
      font-family: "Courier New", monospace;
      color: #ffffff;
    }
    .ahorcado-lives {
      font-size: 1.1rem;
      color: #ff6b6b;
      font-weight: 600;
    }
    .ahorcado-message {
      min-height: 1.6rem;
      font-size: 1.3rem;
      font-weight: 700;
    }
    .ahorcado-message.win {
      color: #2ecc71;
    }
    .ahorcado-message.lose {
      color: #e74c3c;
    }
    .ahorcado-message.hint {
      color: #f1c40f;
    }
    .ahorcado-input {
      padding: 0.5rem 0.75rem;
      font-size: 1.1rem;
      text-align: center;
      border-radius: 8px;
      border: 2px solid #4e4e8f;
      background: #22223a;
      color: #f0f0f5;
      outline: none;
      width: 8rem;
    }
    .ahorcado-input:focus {
      border-color: #7f7fd5;
    }
    .ahorcado-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .btn-primary, .btn-secondary, .btn-start {
      border: none;
      border-radius: 8px;
      padding: 0.6rem 1.4rem;
      font-size: 1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.1s ease, opacity 0.1s ease;
    }
    .btn-primary, .btn-start {
      background: #2ecc71;
      color: #0d2b1c;
    }
    .btn-secondary {
      background: #f1c40f;
      color: #3a2e00;
    }
    .btn-primary:hover, .btn-secondary:hover, .btn-start:hover {
      transform: translateY(-2px);
      opacity: 0.9;
    }
    .ahorcado-keyboard {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.4rem;
      max-width: 26rem;
    }
    .key-btn {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 6px;
      border: none;
      background: #4e4e8f;
      color: #f0f0f5;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.1s ease, transform 0.1s ease;
    }
    .key-btn:hover:not(:disabled) {
      background: #7f7fd5;
      transform: translateY(-1px);
    }
    .key-btn:disabled {
      background: #33334d;
      color: #6c6c85;
      cursor: not-allowed;
    }
  </style>
`;

export function render(app: HTMLElement, juego: Ahorcado, lista: string[], arranco: boolean): void {
  if (!arranco) {
    app.innerHTML = `
      ${ESTILOS}
      <div class="ahorcado-container">
        <button class="btn-start">Comenzar juego</button>
      </div>
    `;
    app.querySelector("button")!.addEventListener("click", () => render(app, juego, lista, true));
    return;
  }

  let mostrandoPista = false;

  function renderizar(): void {
    const gano = juego.gano();
    const perdio = juego.perdio();
    const terminado = gano || perdio;
    const mensajeTexto = gano ? "GANASTE" : perdio ? "PERDISTE" : mostrandoPista ? juego.categoria() : juego.mensaje();
    const mensajeClase = gano ? "ahorcado-message win" : perdio ? "ahorcado-message lose" : mostrandoPista ? "ahorcado-message hint" : "ahorcado-message";

    app.innerHTML = `
      ${ESTILOS}
      <div class="ahorcado-container">
        <div class="ahorcado-hangman" data-testid="hangman-parts" data-parts="${juego.errores()}">${hangmanSVG(juego.errores())}</div>
        <div class="ahorcado-word" data-testid="word">${juego.perdio() ? juego.palabraRevelada() : juego.palabraEnmascarada()}</div>
        <div class="ahorcado-lives" data-testid="lives">${juego.vidas()}</div>
        <div class="${mensajeClase}" data-testid="message">${mensajeTexto}</div>
        <input class="ahorcado-input" type="text" />
        <div class="ahorcado-actions">
          ${terminado ? `<button class="btn-primary">Jugar de nuevo</button>` : ""}
          <button class="btn-secondary">Ver pista</button>
        </div>
        <div class="ahorcado-keyboard">${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l =>
          `<button class="key-btn" data-testid="key-${l}"${juego.letraUsada(l) ? " disabled" : ""}>${l}</button>`
        ).join("")}</div>
      </div>
    `;

    const input = app.querySelector("input")!;
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        mostrandoPista = false;
        juego.adivinar(input.value);
        renderizar();
      }
    });

    app.querySelectorAll<HTMLButtonElement>("[data-testid^='key-']").forEach(btn => {
      const letra = btn.getAttribute("data-testid")!.replace("key-", "");
      btn.addEventListener("click", () => {
        mostrandoPista = false;
        juego.adivinar(letra);
        renderizar();
      });
    });

    Array.from(app.querySelectorAll<HTMLButtonElement>("button"))
      .find(b => b.textContent === "Ver pista")!
      .addEventListener("click", () => {
        mostrandoPista = true;
        renderizar();
      });

    if (terminado) {
      app.querySelector("button")!.addEventListener("click", () => {
        const nuevaPalabra = lista[Math.floor(Math.random() * lista.length)];
        mostrandoPista = false;
        juego.reiniciar(nuevaPalabra);
        renderizar();
      });
    }
  }

  renderizar();
}
