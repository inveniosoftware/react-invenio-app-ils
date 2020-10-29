describe('frontsite footer', () => {
  it('should have a link to the library schedule', () => {
    cy.visit('/');
    cy.contains('Opening hours').click();
    cy.contains('h2', 'Opening hours');
  });

  it('should have a link to the about page', () => {
    cy.visit('/');
    cy.contains('About').click();
    cy.contains('h1', 'About');
  });

  it('should have a link to the contact page', () => {
    cy.visit('/');
    cy.contains('Contact').click();
    cy.contains('h1', 'Contact');
  });
});
