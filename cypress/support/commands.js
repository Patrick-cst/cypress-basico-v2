Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Patrick')
        cy.get('#lastName').type('Custodio')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()
})