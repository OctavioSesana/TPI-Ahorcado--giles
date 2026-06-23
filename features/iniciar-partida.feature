# language: es
Característica: Iniciar partida

  Escenario: El jugador ve la palabra enmascarada y las vidas al iniciar
    Dado una partida con la palabra "GATO"
    Entonces se ve la palabra "_ _ _ _"
    Y se ven 6 vidas