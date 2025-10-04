// Custom commands for Cypress

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
});

Cypress.Commands.add('register', (userData) => {
  cy.visit('/register');
  cy.get('input[name="firstName"]').type(userData.firstName);
  cy.get('input[name="lastName"]').type(userData.lastName);
  cy.get('input[name="email"]').type(userData.email);
  cy.get('input[name="university"]').type(userData.university);
  cy.get('input[name="degree"]').type(userData.degree);
  cy.get('input[name="yearOfStudy"]').click();
  cy.contains(`Year ${userData.yearOfStudy}`).click();
  cy.get('input[name="password"]').type(userData.password);
  cy.get('input[name="confirmPassword"]').type(userData.password);
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 10000 }).should('include', '/dashboard');
});

Cypress.Commands.add('logout', () => {
  cy.contains('Logout').click();
  cy.url().should('include', '/login');
});
