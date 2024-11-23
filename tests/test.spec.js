const { test, expect } = require('@playwright/test')

test('Проверка сменяемости текста и стиля кнопки', async ({ page }) => {
  // Открываем страницу
  await page.goto('https://demoqa.com/dynamic-properties', { waitUntil: 'domcontentloaded' })

  // Локатор кнопки
  const button = page.locator('#colorChange')

  // HEX цвета, которые мы хотим проверить
  const initialColorRgb = 'rgb(255, 255, 255)' // Белый (начальный цвет)
  const targetColorRgb = 'rgb(220, 53, 69)' // Красный (цель)

  // Проверяем начальный текст
  await expect(button).toHaveText('Color Change')

  // Проверяем начальный стиль (цвет кнопки)
  await expect(button).toHaveCSS('color', initialColorRgb)

  // Ждём изменения цвета на целевой
  await expect(button).toHaveCSS('color', targetColorRgb, { timeout: 10000 })
})
