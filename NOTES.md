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

---

# Pipeline de CI/CD

El workflow `.github/workflows/ci.yml` corre en cada push/PR a `main` en 3 jobs:

1. **`build-and-test`**:
   - `npm run build` (build explícito con Vite, falla si el proyecto no
     compila).
   - `npm run test:coverage` (21 unit tests del dominio + reporte de
     cobertura con `@vitest/coverage-v8`; umbrales configurados en
     `vitest.config.ts` — 100% líneas/funciones/statements, 90% branches —
     así que si baja la cobertura, **el job falla**).
   - El resumen de cobertura se publica en el *Job Summary* de la corrida de
     Actions (acción `davelosert/vitest-coverage-report-action`), no hace
     falta bajar ningún artefacto para verlo.
   - `npm run at` (14 acceptance tests en Cucumber/Playwright contra la app
     real levantada con Vite).
2. **`static-analysis`**: análisis estático con **CodeQL**
   (`security-and-quality` query pack). Se agregó un paso extra que lee el
   SARIF resultante y **falla el workflow si hay hallazgos de severidad
   `error` o `warning`** — ese es el quality gate. Los resultados también
   quedan visibles en la pestaña *Security → Code scanning* del repo.
3. **`deploy`**: solo corre en push a `main`, y solo si los dos jobs
   anteriores pasaron. Publica el build (`dist/`) en **GitHub Pages**.

## App en producción

URL pública: `https://octaviosesana.github.io/TPI-Ahorcado--giles/`

(Se actualiza automáticamente con cada push a `main` que pase el pipeline.)