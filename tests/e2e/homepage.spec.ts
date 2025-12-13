import { test, expect } from '../fixtures'

test.describe('Homepage', () => {
  test('should redirect to dashboard', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/dashboard/)
  })
})
