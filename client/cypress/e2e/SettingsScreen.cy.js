const baseUrl = Cypress.config('baseUrl')

Cypress.Commands.add('login', (email, password) => {

    cy.session([email, password], () => {
        cy.visit('/')
        cy.get('#login').should('be.visible').click()
        cy.get('#email').should('be.visible').type(email)
        cy.get('#password').should('be.visible').type(password)
        cy.get('#loginSubmit').should('be.visible').click()
        cy.url().should('eq', `${baseUrl}/`)
    })
})

Cypress.Commands.add("reactComponent", {
    prevSubject: "element"
}, ($el) => {
    if ($el.length !== 1) {
        throw new Error(`cy.component() requires element of length 1 but got ${$el.length}`);
    }
    // Query for key starting with __reactInternalInstance$ for React v16.x
    const key = Object.keys($el.get(0)).find((key) => key.startsWith("__reactFiber$"));
    const domFiber = $el.prop(key);
    Cypress.log({
        name: "component",
        consoleProps() {
            return {
                component: domFiber,
            };
        },
    });
    return domFiber.return;
});

describe('Settings Screen', () => {
    // Continue as registered user before each test
    beforeEach(() => {
        cy.login('john.smith@gmail.com', 'password')
        cy.visit('/')
        cy.get('#settings-button').should('be.visible').should('be.enabled')
        cy.get('#settings-button').should('be.visible').click()
    })

    it('should be able to move master volume slider', () => {
        cy.get('[aria-labelledby="master-slider"]').reactComponent().its("memoizedProps").invoke("onChange", null, [0, 100]);
    })
})