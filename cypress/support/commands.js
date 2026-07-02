Cypress.Commands.add('generateToken', () => {

  return cy.request({

    method: 'POST',

    url: '/auth',

    body: {

      username: Cypress.env('username'),

      password: Cypress.env('password'),

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

Cypress.Commands.add('updateBooking', (bookingId, token, body) => {

  return cy.request({

    method: 'PUT',

    url: `/booking/${bookingId}`,

    headers: {

      Cookie: `token=${token}`,

    },

    body,

  });

});

Cypress.Commands.add('deleteBooking', (bookingId, token) => {

  return cy.request({

    method: 'DELETE',

    url: `/booking/${bookingId}`,

    headers: {

      Cookie: `token=${token}`,

    },

  });

});