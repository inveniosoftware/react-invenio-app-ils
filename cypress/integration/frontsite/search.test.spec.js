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

  it('should be able to go to document details', () => {
    goToSearch();
    cy.get('.fs-book-card')
      .first()
      .click();
    cy.url().should('contain', Cypress.config().baseUrl + '/literature');
  });

  it('should handle empty results', () => {
    goToSearch();
    cy.handleEmptyResults('@input');
  });

  it('should be able to change results per page', () => {
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
  });

  it('should be able to change layout', () => {
    cy.visit('/search');

    cy.get('i.list.layout.icon').click();
    cy.get('div.ui.items > div').should('have.class', 'item');

    cy.get('i.grid.layout.icon').click();
    cy.get('div.ui.cards a').should('have.class', 'fs-book-card');
  });

  it('should be able to use filters', () => {
    goToSearch();

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
  });

  it('should be able to use sorting filters', () => {
    cy.visit('/search');

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
  });

  it('should be able to display available documents', () => {
    cy.visit('/search');

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

  it('should be able to change results page', () => {
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
  });
});
