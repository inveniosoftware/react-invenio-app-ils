Cypress.Commands.add('login', user => {
  cy.server();

  let cookie;

  cy.getCookie('csrftoken')
    .should('exist')
    .then(c => {
      cookie = c;

      cy.request({
        method: 'POST',
        url: Cypress.config().backendBaseUrl + '/api/login',
        headers: {
          Origin: Cypress.config().baseUrl,
          Referer: Cypress.config().baseUrl,
          HTTP_X_CSRFTOKEN: cookie.value,
        },
        body: {
          email: user.email,
          password: user.password,
          _submitButton: 'submit',
        },
      });
    });
});

Cypress.Commands.add('shouldRedirectToLogin', route => {
  cy.visit(route);
  cy.url().should('contain', '/login');
});
