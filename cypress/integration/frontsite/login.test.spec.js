describe('frontsite login', () => {
  const registerLoginAliases = () => {
    cy.get('input#email').as('email');
    cy.get('input#password').as('password');
    cy.contains('button.primary', 'Sign in').as('sign-in');
  };
  const goToLogin = () => {
    cy.server();
    cy.route('POST', '/api/login').as('api-login');

    cy.visit('/login');
    registerLoginAliases();
  };

  it('should login/logout user correctly', () => {
    goToLogin();

    cy.get('@email').type('nonexistent@test.ch');
    cy.get('@password').type('abcdef');
    cy.get('@sign-in').click();

    cy.wait('@api-login').should(xhr => expect(xhr.status).to.eq(400));

    cy.get('@email')
      .clear()
      .type('patron1@test.ch');
    cy.get('@password')
      .clear()
      .type('123456');
    cy.get('@sign-in').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');

    cy.contains('Yannic Vilma').as('profile');
    cy.get('@profile').click();
    cy.contains('Sign out').click();

    cy.contains('Sign in');
  });

  it('should redirect the user to the previous page after login', () => {
    cy.visit('/somepage');

    cy.contains('Sign in').click();

    registerLoginAliases();

    cy.get('@email').type('patron1@test.ch');
    cy.get('@password').type('123456');
    cy.get('@sign-in').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/somepage');
  });
});
