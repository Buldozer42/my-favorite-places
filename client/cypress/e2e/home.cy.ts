describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('h1', /Bienvenue|Welcome|My Favorite Places/i).should('exist');
  });

  it('should display the main layout', () => {
    cy.get('body').should('be.visible');
  });

  it('should have navigation elements', () => {
    cy.get('nav, [role="navigation"]').should('exist');
  });
});
