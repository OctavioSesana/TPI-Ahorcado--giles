import { Ahorcado } from "../domain/Ahorcado";

export function render(app: HTMLElement, palabra: string): void {
  const juego = new Ahorcado(palabra);

  app.innerHTML = `
    <div data-testid="word">${juego.palabraEnmascarada()}</div>
    <div data-testid="lives">${juego.vidas()}</div>
  `;
}
