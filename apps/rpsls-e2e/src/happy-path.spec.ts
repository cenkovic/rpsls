import { test, expect } from '@playwright/test';

test('select paper and see win/lose/tie outcome', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check that the "paper" button exists
  const paperButton = page.locator('.button-container', { hasText: 'paper' });
  await expect(paperButton).toBeVisible();

  // Click the "paper" button
  await paperButton.click();

  // Wait for either "win", "lose", or "tie" to appear
  const outcome = page.locator('#outcome');
  await expect(outcome).toContainText(/win|lose|tie/);
});

test('play twice and check scoreboard', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Verify the scoreboard is not present initially
  const scoreboardContainer = page.locator('#scoreboard-container');
  await expect(scoreboardContainer).toBeHidden();

  // Click "paper" button
  const paperButton = page.locator('.button-container', { hasText: 'paper' });
  await expect(paperButton).toBeVisible();
  await paperButton.click();

  // Wait for the outcome ("win", "lose", or "tie") to appear
  const outcome = page.locator('#outcome');
  await expect(outcome).toContainText(/win|lose|tie/);

  // Ensure "New Game" button becomes visible
  const newGameButton = page.locator('button.new-game-button');
  await expect(newGameButton).toBeVisible();

  // Click "New Game" button
  await newGameButton.click();

  // Select "rock" button
  const rockButton = page.locator('.button-container', { hasText: 'rock' });
  await expect(rockButton).toBeVisible();
  await rockButton.click();

  // Wait for the outcome again after selecting "rock"
  await expect(outcome).toContainText(/win|lose|tie/);

  // Verify that two rows are present on the scoreboard
  const scoreboardRows = page.locator('.scoreboard-table > tbody > tr');
  await expect(scoreboardRows).toHaveCount(2);
});

test('play one game and reset scoreboard', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Click the "lizard" button
  const lizardButton = page.locator('.button-container', { hasText: 'lizard' });
  await expect(lizardButton).toBeVisible();
  await lizardButton.click();

  // Wait for the outcome ("win", "lose", or "tie") to appear
  const outcome = page.locator('#outcome');
  await expect(outcome).toContainText(/win|lose|tie/);

  // Verify that the scoreboard is visible with one row
  const scoreboardRow = page.locator('#scoreboard-container tbody tr');
  await expect(scoreboardRow).toHaveCount(1);

  // Verify the "Reset Scoreboard" button is visible
  const resetButton = page.locator('button.reset-scoreboard-btn');
  await expect(resetButton).toBeVisible();

  // Click the "Reset Scoreboard" button
  await resetButton.click();

  // Verify the scoreboard is no longer visible
  const scoreboardContainer = page.locator('#scoreboard-container');
  await expect(scoreboardContainer).toBeHidden();
});
