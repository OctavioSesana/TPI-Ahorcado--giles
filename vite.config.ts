import { defineConfig } from "vite";

// GitHub Pages sirve el sitio en https://<usuario>.github.io/<repo>/,
// no en la raíz del dominio. Sin este "base", en producción los assets
// (JS, CSS) se pedirían con rutas absolutas ("/assets/...") y el deploy
// se vería roto (pantalla en blanco).
export default defineConfig({
  base: "/TPI-Ahorcado--giles/",
});
