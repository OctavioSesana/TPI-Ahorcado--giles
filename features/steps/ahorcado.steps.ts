import { expect } from "@playwright/test";
import { createBdd } from "playwright-bdd";

const { Given, Then, When } = createBdd();

Given("una partida con la palabra {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?word=${palabra}`);
});

Then("se ve la palabra {string}", async ({ page }, esperada: string) => {
  await expect(page.getByTestId("word")).toHaveText(esperada);
});

Then("se ven {int} vidas", async ({ page }, vidas: number) => {
  await expect(page.getByTestId("lives")).toHaveText(String(vidas));
});

When("el jugador adivina la letra {string}", async ({ page }, letra: string) => {
  const input = page.getByRole("textbox");
  await input.fill(letra);
  await input.press("Enter");
});

Then("se ve el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("message")).toHaveText(mensaje);
});

Given("una lista de palabras que contiene solo {string}", async ({ page }, palabra: string) => {
  await page.goto(`/?lista=${palabra}`);
});

When("el jugador presiona {string}", async ({ page }, boton: string) => {
  await page.getByRole("button", { name: boton }).click();
});

Then("se ve un botón {string}", async ({ page }, nombre: string) => {
  await expect(page.getByRole("button", { name: nombre })).toBeVisible();
});

Then("no se ve el mensaje {string}", async ({ page }, mensaje: string) => {
  await expect(page.getByTestId("message")).not.toHaveText(mensaje);
});

Then("se ven {int} partes del ahorcado", async ({ page }, partes: number) => {
  await expect(page.getByTestId("hangman-parts")).toHaveAttribute("data-parts", String(partes));
});

Then("se ve {int} parte del ahorcado", async ({ page }, partes: number) => {
  await expect(page.getByTestId("hangman-parts")).toHaveAttribute("data-parts", String(partes));
});

When("el jugador hace click en la letra {string}", async ({ page }, letra: string) => {
  await page.getByTestId(`key-${letra}`).click();
});

Then("el botón {string} está deshabilitado", async ({ page }, letra: string) => {
  await expect(page.getByTestId(`key-${letra}`)).toBeDisabled();
});

Given("una partida con la palabra {string} de categoría {string}", async ({ page }, palabra: string, categoria: string) => {
  await page.goto(`/?word=${palabra}&categoria=${categoria}`);
});