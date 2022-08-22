 const { EMAIL, PASSWORD } = require('./constant.cy')

 describe('login', ()=>{
        it('should login succesfully', ()=>{
            cy.visit('/login')
            cy.get('[formcontrolname="email"]').type(EMAIL)
            cy.get('[formcontrolname="password"]').type(PASSWORD)
            cy.get('[type="submit"]').click()
            cy.url().should('include', 'admin')
        } )
 })

