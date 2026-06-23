# language: es
Característica: Entrada inválida

  Escenario: El jugador ingresa un caracter que no es letra
    Dado una partida con la palabra "GATO"
    Cuando el jugador adivina la letra "1"
    Entonces se ven 6 vidas
    Y se ve el mensaje "Entrada inválida"