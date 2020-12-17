describe('backoffice loan search page', () => {
  const loansSearchRoute = '/backoffice/loans';
  const loansSearchUrl = Cypress.config().baseUrl + loansSearchRoute;

  it('should redirect to login if librarian not logged in', () => {
    cy.shouldRedirectToLogin(loansSearchRoute);
  });

  it('should display loans search page', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit(loansSearchRoute);
    cy.get('h2').should('contain', 'Loans and requests');
  });

  it('should go to details page when click on a loan', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit(loansSearchRoute);

    cy.get('div.pid-field')
      .first()
      .then($pid => {
        const pid = $pid.text().substring(1);

        cy.get('.bo-document-search a.header')
          .first()
          .click();

        cy.url().should('eq', loansSearchUrl + '/' + pid);
      });
  });

  it('should have links in each item to new tabs', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit(`${loansSearchRoute}?f=state%3AITEM_ON_LOAN`);

    cy.get('.bo-document-search div.item')
      .first()
      .within(() => {
        // check link to patron
        cy.get('label')
          .contains('Patron')
          .siblings('a')
          .should('have.attr', 'target', '_blank');
        cy.get('label')
          .contains('Patron')
          .siblings('a')
          .invoke('attr', 'href')
          .should('contain', '/backoffice/patrons/');

        // check link to item
        cy.get('i.barcode.icon')
          .parent()
          .should('have.attr', 'target', '_blank');
        cy.get('i.barcode.icon')
          .parent()
          .invoke('attr', 'href')
          .should('contain', '/backoffice/items/');

        // check link to document
        cy.get('a')
          .contains('Document')
          .should('have.attr', 'target', '_blank');
        cy.get('a')
          .contains('Document')
          .invoke('attr', 'href')
          .should('contain', '/backoffice/documents/');
      });
  });

  it('should handle empty results', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit(loansSearchRoute);

    cy.handleEmptyResults('div.ils-searchbar input', {
      text: 'Add document',
      route: '/backoffice/documents/create',
    });
  });

  it('should display warnings for overdue loans', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit(loansSearchRoute + '?f=returns.end_date%3AOverdue');

    cy.get('.bo-document-search div.item')
      .first()
      .within(() => {
        cy.get('div.red.label').should('contain', 'Overdue');
        cy.get('button')
          .should('contain', 'Send reminder')
          .click();
      });
    cy.get('.modal.visible');
    cy.get('.button')
      .should('have.class', 'red')
      .and('contain', 'Cancel');
    cy.get('.button')
      .should('have.class', 'green')
      .and('contain', 'Send');
  });
});
