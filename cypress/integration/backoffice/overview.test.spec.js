describe('backoffice overview', () => {
  Cypress.Cookies.defaults({
    preserve: 'csrftoken',
  });

  it('should redirect to login if librarian not logged in', () => {
    cy.shouldRedirectToLogin('/backoffice');
  });

  it('should be linked from/to the frontsite, can logout', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit('/backoffice');

    cy.contains('.active', 'Overview');
    cy.contains('Go to Frontsite').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.go('back');
    cy.url().should('eq', Cypress.config().baseUrl + '/backoffice');

    cy.contains('Sign out').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
