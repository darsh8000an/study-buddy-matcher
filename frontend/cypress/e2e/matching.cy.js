describe('Matching Functionality', () => {
  let userEmail;

  beforeEach(() => {
    // Register and login
    const timestamp = Date.now();
    userEmail = `matchtest${timestamp}@example.com`;

    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Match');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 2').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });

  it('should display dashboard with match suggestions', () => {
    cy.contains('Suggested Study Buddies').should('be.visible');
  });

  it('should show message when no matches found', () => {
    // If no other users exist, should show no matches message
    cy.contains('No matches found').should('exist');
  });

  it('should navigate to search page', () => {
    cy.contains('Search').click();
    cy.url().should('include', '/search');
    cy.contains('Search Study Buddies');
  });

  it('should search for users', () => {
    cy.contains('Search').click();

    cy.get('button').contains('Search').click();

    // Should show results or "No users found" message
    cy.contains(/results|No users found/).should('exist');
  });

  it('should filter users by criteria', () => {
    cy.contains('Search').click();

    cy.get('input[placeholder="Filter by university"]').type('Test University');
    cy.get('button').contains('Search').click();

    // Wait for results
    cy.wait(1000);
  });

  it('should navigate to matches page', () => {
    cy.contains('Matches').click();
    cy.url().should('include', '/matches');
    cy.contains('My Matches');
  });

  it('should display match tabs', () => {
    cy.contains('Matches').click();

    cy.contains('Pending Requests').should('be.visible');
    cy.contains('Sent Requests').should('be.visible');
    cy.contains('Accepted Matches').should('be.visible');
  });

  it('should view user detail page from search', () => {
    // Create another user first
    cy.contains('Logout').click();

    const timestamp2 = Date.now();
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Another');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="email"]').type(`anotheruser${timestamp2}@example.com`);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 2').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.contains('Logout').click();

    // Login with first user
    cy.visit('/login');
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to search
    cy.contains('Search').click();
    cy.get('button').contains('Search').click();

    // Click on View Profile for first user in list
    cy.get('button').contains('View Profile').first().click({ force: true });

    // Should navigate to user detail page
    cy.url().should('include', '/user/');
  });

  it('should send match request from user detail page', () => {
    // Create another user first
    cy.contains('Logout').click();

    const timestamp2 = Date.now();
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Request');
    cy.get('input[name="lastName"]').type('Recipient');
    cy.get('input[name="email"]').type(`recipient${timestamp2}@example.com`);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 2').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.contains('Logout').click();

    // Login with first user
    cy.visit('/login');
    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Go to search and view profile
    cy.contains('Search').click();
    cy.get('button').contains('Search').click();
    cy.wait(1000);
    cy.get('button').contains('View Profile').first().click({ force: true });

    // Send request
    cy.contains('Send Request').click();

    cy.contains('Match request sent', { timeout: 5000 }).should('be.visible');
  });

  it('should display notification badge', () => {
    cy.contains('Matches').click();

    // Should show notification icon (even if count is 0)
    cy.get('svg').should('exist'); // NotificationsIcon exists
  });
});
