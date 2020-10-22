describe('navbar links', () => {
  Cypress.Cookies.defaults({
    preserve: 'csrftoken',
  });
  //   it('should be able to go to login page', () => {
  //     cy.visit('/');
  //     cy.contains('Sign in').click();
  //     cy.url().should('include', '/login');
  //   });

  it('should be able to go to profile page when user logged in', () => {
    cy.visit('/');
    cy.server();

    cy.request('https://127.0.0.1:5000/login')
      .its('headers')
      .then(headers => {
        const csrf = headers['set_cookie'];

        cy.request({
          method: 'POST',
          url: 'https://127.0.0.1:5000/api/login',
          failOnStatusCode: false,
          // auth: {
          //   username: 'user@user',
          //   password: 'user123',
          // },
          headers: {
            Origin: 'https://127.0.0.1:3000',
            Referer: 'https://127.0.0.1:3000/',
            HTTP_X_CSRFTOKEN: csrf,
          },
          body: {
            email: 'patron1@test.ch',
            password: '123456',
            _submitButton: 'submit',
          },
        });
      });
  });

  //   it('should be able to go to login page', () => {
  //     cy.visit('/');
  //     cy.contains('Sign in').click();
  //     cy.url().should('include', '/login');
  //   });
});
