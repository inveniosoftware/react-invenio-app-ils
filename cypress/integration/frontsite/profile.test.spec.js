describe('frontsite profile', () => {
  it('should redirect to login if not logged in', () => {
    cy.shouldRedirectToLogin('/profile');
  });

  it('should go to current tab if logged in', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
    cy.get('a').should('contain', 'Current');
    cy.get('a').contains('Current').should('have.class', 'active');
    cy.contains('h2', 'Your current loans');
  });

  it('should change tab when tab is clicked', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');
    cy.get('a').should('contain', 'History');
    cy.get('a').contains('History').click();
    cy.contains('h2', 'Your past loans');
  });

  it('should cancel loan request', () => {
    cy.login({ email: 'patron2@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');

    const loanRequestDiv = '.ui.divided.items';

    if (cy.get(loanRequestDiv).contains('Cancel request')) {
      cy.get(loanRequestDiv).within(() => {
        cy.contains('.button', 'Cancel request').click();
      });
      cy.contains('Are you sure you want to cancel your loan request?');
      cy.contains('Yes, I am sure').click();
    }
  });

  it('should cancel document request', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');

    if (cy.get('.ui.divided.items').contains('Cancel request')) {
      cy.get('table').within(() => {
        cy.contains('.button', 'Cancel request').click();
      });
      cy.contains('Are you sure you want to cancel your request?');
      cy.contains('Yes, I am sure').click();
    }
  });

  it('should request extension for loan', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');

    cy.get('button').not('.disabled').contains('Request extension').click();
  });

  it('should go to details page when clicking a document', () => {
    cy.login({ email: 'patron1@test.ch', password: '123456' });
    cy.visit('/profile');
    cy.url().should('eq', Cypress.config().baseUrl + '/profile');

    cy.get('a[href*="literature"]').eq(0).click();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature');
  });
});
