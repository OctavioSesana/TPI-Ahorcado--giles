# Lista de Unit Tests por AT

## AT1 — Iniciar partida
- Al crearse con "GATO", `palabraEnmascarada()` devuelve `"_ _ _ _"`
- Al crearse, `vidas()` devuelve `6`

## AT2 — Acertar letra
- Adivinar una letra presente revela todas sus ocurrencias ("ALA" + "A" → "A _ A")
- Adivinar una letra presente no descuenta vidas
- Es case-insensitive ("a" == "A")

## AT3 — Fallar letra
- Adivinar una letra ausente descuenta una vida
- Adivinar una letra ausente no modifica la palabra enmascarada

## AT4 — Ganar
- Al revelar todas las letras, `gano()` devuelve `true`
- Con letras pendientes, `gano()` devuelve `false`

## AT5 — Perder
- Al llegar a 0 vidas, `perdio()` devuelve `true`
- Con vidas restantes, `perdio()` devuelve `false`
- Al perder, `palabraRevelada()` devuelve la palabra completa

## AT6 — Letra repetida
- Repetir una letra ya intentada no descuenta vidas
- Repetir una letra ya intentada informa que ya fue ingresada

## AT7 — Entrada inválida
- Ingresar un número no descuenta vidas e informa entrada inválida
- Ingresar un símbolo no descuenta vidas e informa entrada inválida
- No se puede jugar con la partida terminada