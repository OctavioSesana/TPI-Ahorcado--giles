import { render } from "./main";

const app = document.getElementById("app")!;
const palabra = new URLSearchParams(window.location.search).get("word") ?? "";

render(app, palabra);
