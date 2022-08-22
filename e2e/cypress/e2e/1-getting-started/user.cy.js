describe('User',()=>{
    it('should load user mat table', ()=>{
        cy.visit('/user')
        cy.get('.mat-table').should('be.visible')
    })
})