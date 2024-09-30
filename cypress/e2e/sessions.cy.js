/// <reference types="cypress" />

describe('POST / sessions', () => {

  it('CT-001 user session', () => {

    cy.fixture('users').then(function (users) {
      const userData = users.login
      cy.task('deleteUser', userData.email)
      cy.postUser(userData)

      cy.postSession(userData)
        .then(response => {
          expect(response.status).to.eq(200)

          const { user, token } = response.body
          expect(user.name).to.eq(userData.name)
          expect(user.email).to.eq(userData.email)
          expect(token).not.to.be.empty
        })
    })
  })
  it('CT-002 invalid password', () => {
    cy.fixture('users').then(function(users){      
    const user = users.inv_pass
    cy.postSession(user)
      .then(response => {
        expect(response.status).to.eq(401)
      })
    })
  })
  it('CT-003 invalid email', () => {
    cy.fixture('users').then(function(users){
      const user = users.inv_email
      cy.postSession(user)
        .then(response => {
          const { message } = response.body
  
          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" must be a valid email')
        })
    })
  })
  it('CT-004 empty fields', () => {
    cy.fixture('users').then(function(users){
      const user = users.emp_field
      cy.postSession(user)
        .then(response => {
          const { message } = response.body
  
          expect(response.status).to.eq(400)
          expect(message).to.eq('ValidationError: \"email\" is not allowed to be empty. \"password\" is not allowed to be empty');
  
        })
    })
    
  })
  it('CT-005 email not found', () => {
    cy.fixture('users').then(function(users){
      const user = users.email_404
      cy.postSession(user)
        .then(response => {
          expect(response.status).to.eq(401)  
        })   
    })
  })
});

