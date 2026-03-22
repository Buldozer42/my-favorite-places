describe('Navigation', () => {
  it('should navigate to signin page', () => {
    cy.visit('/');
    cy.contains('a, button', /sign in|connexion|login/i).click();
    cy.url().should('include', '/signin');
  });

  it('should navigate to signup page', () => {
    cy.visit('/');
    cy.contains('a, button', /sign up|s\'inscrire|register/i).click();
    cy.url().should('include', '/signup');
  });

  it('should navigate to dashboard if authenticated', () => {
    // This would need proper authentication setup
    cy.visit('/dashboard');
    // Add assertions based on your dashboard structure
  });
});
