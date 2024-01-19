/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('realizar cadastro com sucesso', function(){
    const longText = 'teste, teste, teste'

        cy.get('#firstName').type('Patrick')
        cy.get('#lastName').type('Custodio')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
        cy.contains('Mensagem enviada com sucesso.').should('be.visible');
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Patrick')
        cy.get('#lastName').type('Custodio')
        cy.get('#email').type('teste@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function(){
        cy.get('#phone')
          .type('abcdef')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Patrick')
        cy.get('#lastName').type('Custodio')
        cy.get('#email').type('teste@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Patrick')
          .should('have.value', 'Patrick')
          .clear()
          .should('have.value', '')
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('selecionar um select', function(){
        cy.get('select')
          .select('YouTube')
          .should('have.value', 'youtube')
       
    })

    it('arca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
          .check()

        cy.get('input[type="radio"][value="feedback"]')
          .should('be.checked')
    })

   
    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio)
              .should('be.checked')
          })

        
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')
           
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
          .selectFile('./cypress/fixtures/example.json')
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.be.equals('example.json')
          })
           
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.be.equals('example.json')
          })
           
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
          .selectFile('@sampleFile')
          .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.be.equals('example.json')
          })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a')
          .should('have.attr', 'target', '_blank')
    })


    it('Deve exibir apenas arquivos com o nome filtrado', () => {
        // Acessar a página
        cy.visit('URL_DA_PAGINA');
    
        // Inserir o nome do arquivo na caixa de pesquisa
        cy.get('#caixa-de-pesquisa').type('Nome do Arquivo');
    
        // Aguardar pelos resultados da pesquisa
        cy.get('#resultados-da-pesquisa').should('be.visible');
    
        // Validar os resultados da pesquisa
        cy.get('.resultado-do-arquivo').each((resultado) => {
          // Verificar se o nome do arquivo corresponde ao filtro
          cy.wrap(resultado).should('include.text', 'Nome do Arquivo');
        });
      });
})
