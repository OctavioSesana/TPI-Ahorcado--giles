# language: es
Característica: Dibujo progresivo del ahorcado

  Escenario: El dibujo muestra las partes según los errores
    Dado una partida con la palabra "GATO"
    Entonces se ven 0 partes del ahorcado
    Cuando el jugador adivina la letra "E"
    Entonces se ve 1 parte del ahorcado
    Cuando el jugador adivina la letra "I"
    Entonces se ven 2 partes del ahorcado