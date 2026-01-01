import { expect, test } from '@playwright/test'

test('homepage loads and has main landmark', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('main#content')

  await page.waitForFunction(() => {
    const el = document.querySelector('main#content')
    if (!el) return false
    const style = getComputedStyle(el)
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      style.opacity !== '0'
    )
  })

  await expect(page.locator('main#content')).toBeVisible({ timeout: 15_000 })
})

test('skip link focuses main content', async ({ page }) => {
  await page.goto('/')
  const skipLink = page.getByRole('link', { name: /skip to content/i })

  await skipLink.focus()
  await expect(skipLink).toBeFocused({ timeout: 10_000 })

  await skipLink.click()
  await expect(page.locator('main#content')).toBeFocused({ timeout: 10_000 })
})

test('mobile nav opens and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')

  const openButton = page.getByRole('button', { name: /open navigation menu/i })
  await openButton.click()

  const navMenu = page.locator('#nav-menu')
  await expect(navMenu).toHaveClass(/nav-responsive/)

  await page.keyboard.press('Escape')
  await expect(navMenu).not.toHaveClass(/nav-responsive/)
})

test('contact shows validation errors on empty submit', async ({ page }) => {
  await page.goto('/#contact')

  const send = page.getByRole('link', { name: /send message/i })
  await send.click()

  await expect(page.getByText(/please enter your full name/i)).toBeVisible({
    timeout: 10_000,
  })
  await expect(
    page.getByText(/please enter a valid email address/i)
  ).toBeVisible({ timeout: 10_000 })
  await expect(
    page.getByText(/message should be at least 10 characters/i)
  ).toBeVisible({ timeout: 10_000 })
})
