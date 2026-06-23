# language: es
Característica: Ganar

  Escenario: El jugador adivina todas las letras
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Entonces se ve el mensaje "GANASTE"