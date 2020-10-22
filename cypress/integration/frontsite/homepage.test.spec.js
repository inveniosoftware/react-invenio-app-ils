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

  it('should be able to find recent books', () => {
    cy.visit('/');

    cy.contains('Recent books').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/search');
    cy.url().should('include', 'sort=created');
    cy.url().should('include', 'order=desc');
  });

  it('should be able to find most loaned books', () => {
    cy.visit('/');

    cy.contains('Most loaned books').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/search');
    cy.url().should('include', 'sort=mostloaned');
    cy.url().should('include', 'order=desc');
  });

  it('should be able to find new ebooks', () => {
    cy.visit('/');

    cy.contains('New e-books').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/search');
    cy.url().should('include', 'sort=created');
    cy.url().should('include', 'order=desc');
    cy.url().should('include', 'doctype%3ABOOK');
    cy.url().should('include', 'medium%3AELECTRONIC_VERSION');
  });

  it('should be able to click on first VIEW ALL', () => {
    cy.visit('/');
    cy.contains('VIEW ALL').click();
    cy.url().should('contain', Cypress.config().baseUrl + '/search');
  });

  it('should be able to go to details of book', () => {
    cy.visit('/');
    cy.get('.fs-book-card')
      .eq(0)
      .click();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature');
  });
});
