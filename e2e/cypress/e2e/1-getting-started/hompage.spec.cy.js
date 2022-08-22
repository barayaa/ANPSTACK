describe('HomePage', () =>{
    it('shoul load succesfully', () =>{
        cy.visit('/'); 
    })

    it('should contains right spell component',() =>{
       cy.contains('Users')
       cy.contains('Admin')
       cy.contains('login')
       cy.get('mat-select').click()
       cy.contains('Register')
    })
})