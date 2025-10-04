describe('Profile Management', () => {
  beforeEach(() => {
    // Register and login
    const timestamp = Date.now();
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Profile');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="email"]').type(`profiletest${timestamp}@example.com`);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 2').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });

  it('should navigate to profile page', () => {
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('My Profile');
  });

  it('should update basic profile information', () => {
    cy.contains('Profile').click();

    cy.get('input[name="firstName"]').clear().type('Updated');
    cy.get('input[name="lastName"]').clear().type('Name');
    cy.get('textarea[name="bio"]').type('This is my updated bio');

    cy.contains('button', 'Save Profile').click();

    cy.contains('Profile updated successfully', { timeout: 5000 }).should('be.visible');

    // Verify values persisted
    cy.get('input[name="firstName"]').should('have.value', 'Updated');
    cy.get('input[name="lastName"]').should('have.value', 'Name');
    cy.get('textarea[name="bio"]').should('have.value', 'This is my updated bio');
  });

  it('should add enrolled units', () => {
    cy.contains('Profile').click();

    cy.get('input[placeholder="e.g., SIT725"]').type('SIT725');
    cy.get('input[placeholder="e.g., Advanced Web Development"]').type('Advanced Web Development');
    cy.get('button').contains('add').click();

    cy.contains('SIT725 - Advanced Web Development').should('be.visible');
  });

  it('should remove enrolled units', () => {
    cy.contains('Profile').click();

    // Add a unit first
    cy.get('input[placeholder="e.g., SIT725"]').type('SIT737');
    cy.get('input[placeholder="e.g., Advanced Web Development"]').type('Data Science');
    cy.get('button').contains('add').click();

    // Delete the unit
    cy.contains('SIT737 - Data Science').find('svg').click();

    cy.contains('SIT737 - Data Science').should('not.exist');
  });

  it('should update academic interests', () => {
    cy.contains('Profile').click();

    cy.get('label').contains('Academic Interests').parent().find('input').type('Web Development{enter}');
    cy.get('label').contains('Academic Interests').parent().find('input').type('Machine Learning{enter}');

    cy.contains('button', 'Save Profile').click();

    cy.contains('Profile updated successfully', { timeout: 5000 }).should('be.visible');
  });

  it('should update study preferences', () => {
    cy.contains('Profile').click();

    // Select preferred times
    cy.get('label').contains('Preferred Study Times').parent().find('input').type('Morning{enter}');
    cy.get('label').contains('Preferred Study Times').parent().find('input').type('Evening{enter}');

    // Select preferred locations
    cy.get('label').contains('Preferred Study Locations').parent().find('input').type('Library{enter}');

    // Select study style
    cy.get('label').contains('Study Style').parent().click();
    cy.contains('li', 'Group Study').click();

    cy.contains('button', 'Save Profile').click();

    cy.contains('Profile updated successfully', { timeout: 5000 }).should('be.visible');
  });

  it('should display all profile fields correctly', () => {
    cy.contains('Profile').click();

    cy.get('input[name="firstName"]').should('exist');
    cy.get('input[name="lastName"]').should('exist');
    cy.get('input[name="university"]').should('exist');
    cy.get('input[name="degree"]').should('exist');
    cy.get('input[name="yearOfStudy"]').should('exist');
    cy.get('textarea[name="bio"]').should('exist');
    cy.contains('Enrolled Units').should('exist');
    cy.contains('Academic Interests').should('exist');
    cy.contains('Preferred Study Times').should('exist');
    cy.contains('Preferred Study Locations').should('exist');
    cy.contains('Study Style').should('exist');
  });
});
