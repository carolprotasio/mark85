Cypress.Commands.add('purgeQueueMessages', () => {
    cy.api({
      url: Cypress.env('ampqhost') + '/tasks/contents',
      method: 'DELETE',
      headers: {
        authorization: Cypress.env('ampqToken')
      },
      body: {
        vhost: 'gubpmpvk',
        name: Cypress.env('ampqQueue'),
        mode: 'purge'
      },
      failOnStatusCode: false
    }).then(response => { return response })
  })
  Cypress.Commands.add('getQueueMessages', () => {
    cy.api({
      url: Cypress.env('ampqhost') + 'tasks/get',
      method: 'POST',
      headers: {
        authorization: Cypress.env('ampqToken')
      },
      body: {
        vhost: 'gubpmpvk',
        name: Cypress.env('ampqQueue'),
        truncate: '50000',
        ackmode: 'ack_requeue_true',
        encoding: 'auto',
        count: '1'
      },
      failOnStatusCode: false
    }).then(response => { return response })
  })