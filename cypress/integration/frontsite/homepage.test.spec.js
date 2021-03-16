describe('frontsite homepage', () => {
  const searchRoute = Cypress.config().baseUrl + '/search';
  const mostRecentBooksAssertion = () => {
    cy.url()
      .should('contain', searchRoute)
      .and('include', 'sort=created')
      .and('include', 'order=desc');
  };
  const mostLoanedBooksAssertion = () => {
    cy.url()
      .should('contain', searchRoute)
      .and('include', 'sort=mostloaned')
      .and('include', 'order=desc');
  };
  const mostRecentEBooksAssertion = () => {
    cy.url()
      .should('contain', searchRoute)
      .and('include', 'sort=created')
      .and('include', 'order=desc')
      .and('include', 'doctype%3ABOOK')
      .and('include', 'medium%3AE-BOOK');
  };

  it('should be able to search from a query', () => {
    cy.visit('/');

    cy.focused()
      .type('lorem')
      .type('{enter}');

    cy.url()
      .should('contain', searchRoute)
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
    mostRecentBooksAssertion();
  });

  it('should be able to find most loaned books', () => {
    cy.visit('/');

    cy.contains('Most loaned books').click();
    mostLoanedBooksAssertion();
  });

  it('should be able to find new ebooks', () => {
    cy.visit('/');

    cy.contains('New e-books').click();
    mostRecentEBooksAssertion();
  });

  it('should be able to click on VIEW ALL buttons', () => {
    const clickViewAllLink = title => {
      cy.get('.ui.header.section-header.highlight')
        .contains(title)
        .siblings('.sub.header')
        .within(() => {
          cy.get('a').click();
        });
    };
    cy.visit('/');

    clickViewAllLink('Most Recent Books');
    mostRecentBooksAssertion();
    cy.go('back');

    clickViewAllLink('Most Loaned Books');
    mostLoanedBooksAssertion();
    cy.go('back');

    clickViewAllLink('Most Recent E-Books');
    mostRecentEBooksAssertion();
  });

  it('should be able to go to details of a book', () => {
    cy.visit('/');

    cy.get('.fs-book-card')
      .first()
      .click();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature');
  });
});
