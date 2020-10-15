describe('backoffice overview', () => {
  const login = () => {
    cy.visit('/login');
    cy.get('input#email').type('librarian@test.ch');
    cy.get('input#password').type('123456');
    cy.contains('button.primary', 'Sign in').click();
  };

  it('should be linked from/to the frontsite, can logout', () => {
    login();

    cy.contains('Hector Nabu').click();
    cy.contains('Backoffice').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/backoffice');
    cy.contains('.active', 'Overview');

    cy.contains('Go to Frontsite').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.go('back');

    cy.url().should('eq', Cypress.config().baseUrl + '/backoffice');

    cy.contains('Sign out').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});
