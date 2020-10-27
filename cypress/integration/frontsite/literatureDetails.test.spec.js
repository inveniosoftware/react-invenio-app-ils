//https://127.0.0.1:3000/search?f=doctype%3ABOOK

describe('frontsite literature details', () => {
  const goToAvailableBookDetails = () => {
    cy.visit(
      '/search?f=doctype%3ABOOK&f=availability%3Aavailable%20for%20loan'
    );
    cy.get('.fs-book-card')
      .first()
      .click();
  };

  const goToEBookDetails = () => {
    cy.visit('/search?f=medium%3AELECTRONIC_VERSION');
    cy.get('.fs-book-card')
      .first()
      .click();
  };

  it('should require login to request loan and access files', () => {
    goToAvailableBookDetails();
    cy.contains('Sign in to loan');
    goToEBookDetails();
    cy.contains('Sign in to loan');
    cy.contains('Please login to see restricted files.');
  });

  it('can view document details and request loan if available', () => {
    cy.server();
    cy.route('GET', '/api/locations/*').as('location');
    cy.route('GET', '/api/me/loans?document_pid=*').as('loan');
    cy.route('GET', '/api/document-requests/*').as('requests');

    cy.login({ email: 'patron1@test.ch', password: '123456' });

    goToAvailableBookDetails();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature/');

    cy.contains('Yannic Vilma').click();
    cy.contains('Your loans').click();
    cy.wait('@requests');

    const loanRequestCountSelector = ':nth-child(2).statistic > .value';
    cy.get(loanRequestCountSelector).then($stat1 => {
      let expectedNextCount = parseInt($stat1.text());

      cy.go('back');

      cy.wait('@loan').then(xhr => {
        const {
          has_active_loan: hasActiveLoan,
          is_requested: isRequested,
        } = xhr.response.body;
        expect(hasActiveLoan).to.be.false;

        if (!isRequested) {
          cy.contains('Have it delivered to my office').click();

          cy.get('input[name=selectedDate]').click();

          cy.wait('@location').wait(1000); // Cannot avoid this delay
          const dayFromDatePicker =
            'td:not(.disabled) > span.suicr-content-item';
          cy.get(dayFromDatePicker)
            .first()
            .type('{enter}');

          cy.contains('button.primary', 'Request').click();

          cy.wait(5000); // ES delay

          cy.contains('.header', 'Request created');
          cy.reload();

          expectedNextCount++;
        }
      });

      cy.contains('You have requested a loan for this literature.'); // See https://github.com/inveniosoftware/react-invenio-app-ils/issues/241

      cy.go('forward');
      cy.wait('@requests');
      cy.get(loanRequestCountSelector).then($stat2 => {
        const nextCount = parseInt($stat2.text());
        expect(nextCount).to.eq(expectedNextCount);
      });
    });
  });

  it('librarian can view document in backoffice', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });

    goToAvailableBookDetails();
    cy.contains('Open in Backoffice').click();
    cy.url().should(
      'contain',
      Cypress.config().baseUrl + '/backoffice/documents/'
    );

    cy.contains('View in Frontsite').click();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature/');
  });
});
