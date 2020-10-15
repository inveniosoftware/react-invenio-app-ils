describe('frontsite homepage', () => {
  it('should be able to search from a query', () => {
    cy.visit('/');

    cy.focused()
      .type('lorem')
      .type('{enter}');

    cy.url()
      .should('contain', Cypress.config().baseUrl + '/search')
      .should('contain', 'lorem');

    cy.focused()
      .clear()
      .type('ipsum')
      .type('{enter}');

    cy.url().should('contain', 'ipsum');
  });

  it('should be able to find the recent literature', () => {
    cy.visit('/');

    cy.contains('Recent books').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/search');
  });

  it('should have a link to the library schedule', () => {
    cy.visit('/');

    cy.contains('Opening hours').click();

    cy.contains('h2', 'Opening hours');
  });
});
