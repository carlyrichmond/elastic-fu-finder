import { getNextPageButton, getPriorPageButton, getResultMessage, getResults, getScreenshot, getSearchBar, getTimer } from '../support/game.po';

describe('elastic-fu-finder gameplay', () => {
  beforeEach(() => cy.visit('/play'));

  it('should start game', () => {
    getTimer().should('contain', '2:');
    getPriorPageButton().should('be.disabled');
  });

  it('should get next page', () => {
    let currentDocumentId; 
    getScreenshot().invoke('attr', 'src').then((documentId) => {
      currentDocumentId = documentId;
    });
    
    getPriorPageButton().should('be.disabled');

    getNextPageButton().click();
    getScreenshot().invoke('attr', 'src').then((documentId) => {
      expect(currentDocumentId).to.not.equal(documentId);
    });
  });

  it('should get search results', () => {
    getResultMessage().should('have.text', 'No query specified');
    getSearchBar().type('Kiera{enter}');

    getResultMessage().should('not.exist');
    getResults().should('have.length.at.least', 1);
  });

  it('should show no results message', () => {
    getResultMessage().should('have.text', 'No query specified');
    getSearchBar().type('pppppppppp{enter}');

    getResultMessage().should('have.text', 'No results available');
  });

});
