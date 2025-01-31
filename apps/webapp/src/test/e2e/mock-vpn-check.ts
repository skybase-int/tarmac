/**
 * Intercept VPN check and mock response
 */
import { Route } from '@playwright/test';

export const mockVpnCheck = (route: Route) => {
  setTimeout(() => {
    route.fulfill({
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      contentType: 'application/json',
      body: JSON.stringify({
        is_vpn: false,
        is_restricted_region: false
      })
    });
  }, 500);
};
