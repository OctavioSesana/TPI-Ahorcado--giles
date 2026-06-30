# language: es
Característica: Pista y categoría

  Escenario: El jugador pide una pista y ve la categoría
    Dado una partida con la palabra "GATO" de categoría "Animal"
    Cuando el jugador presiona "Ver pista"
    Entonces se ve el mensaje "Animal"