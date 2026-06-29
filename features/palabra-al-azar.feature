# language: es
Característica: Palabra al azar

  Escenario: El jugador comienza una partida con una palabra al azar
    Dado una lista de palabras que contiene solo "GATO"
    Cuando el jugador presiona "Comenzar juego"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas