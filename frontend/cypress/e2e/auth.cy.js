describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display login page', () => {
    cy.contains('Study Buddy Matcher');
    cy.contains('Sign In');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
  });

  it('should show error for invalid credentials', () => {
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Login failed', { timeout: 5000 }).should('be.visible');
  });

  it('should navigate to register page', () => {
    cy.contains("Don't have an account?").click();
    cy.url().should('include', '/register');
    cy.contains('Create Account');
  });

  it('should register a new user', () => {
    cy.visit('/register');

    const timestamp = Date.now();
    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');
    cy.get('input[name="email"]').type(`testuser${timestamp}@example.com`);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 2').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');

    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
  });

  it('should show error for password mismatch', () => {
    cy.visit('/register');

    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('differentpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Passwords do not match').should('be.visible');
  });

  it('should login successfully with valid credentials', () => {
    // First register a user
    const timestamp = Date.now();
    const email = `logintest${timestamp}@example.com`;
    const password = 'password123';

    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Login');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 1').click();
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="confirmPassword"]').type(password);
    cy.get('button[type="submit"]').click();

    // Wait for redirect to dashboard
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Logout
    cy.contains('Logout').click();

    // Login with the same credentials
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');
    cy.contains('Suggested Study Buddies');
  });

  it('should logout successfully', () => {
    // Register and login first
    const timestamp = Date.now();
    cy.visit('/register');
    cy.get('input[name="firstName"]').type('Logout');
    cy.get('input[name="lastName"]').type('Test');
    cy.get('input[name="email"]').type(`logouttest${timestamp}@example.com`);
    cy.get('input[name="university"]').type('Test University');
    cy.get('input[name="degree"]').type('Computer Science');
    cy.get('input[name="yearOfStudy"]').click();
    cy.contains('Year 1').click();
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirmPassword"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Logout
    cy.contains('Logout').click();

    // Should redirect to login
    cy.url().should('include', '/login');
  });
});
