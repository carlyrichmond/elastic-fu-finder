import { getTitle, getMessage, getPlayButton } from '../support/app.po';

describe('elastic-fu-finder', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome', () => {
    getTitle().contains('Fu-Finder');
    getMessage().contains('Test your search-fu skills with Elasticsearch')
  });

  it('should start game', () => {
    getPlayButton().click();
    cy.url().should('contain', '/play');
  });
});
