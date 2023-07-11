export const getTimer = () => cy.get('[data-testid="timer"]');

export const getScreenshot = () => cy.get('[data-testid="screenshot"]');

export const getPriorPageButton = () =>
  cy.get('[data-testid="previous-button"]');

export const getNextPageButton = () => cy.get('[data-testid="next-button"]');

export const getSearchBar = () => cy.get('input');

export const getResultMessage = () => cy.get('[data-testid="result-message"]');

export const getResults = () => cy.get('[data-testid="result"]');
