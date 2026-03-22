describe('Authentication Flow', () => {
  it('should display signin form', () => {
    cy.visit('/signin');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').contains(/sign ?in/i).should('exist');
  });

  it('should display signup form', () => {
    cy.visit('/signup');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button[type="submit"]').contains(/sign ?up/i).should('exist');
  });

  it('should handle form submission', () => {
    cy.intercept('POST', '/api/users/tokens', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('signin');
    cy.intercept('GET', '/api/users/me', {
      statusCode: 200,
      body: { item: { id: 1, email: 'test@example.com' } },
    }).as('me');

    cy.visit('/signin');
    cy.get('input[type="email"], input[type="text"], input[name*="email"]').first().type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').contains(/sign ?in/i).click();

    cy.wait('@signin');
    cy.wait('@me');

    cy.window().then((win) => {
      expect(win.localStorage.getItem('token')).to.eq('fake-token');
      expect(win.sessionStorage.getItem('user')).to.contain('test@example.com');
    });
  });
});
