
describe('Home Page', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('Shuold exist', function() {
    cy.get('body', { timeout: 10000 }).should('be.visible');
  });
});
