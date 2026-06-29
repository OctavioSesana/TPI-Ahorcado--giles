export class Ahorcado {
  private palabra: string;
  private vidasRestantes : number = 6;

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  palabraEnmascarada(): string {
    return this.palabra.split("").map(() => "_").join(" ");
  }

  vidas(): number {
    return this.vidasRestantes;
  }
}