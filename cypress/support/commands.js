import { faker } from '@faker-js/faker';

Cypress.Commands.add('buildUserData', (fixtureData) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    ...fixtureData,
    firstName,
    lastName,
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    mobileNumber: faker.phone.number('+1##########')
  };
});
