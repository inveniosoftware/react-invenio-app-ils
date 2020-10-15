//https://127.0.0.1:3000/search?f=doctype%3ABOOK

describe('frontsite literature details', () => {
  const goToSearchDocument = () => {
    // Books + available for loan
    cy.visit(
      '/search?f=doctype%3ABOOK&f=availability%3Aavailable%20for%20loan'
    );
  };

  it('can view document details and request loan if available', () => {
    cy.server();
    cy.route('GET', '/api/locations/*').as('location');
    cy.route('GET', '/api/me/loans?document_pid=*').as('loan');
    cy.route('GET', '/api/document-requests/*').as('requests');

    goToSearchDocument();

    cy.get('.fs-book-card')
      .first()
      .click();

    cy.url().should('contain', Cypress.config().baseUrl + '/literature/');

    cy.wait('@loan').should(xhr => expect(xhr.status).to.eq(401));

    cy.contains('Sign in to loan').click();

    cy.get('input#email').type('patron1@test.ch');
    cy.get('input#password').type('123456');
    cy.contains('button.primary', 'Sign in').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/literature/');

    cy.contains('Yannic Vilma').click();
    cy.contains('Your loans').click();
    cy.wait('@requests');
    cy.get(':nth-child(2).statistic > .value').then($stat1 => {
      let expectedNextCount = parseInt($stat1.text());

      cy.go('back');

      cy.wait('@loan').then(xhr => {
        const {
          has_active_loan: hasActiveLoan,
          is_requested: isRequested,
        } = xhr.response.body;
        expect(hasActiveLoan).to.be.false;
        if (isRequested) {
          cy.contains('Have it delivered to my office').click();

          cy.get('input[name=selectedDate]').click();

          cy.wait('@location').wait(1000); // Cannot avoid this delay
          cy.get('td:not(.disabled) > span.suicr-content-item')
            .first()
            .type('{enter}');

          cy.contains('button.primary', 'Request').click();
          cy.contains('div.positive.message', 'Request created');

          cy.wait(1000); // ES delay

          cy.reload();

          expectedNextCount++;
        }
      });

      cy.contains('You have requested a loan for this literature.'); // See https://github.com/inveniosoftware/react-invenio-app-ils/issues/241

      cy.go('forward');
      cy.wait('@requests');
      cy.get(':nth-child(2).statistic > .value').then($stat2 => {
        const nextCount = parseInt($stat2.text());
        expect(nextCount).to.eq(expectedNextCount);
      });
    });
  });

  it('librarian can view document in backoffice', () => {
    cy.visit('/login');
    cy.get('input#email').type('librarian@test.ch');
    cy.get('input#password').type('123456');
    cy.contains('button.primary', 'Sign in').click();

    goToSearchDocument();

    cy.get('.fs-book-card')
      .first()
      .click();

    cy.contains('Open in Backoffice').click();

    cy.url().should(
      'contain',
      Cypress.config().baseUrl + '/backoffice/documents/'
    );

    cy.contains('View in Frontsite').click();

    cy.url().should('contain', Cypress.config().baseUrl + '/literature/');
  });
});
