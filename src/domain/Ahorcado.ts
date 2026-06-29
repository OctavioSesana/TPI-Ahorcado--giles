export class Ahorcado {
  private palabra: string;
  private vidasRestantes : number = 6;
  private letrasAdivinadas: string[] = [];

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
  this.letrasAdivinadas.push(letra.toUpperCase());
}

palabraEnmascarada(): string {
  return this.palabra
    .split("")
    .map(l => this.letrasAdivinadas.includes(l) ? l : "_")
    .join(" ");
}

  vidas(): number {
    return this.vidasRestantes;
  }
}