# language: es
Característica: Letra repetida

  Escenario: El jugador repite una letra ya intentada
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "A"
    Y el jugador adivina la letra "A"
    Entonces se ven 6 vidas
    Y se ve el mensaje "Letra ya ingresada"