# language: es
Característica: Perder

  Escenario: El jugador agota todas las vidas
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "U"
    Y el jugador adivina la letra "B"
    Y el jugador adivina la letra "C"
    Y el jugador adivina la letra "D"
    Entonces se ve el mensaje "PERDISTE"
    Y se ve la palabra "GATO"