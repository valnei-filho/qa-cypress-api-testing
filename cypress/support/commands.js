Cypress.Commands.add('generateToken', () => {

  return cy.request({

    method: 'POST',

    url: '/auth',

    body: {

      username: 'admin',

      password: 'password123',

    },

  });

});

Cypress.Commands.add('createBooking', () => {

  return cy.fixture('booking').then((bookingData) => {

    return cy.request({

      method: 'POST',

      url: '/booking',

      body: bookingData,

    });

  });

});