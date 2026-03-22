describe('Home Page', () => {
  it('should load the home page', () => {
    cy.visit('/');
    cy.contains('h1', /home page/i).should('exist');
    cy.contains('p', /welcome on my favorite places/i).should('exist');
  });

  it('should display the main layout', () => {
    cy.get('body').should('be.visible');
  });

  it('should have navigation elements', () => {
    cy.contains('a', /sign ?in/i).should('exist');
    cy.contains('a', /sign ?up/i).should('exist');
  });
});
