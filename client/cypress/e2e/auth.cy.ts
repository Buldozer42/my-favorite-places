describe('Authentication Flow', () => {
  it('should display signin form', () => {
    cy.visit('/signin');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button, [role="button"]').should('exist');
  });

  it('should display signup form', () => {
    cy.visit('/signup');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button, [role="button"]').should('exist');
  });

  it('should handle form submission', () => {
    cy.visit('/signin');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').first().type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button, [role="button"]').contains(/sign in|connexion|login/i).click();
  });
});
