describe('navbar links', () => {
  it('should be able to go to login page', () => {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.url().should('include', '/login');
  });

  it('should be able to go to profile when patron is logged in', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });

    cy.visit('/');
    cy.contains('Yannic Vilma').click();
    cy.contains('Your loans').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
    cy.contains('h2', 'Your activity');
  });

  it('should be able to go to login page', () => {
    cy.visit('/');
    cy.contains('Sign in').click();
    cy.url().should('include', '/login');
  });

  it('should be able to go to backoffice when librarian is logged in', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });

    cy.visit('/');
    cy.contains('Hector Nabu').click();
    cy.contains('Your loans').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
    cy.contains('h2', 'Your activity');
  });
});
