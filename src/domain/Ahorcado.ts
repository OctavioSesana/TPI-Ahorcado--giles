export class Ahorcado {
  private palabra: string;
  private vidasRestantes : number = 6;
  private letrasAdivinadas: string[] = [];

  constructor(palabra: string) {
    this.palabra = palabra;
  }

  adivinar(letra: string): void {
  const l = letra.toUpperCase();
  if (this.palabra.includes(l)) {
    this.letrasAdivinadas.push(l);
  } else {
    this.vidasRestantes--;
  }
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

  gano(): boolean {
  return this.palabra.split("").every(l => this.letrasAdivinadas.includes(l));
}

perdio(): boolean {
  return this.vidasRestantes === 0;
}

palabraRevelada(): string {
  return this.palabra;
}
}