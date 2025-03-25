import { link } from "fs"

describe('login', () => {


beforeEach( () => {

cy.visit('http://localhost:3000')


})

it ('Login in the Demo mode', () => {

cy.get('.gap-4 > .rounded-lg').click()

cy.wait(10000) // EVITE USAR PFVR!!!

cy.url().should('include', 'auth/signup') //Verificando se a página carregou a nova página 
cy.get('.font-medium').click() //Clicando no botão

cy.url().should('include', 'auth/login') //Verificando se foi aberto a nova página de login

cy.get('[placeholder="Enter your email or username"').type("QA_TEST")
cy.get('[placeholder="Enter your password"]').type("labhelv2025@")

cy.get('.button-modern').click()

cy.wait(15000)

cy.url().should('include', 'charts/hematology')
})
})
