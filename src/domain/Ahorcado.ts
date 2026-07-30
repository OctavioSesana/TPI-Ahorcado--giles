export class Ahorcado {
  private palabra: string;
  private vidasRestantes : number = 6;
  private letrasAdivinadas: string[] = [];
  private letrasIntentadas: string[] = [];
  private mensajeActual: string = "";

  constructor(
  palabraOLista: string | string[], 
  selector?: (n: number) => number,
  private categoriaActual: string = ""
) {
  if (Array.isArray(palabraOLista)) {
    const idx = selector ? selector(palabraOLista.length) : Math.floor(Math.random() * palabraOLista.length);
    this.palabra = palabraOLista[idx];
  } else {
    this.palabra = palabraOLista;
  }
}

 adivinar(letra: string): void {
  const l = letra.toUpperCase();
  if (!/^[A-ZÀ-Ú]$/.test(l)) {
    this.mensajeActual = "Entrada inválida";
    return;
  }
  if (this.letrasIntentadas.includes(l)) {
    this.mensajeActual = "Letra ya ingresada";
    return;
  }
  this.letrasIntentadas.push(l);
  if (this.palabra.includes(l)) {
    this.letrasAdivinadas.push(l);
  } else {
    this.vidasRestantes--;
  }
  this.mensajeActual = "";
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

mensaje(): string {
  return this.mensajeActual;
}

reiniciar(nuevaPalabra: string, categoria: string = ""): void {
  this.palabra = nuevaPalabra;
  this.categoriaActual = categoria;
  this.vidasRestantes = 6;
  this.letrasAdivinadas = [];
  this.letrasIntentadas = [];
  this.mensajeActual = "";
}

errores(): number {
  return 6 - this.vidasRestantes;
}

letraUsada(letra: string): boolean {
  return this.letrasIntentadas.includes(letra.toUpperCase());
}

categoria(): string {
  return this.categoriaActual;
}

}