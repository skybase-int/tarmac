import { test, expect } from '@playwright/test';

/**
 * Chatbot E2E tests
 *
 * These tests use Playwright's base test (no custom fixtures) since they don't
 * require blockchain interaction. The chatbot API is mocked to avoid 401 errors.
 *
 * Run with: pnpm e2e chatbot.spec.ts
 */

const mockChatResponse = {
  response: 'Hello! I am SkyWing, your AI assistant. How can I help you today?',
  actions: []
};

const mockChatResponseWithIntent = {
  response: 'I can help you with savings! Here are some options:',
  actions: [
    {
      title: 'Access Savings',
      url: '/?widget=savings',
      priority: 1
    }
  ]
};

test.describe('Chatbot', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the chatbot API endpoint for all tests
    await page.route('**/chat', async route => {
      const request = route.request();
      if (request.method() === 'POST') {
        // Check request body to determine which response to return
        const body = request.postDataJSON();
        const lastMessage = body?.messages?.at(-1)?.content || '';

        const response = lastMessage.toLowerCase().includes('save')
          ? mockChatResponseWithIntent
          : mockChatResponse;

        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(response)
        });
      } else {
        await route.continue();
      }
    });

    // Mock VPN check to avoid network issues
    await page.route('**/ip/status', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ isRestrictedRegion: false, isConnectedToVpn: false })
      });
    });

    // Mock chatbot terms check - return accepted so modal doesn't show
    await page.route('**/chatbot/terms/check', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ accepted: true })
      });
    });
  });

  test('can open chat and send a message', async ({ page }) => {
    // Navigate to the app with chat open
    await page.goto('/?chat=true');

    // Wait for the chat to be visible
    await page.waitForSelector('textarea[placeholder]');

    // Verify the initial bot message is present
    await expect(page.getByText(/Hi, I'm .*, your AI-powered assistant/)).toBeVisible();

    // Type a message in the chat input
    const chatInput = page.locator('textarea');
    await chatInput.fill('Hello');

    // Send the message by pressing Enter
    await chatInput.press('Enter');

    // Wait for the response
    await page.waitForSelector('text=Hello! I am SkyWing');

    // Verify the response is displayed
    await expect(page.getByText('Hello! I am SkyWing, your AI assistant.')).toBeVisible();
  });

  test('displays action intents and navigates to widget on click', async ({ page }) => {
    await page.goto('/?chat=true');
    await page.waitForSelector('textarea[placeholder]');

    // Send a message that triggers intent response
    const chatInput = page.locator('textarea');
    await chatInput.fill('How do I save?');
    await chatInput.press('Enter');

    // Wait for the response with intent
    await page.waitForSelector('text=I can help you with savings');

    // Verify the action button is displayed
    const actionButton = page.getByText('Access Savings');
    await expect(actionButton).toBeVisible();

    // Click the action button
    await actionButton.click();

    // Verify navigation to savings widget
    await expect(page).toHaveURL(/widget=savings/);
  });

  test('shows terms modal when chat returns 401 unauthorized', async ({ page }) => {
    // Override the chat mock to return 401 for this test
    await page.route('**/chat', async route => {
      if (route.request().method() === 'POST') {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Unauthorized' })
        });
      } else {
        await route.continue();
      }
    });

    await page.goto('/?chat=true');
    await page.waitForSelector('textarea[placeholder]');

    // Send a message that will trigger 401
    const chatInput = page.locator('textarea');
    await chatInput.fill('Hello');
    await chatInput.press('Enter');

    // Verify the error message appears in chat
    await expect(page.getByText('Please accept the chatbot terms of service to continue.')).toBeVisible({
      timeout: 10000
    });

    // Verify the "Accept Terms" button is visible and click it
    const acceptTermsButton = page.getByRole('button', { name: /accept terms/i });
    await expect(acceptTermsButton).toBeVisible();
    await acceptTermsButton.click();

    // Verify the terms modal opens with expected content
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText('Chatbot Terms of Service')).toBeVisible();
    await expect(dialog.getByText(/Terms version:/)).toBeVisible();
    await expect(dialog.getByText(/\d{4}-\d{2}-\d{2}/)).toBeVisible(); // Date format like 2025-07-15
    await expect(dialog.getByRole('button', { name: /I decline/i })).toBeVisible();
    await expect(dialog.getByRole('button', { name: /Scroll down/i })).toBeVisible();
  });
});
