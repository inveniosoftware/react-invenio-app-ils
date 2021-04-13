describe('backoffice document', () => {
  const fieldFor = (label, find) => {
    return cy.contains('.field > label', label).parent().find(find);
  };

  it('create a document and search for it in the backoffice', () => {
    cy.login({ email: 'librarian@test.ch', password: '123456' });
    cy.visit('/backoffice');

    const nameId = Math.random().toString().split('.')[1];

    cy.contains('Books / Articles').click();
    cy.contains('Add document').click();

    cy.contains('Title').type('My document ' + nameId);
    cy.contains('Publication year').type('1993');
    cy.contains('Edition').type('First edition');
    fieldFor('Document type', 'div[role=listbox]')
      .click()
      .contains('div[role=option]', 'Standard')
      .click();
    cy.contains('Source').type('source');
    cy.contains('Number of pages').type(42);
    cy.contains('Full name').type('Author full name');
    fieldFor('Type', 'div[role=listbox]')
      .click()
      .contains('div[role=option]', 'Person')
      .click();
    cy.contains('Abstract').type('This is the abstract.');
    cy.contains('Note').type('Some notes');
    cy.contains('Submit').click();

    cy.contains('#notifications', 'The document was successfully created');

    cy.contains(nameId);
    cy.contains(1993);
    cy.contains('First edition');
    cy.contains(42);
    cy.contains('Author full name');

    cy.visit('/backoffice/documents');

    cy.focused().type(nameId).type('{enter}');
    cy.contains('results found')
      .parent()
      .find('div.blue.label')
      .then(($label) => expect(parseInt($label.text())).to.eq(1));
  });
});
