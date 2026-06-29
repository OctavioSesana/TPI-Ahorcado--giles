# language: es
Característica: Jugar de nuevo

  Escenario: El jugador juega de nuevo después de ganar
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "G"
    Y el jugador adivina la letra "A"
    Y el jugador adivina la letra "T"
    Y el jugador adivina la letra "O"
    Entonces se ve el mensaje "GANASTE"
    Y se ve un botón "Jugar de nuevo"
    Cuando el jugador presiona "Jugar de nuevo"
    Entonces se ven 6 vidas
    Y no se ve el mensaje "GANASTE"

  Escenario: El jugador juega de nuevo después de perder
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "E"
    Y el jugador adivina la letra "I"
    Y el jugador adivina la letra "U"
    Y el jugador adivina la letra "B"
    Y el jugador adivina la letra "C"
    Y el jugador adivina la letra "D"
    Entonces se ve el mensaje "PERDISTE"
    Y se ve un botón "Jugar de nuevo"
    Cuando el jugador presiona "Jugar de nuevo"
    Entonces se ven 6 vidas
    Y no se ve el mensaje "PERDISTE"