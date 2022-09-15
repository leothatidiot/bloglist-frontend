describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
  })

  it('Login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('login')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.get('#login-button').click()
      cy.contains(' logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('abc')
      cy.get('input:last').type('abc')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', async function () {
      cy.contains('create new blog').click()
      cy.get('input[name=Title]').type('Login of Frontend')
      cy.get('input[name=Author]').type('Crisp J. Will')
      cy.get('input[name=Url]').type('https://localhost:3000')
      cy.get('#create-button').click()
      await cy.contains('a new blog "Login of Frontend" by "Crisp J. Will" added')
    })

    it('5.20 user can like a blog', function () {
      cy.contains('Things I don\'t know as of 2018').parent()
        .as('blogA').find('button').click()
      cy.get('@blogA').find('.likeButton').click()
      cy.get('@blogA').should('contain','3')
    })

    it('5.22 blogs are ordered', function () {
      cy.contains('Things I don\'t know as of 2018').parent()
        .as('blogA').find('button').click()
      // cy.debug()
      cy.contains('Microservices and the First Law of Distributed Objects').parent()
        .as('blogB').find('button').click()

      // blogB click like
      cy.get('@blogB').find('.likeButton').click()
      cy.wait(500)

      cy.get('.blog').eq(0).should('contain', 'Microservices and the First Law of Distributed Objects')
      cy.get('.blog').eq(1).should('contain', 'Things I don\'t know as of 2018')

      // blogA click like 2 times
      cy.get('@blogA').find('.likeButton').click()
      cy.wait(500)
      cy.get('@blogA').find('.likeButton').click()
      cy.wait(500)

      cy.get('.blog').eq(0).should('contain', 'Things I don\'t know as of 2018')
      cy.get('.blog').eq(1).should('contain', 'Microservices and the First Law of Distributed Objects')
    })
  })

  describe('Deletion', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('5.21 blog can delete by creator', function () {
      cy.contains('Microservices and the First Law of Distributed Objects').parent()
        .as('blogB').find('button').click()
      cy.get('@blogB').find('.removeButton').click()
      cy.get('html').should('not.contain', 'Microservices and the First Law of Distributed Objects')
    })

    it('5.21 blog cannot delete by other user', function () {
      cy.contains('Things I don\'t know as of 2018').parent()
        .as('blogA').find('button').click()
      cy.get('@blogA').should('not.contain', 'remove')
    })
  })
})