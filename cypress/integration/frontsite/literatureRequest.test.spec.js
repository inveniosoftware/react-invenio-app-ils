describe('literature request form', () => {
  it('should redirect to login if not logged in', () => {
    cy.shouldRedirectToLogin('/request');
  });

  it('should display form when logged in', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/request');
    cy.url().should('eq', Cypress.config().baseUrl + '/request');
    cy.contains('h1', 'Request new literature');
  });

  it('should submit form', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/request');

    cy.get('input#title').type('A new book');
    cy.get('div#medium').click();
    cy.get('span')
      .contains('Paper')
      .click();
    cy.get('div#request_type').click();
    cy.get('span')
      .contains('Loan')
      .click();
    cy.get('button[name=submit]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
  });
});
