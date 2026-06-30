# language: es
Característica: Teclado en pantalla

  Escenario: El jugador usa el teclado en pantalla para adivinar
    Dado una partida con la palabra "GATO"
    Cuando el jugador hace click en la letra "A"
    Entonces se ve la palabra "_ A _ _"
    Y el botón "A" está deshabilitado

  Escenario: Una letra fallada también se deshabilita
    Dado una partida con la palabra "GATO"
    Cuando el jugador hace click en la letra "E"
    Entonces se ven 5 vidas
    Y el botón "E" está deshabilitado