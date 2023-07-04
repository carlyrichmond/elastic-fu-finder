export const getTitle = () => cy.get('h1');

export const getMessage = () => cy.get('[data-testid="welcome-message"]');

export const getPlayButton = () => cy.get('[data-testid="play-button"]');