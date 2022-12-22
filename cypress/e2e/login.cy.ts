describe('Login page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('accepts username and password inputs', () => {
    const username = 'test'

    cy.get('.login-form-username-input')
      .type(username)
      .should('have.value', username)

    const pass = 'pass'

    cy.get('.login-form-password-input')
      .type(pass)
      .should('have.value', pass)
  })
})