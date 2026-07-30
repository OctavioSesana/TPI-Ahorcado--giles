import { Ahorcado } from "../domain/Ahorcado";

function hangmanSVG(errores: number): string {
  const partes = [
    `<circle cx="60" cy="28" r="8" stroke="#e94560" fill="none" stroke-width="3"/>`,
    `<line x1="60" y1="36" x2="60" y2="65" stroke="#e94560" stroke-width="3"/>`,
    `<line x1="60" y1="45" x2="42" y2="58" stroke="#e94560" stroke-width="3"/>`,
    `<line x1="60" y1="45" x2="78" y2="58" stroke="#e94560" stroke-width="3"/>`,
    `<line x1="60" y1="65" x2="42" y2="85" stroke="#e94560" stroke-width="3"/>`,
    `<line x1="60" y1="65" x2="78" y2="85" stroke="#e94560" stroke-width="3"/>`,
  ];
  return `<svg viewBox="0 0 100 110" width="180" height="200" xmlns="http://www.w3.org/2000/svg">
    <line x1="10" y1="105" x2="90" y2="105" stroke="#e9e9f2" stroke-width="3"/>
    <line x1="10" y1="5" x2="10" y2="105" stroke="#e9e9f2" stroke-width="3"/>
    <line x1="10" y1="5" x2="60" y2="5" stroke="#e9e9f2" stroke-width="3"/>
    <line x1="60" y1="5" x2="60" y2="20" stroke="#e9e9f2" stroke-width="3"/>
    ${partes.slice(0, errores).join("")}
  </svg>`;
}

function inyectarEstilos(): void {
  if (document.getElementById("ahorcado-estilos")) return;

  const style = document.createElement("style");
  style.id = "ahorcado-estilos";
  style.textContent = `
    html, body { margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      background: #1a1a2e;
      color: #e9e9f2;
      font-family: 'Segoe UI', system-ui, sans-serif;
    }
    #app {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
      box-sizing: border-box;
    }
    .ahorcado-card {
      background: #16213e;
      border-radius: 16px;
      padding: 2rem 2.5rem;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      max-width: 480px;
    }
    .ahorcado-hangman { display: flex; justify-content: center; }
    .ahorcado-palabra {
      font-family: 'Courier New', monospace;
      font-size: 2.25rem;
      font-weight: 700;
      letter-spacing: 0.35em;
      text-align: center;
      word-break: break-all;
    }
    .ahorcado-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.1rem;
    }
    .ahorcado-vidas {
      font-weight: 700;
      font-size: 1.3rem;
      color: #e94560;
    }
    .ahorcado-mensaje {
      min-height: 1.6rem;
      font-size: 1.3rem;
      font-weight: 700;
      text-align: center;
    }
    .ahorcado-mensaje--ganaste { color: #2ecc71; }
    .ahorcado-mensaje--perdiste { color: #e94560; }
    .ahorcado-mensaje--pista { color: #f1c40f; }
    .ahorcado-input {
      padding: 0.6rem 1rem;
      border-radius: 8px;
      border: 2px solid #0f3460;
      background: #0f3460;
      color: #fff;
      font-size: 1.2rem;
      text-align: center;
      width: 140px;
    }
    .ahorcado-input:focus { outline: none; border-color: #e94560; }
    .ahorcado-botones {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .ahorcado-btn {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 1rem;
      cursor: pointer;
      transition: filter 0.15s ease, transform 0.15s ease;
    }
    .ahorcado-btn:hover { filter: brightness(1.15); transform: translateY(-1px); }
    .ahorcado-btn-primary { background: #2ecc71; color: #0f3460; }
    .ahorcado-btn-secondary { background: #e94560; color: #fff; }
    .ahorcado-teclado {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 0.4rem;
    }
    .ahorcado-tecla {
      width: 2.2rem;
      height: 2.2rem;
      border-radius: 6px;
      border: none;
      background: #0f3460;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .ahorcado-tecla:hover:not(:disabled) { background: #e94560; }
    .ahorcado-tecla:disabled {
      background: #25253d;
      color: #5a5a75;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
}

export function render(app: HTMLElement, juego: Ahorcado, lista: string[], arranco: boolean): void {
  inyectarEstilos();

  if (!arranco) {
    app.innerHTML = `
      <div class="ahorcado-card">
        <button class="ahorcado-btn ahorcado-btn-primary">Comenzar juego</button>
      </div>
    `;
    app.querySelector("button")!.addEventListener("click", () => render(app, juego, lista, true));
    return;
  }

  let mostrandoPista = false;

  function renderizar(): void {
    const terminado = juego.gano() || juego.perdio();

    const mensajeTexto = juego.gano()
      ? "GANASTE"
      : juego.perdio()
        ? "PERDISTE"
        : mostrandoPista
          ? juego.categoria()
          : juego.mensaje();

    const mensajeClase = juego.gano()
      ? "ahorcado-mensaje--ganaste"
      : juego.perdio()
        ? "ahorcado-mensaje--perdiste"
        : mostrandoPista
          ? "ahorcado-mensaje--pista"
          : "";

    app.innerHTML = `
      <div class="ahorcado-card">
        <div class="ahorcado-hangman" data-testid="hangman-parts" data-parts="${juego.errores()}">${hangmanSVG(juego.errores())}</div>
        <div data-testid="word" class="ahorcado-palabra">${juego.perdio() ? juego.palabraRevelada() : juego.palabraEnmascarada()}</div>
        <div class="ahorcado-info">
          <span>Vidas:</span>
          <div data-testid="lives" class="ahorcado-vidas">${juego.vidas()}</div>
        </div>
        <div data-testid="message" class="ahorcado-mensaje ${mensajeClase}">${mensajeTexto}</div>
        <input type="text" class="ahorcado-input" maxlength="1" placeholder="Letra" />
        <div class="ahorcado-botones">
          ${terminado ? `<button class="ahorcado-btn ahorcado-btn-primary">Jugar de nuevo</button>` : ""}
          <button class="ahorcado-btn ahorcado-btn-secondary">Ver pista</button>
        </div>
        <div class="ahorcado-teclado">${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l =>
          `<button class="ahorcado-tecla" data-testid="key-${l}"${juego.letraUsada(l) ? " disabled" : ""}>${l}</button>`
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
      Array.from(app.querySelectorAll<HTMLButtonElement>("button"))
        .find(b => b.textContent === "Jugar de nuevo")!
        .addEventListener("click", () => {
          mostrandoPista = false;
          const nuevaPalabra = lista[Math.floor(Math.random() * lista.length)];
          juego.reiniciar(nuevaPalabra);
          renderizar();
        });
    }
  }

  renderizar();
}
