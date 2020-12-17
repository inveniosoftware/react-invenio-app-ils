import './commands';

Cypress.Cookies.defaults({
  preserve: 'csrftoken',
});

Cypress.config('viewportWidth', 1280);
Cypress.config('viewportHeight', 800);
