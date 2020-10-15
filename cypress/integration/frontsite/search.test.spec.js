describe('frontsite search', () => {
  const registerSearchAliases = () => {
    cy.url().should('contain', Cypress.config().baseUrl + '/search');

    cy.focused()
      .as('input')
      .parent()
      .find('button')
      .as('search');
    cy.contains('results found')
      .parent()
      .find('div.blue.label')
      .as('results-found');
    cy.contains('Show')
      .parent()
      .find('div.dropdown')
      .as('per-page');
    cy.get('div.pagination')
      .first()
      .as('pagination');
  };
  const goToSearch = () => {
    cy.visit('/search');
    registerSearchAliases();
  };
  const login = () => {
    cy.get('input#email').type('patron@test.ch');
    cy.get('input#password').type('123456');
    cy.contains('button.primary', 'Sign in').click();
  };

  it('should handle empty results', () => {
    goToSearch();
    cy.get('@input').type('zzzzzz');
    cy.get('@search').click();
    cy.contains('No results found');
    cy.contains('Availability').should('not.exist'); // See https://github.com/inveniosoftware/react-invenio-app-ils/issues/5
  });

  it('should be able to use the search components', () => {
    cy.visit('/');
    cy.focused().type('{enter}');
    registerSearchAliases();

    // We assume that there is at least one result

    // Search results count
    const checkResultsCount = expectation => {
      cy.get('@results-found').then($label => {
        const total = parseInt($label.text());

        cy.get('.fs-book-card').then($cards => {
          cy.get('@per-page')
            .find('div[role=option].selected')
            .then($perPage => {
              const perPage = parseInt($perPage.text());
              expect(perPage).to.eq(expectation);
            });
          expect($cards.length).to.eq(Math.min(expectation, total));
        });
      });
    };

    checkResultsCount(15);

    cy.get('@per-page')
      .click()
      .contains(60)
      .click();

    checkResultsCount(60);

    cy.get('@per-page')
      .click()
      .contains(15)
      .click();

    // Aggregation buckets
    // TODO is there a better way to express this temporal logic?
    cy.contains('.checkbox', 'Book').then($books => {
      const bucket1Total = parseInt(
        $books
          .parent()
          .parent()
          .find('div.label')
          .text()
      );
      cy.get($books).click();
      cy.get('@results-found').then($label1 => {
        const total1 = parseInt($label1.text());
        expect(total1).to.eq(bucket1Total);
        cy.contains('.checkbox', 'Standard')
          .click()
          .then($standard => {
            const bucket2Total = parseInt(
              $standard
                .parent()
                .parent()
                .find('div.label')
                .text()
            );
            cy.get('@results-found').then($label2 => {
              const total2 = parseInt($label2.text());
              expect(total2).to.eq(bucket1Total + bucket2Total);
            });
          });
      });
    });

    goToSearch();

    cy.get('@pagination').find('a.active[value=1]');

    cy.get('@results-found').then($label1 => {
      const total = parseInt($label1.text());
      if (total > 15) {
        cy.get('@pagination')
          .find('a[type=nextItem]')
          .click();
        cy.get('@pagination').find('a.active[value=2]');
        cy.get('@pagination')
          .find('a[type=pageItem][value=1]')
          .click();
      }
    });

    // Sort filters

    cy.get('.sort-by-filters').click();
    cy.contains('Title [A-Z]').click();

    cy.get('.fs-book-card').then($cards => {
      const title = cardIndex =>
        $cards
          .eq(cardIndex)
          .find('div.header')
          .text();
      // Should be sorted
      for (let i = 0; i < $cards.length - 1; i++) {
        const card1 = title(i),
          card2 = title(i + 1);
        // eslint-disable-next-line no-unused-expressions
        expect(card1 <= card2).to.be.true;
      }
    });

    // Availability

    cy.get('i.list.layout.icon').click();
    cy.contains('.checkbox', 'available for loan').click();
    cy.get('div.ui.items > div.item').then($cards => {
      for (let i = 0; i < $cards.length; i++) {
        // All should be available
        cy.get($cards.eq(i))
          .contains('Available for loan')
          .should('have.length', 1);
      }
    });
  });
});
