const { Sidebar } = require('semantic-ui-react');

describe('backoffice sidebar', () => {
  Cypress.Cookies.defaults({
    preserve: 'csrftoken',
  });

  it('should be able to click all the links', () => {
    const checkSidebarLinks = (title, backofficeRoute) => {
      cy.contains('.item', title).should('not.have.class', 'active');
      cy.contains('.item', title).click();
      cy.url().should(
        'contain',
        Cypress.config().baseUrl + '/backoffice' + backofficeRoute
      );
      cy.contains('.item', title).should('have.class', 'active');
    };

    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit('/backoffice');

    cy.get('.bo-sidebar').within(() => {
      cy.get('h3.bo-menu-header').within(() => {
        cy.get('div.content').should('contain', 'Hector Nabu');
        cy.get('div.sub.header').should('contain', 'Librarian');
      });

      cy.get('.active').should('contain', 'Overview');

      checkSidebarLinks('Check-in', '/checkin');
      checkSidebarLinks('Check-out', '/checkout');
      checkSidebarLinks('Overview', '');
      checkSidebarLinks('Loans', '/loans');
      checkSidebarLinks('Requests for new literature', '/document-requests');
      checkSidebarLinks('Locations', '/locations');
      checkSidebarLinks('Books / Articles', '/documents');
      checkSidebarLinks('Series / Monographs', '/series');
      checkSidebarLinks('Physical Copies', '/items');
      checkSidebarLinks('Electronic Items', '/eitems');
      checkSidebarLinks('Purchase Orders', '/acquisition/orders');
      checkSidebarLinks('Borrowing Requests', '/ill/borrowing-requests');
      checkSidebarLinks('Providers', '/providers');
      checkSidebarLinks('Patrons', '/patrons');
      checkSidebarLinks('Most Loaned', '/stats');
    });
  });
});
