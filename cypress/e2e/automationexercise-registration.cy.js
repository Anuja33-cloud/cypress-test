import { faker } from '@faker-js/faker';

describe('AutomationExercise - Registration and Login flow', () => {
  it('should register, login, and delete account using fixture + faker data', () => {
    cy.fixture('userData').then((fixtureData) => {
      cy.buildUserData(fixtureData).then((user) => {
        cy.visit('/');
        cy.contains('Signup / Login').click();

        cy.get('input[data-qa="signup-name"]').type(user.name);
        cy.get('input[data-qa="signup-email"]').type(user.email);
        cy.get('button[data-qa="signup-button"]').click();

        cy.get('#id_gender1, #id_gender2').first().check();
        cy.get('input[data-qa="password"]').type(user.password);
        cy.get('select[data-qa="days"]').select(user.birthDay);
        cy.get('select[data-qa="months"]').select(user.birthMonth);
        cy.get('select[data-qa="years"]').select(user.birthYear);

        cy.get('input[data-qa="first_name"]').type(user.firstName);
        cy.get('input[data-qa="last_name"]').type(user.lastName);
        cy.get('input[data-qa="company"]').type(user.company);
        cy.get('input[data-qa="address"]').type(user.address1);
        cy.get('input[data-qa="address2"]').type(user.address2);
        cy.get('select[data-qa="country"]').select(user.country);
        cy.get('input[data-qa="state"]').type(user.state);
        cy.get('input[data-qa="city"]').type(user.city);
        cy.get('input[data-qa="zipcode"]').type(user.zipCode);
        cy.get('input[data-qa="mobile_number"]').type(user.mobileNumber);
        cy.get('button[data-qa="create-account"]').click();

        cy.contains('Account Created!').should('be.visible');
        cy.get('a[data-qa="continue-button"]').click();

        cy.contains(`Logged in as ${user.name}`).should('be.visible');
        cy.contains('Logout').click();

        cy.get('input[data-qa="login-email"]').type(user.email);
        cy.get('input[data-qa="login-password"]').type(user.password);
        cy.get('button[data-qa="login-button"]').click();
        cy.contains(`Logged in as ${user.name}`).should('be.visible');

        cy.contains('Delete Account').click();
        cy.contains('Account Deleted!').should('be.visible');
      });
    });
  });

  it('should submit Contact Us form with faker-generated message', () => {
    cy.fixture('userData').then((fixtureData) => {
      const name = faker.person.fullName();
      const email = faker.internet.email().toLowerCase();
      const subject = `Support request - ${faker.commerce.department()}`;
      const message = `Hello team, this is an automated test message for ${fixtureData.company}.`;

      cy.visit('/');
      cy.contains('Contact us').click();

      cy.get('input[data-qa="name"]').type(name);
      cy.get('input[data-qa="email"]').type(email);
      cy.get('input[data-qa="subject"]').type(subject);
      cy.get('textarea[data-qa="message"]').type(message);
      cy.get('input[data-qa="submit-button"]').click();

      cy.on('window:alert', (text) => {
        expect(text).to.equal('Press OK to proceed!');
      });

      cy.contains('Success! Your details have been submitted successfully.').should('be.visible');
    });
  });
});
