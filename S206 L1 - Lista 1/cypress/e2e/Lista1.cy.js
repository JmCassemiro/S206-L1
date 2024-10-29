/// <reference types="cypress" />

describe("Testes no Sauce Demo", () => {
    // Armazenando nome de usuarios validos/invalidos e senhas validas/invalidos
    const usuarioValido = "standard_user";
    const senhaValida = "secret_sauce";
    const usuarioInvalido = "invalid_user";
    const senhaInvalida = "wrong_password";
    const nomeProduto = "Sauce Labs Backpack"; // nome do produto

    // Testa o login com credenciais válidas.
    it("Teste de Login com Sucesso", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioValido);
        cy.get("#password").type(senhaValida);
        cy.get(".btn_action").click();
        cy.url().should("include", "/inventory.html");
        cy.get(".title").should("contain.text", "Products");
    });

    // Testa o login com credenciais inválidas. (teste negativo)
    it("Teste de Login com Falha", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioInvalido);
        cy.get("#password").type(senhaInvalida);
        cy.get(".btn_action").click();
        cy.get(".error-message-container").should("be.visible");
        cy.get(".error-message-container").should(
            "contain.text",
            "Username and password do not match any user in this service"
        );
    });

    // Adicionando produtos no carrinho
    it("Teste de Adição de Produto ao Carrinho", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioValido);
        cy.get("#password").type(senhaValida);
        cy.get(".btn_action").click();
        cy.contains(nomeProduto).click();
        cy.get(".btn_primary").click();
        cy.get(".shopping_cart_badge").should("contain.text", "1");
    });

    // Removendo produtos no carrinho
    it("Teste de Remoção de Produto do Carrinho", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioValido);
        cy.get("#password").type(senhaValida);
        cy.get(".btn_action").click();
        cy.contains(nomeProduto).click();
        cy.get(".btn_primary").click();
        cy.get(".shopping_cart_link").click();
        cy.get(".btn_secondary").click();
        cy.get(".shopping_cart_badge").should("not.exist");
    });

    // Finalizando compra
    it("Teste de Finalização de Compra", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioValido);
        cy.get("#password").type(senhaValida);
        cy.get(".btn_action").click();
        cy.contains(nomeProduto).click();
        cy.get(".btn_primary").click();
        cy.get(".shopping_cart_link").click();
        cy.get(".checkout").click();
        cy.get("#first-name").type("João Marcos");
        cy.get("#last-name").type("Jm");
        cy.get("#postal-code").type("123");
        cy.get(".btn_primary").click();
        cy.get(".complete-header").should(
            "contain.text",
            "Thank you for your order!"
        );
    });

    // Exibição do carrinho
    it("Teste de Exibição de Mensagem de Carrinho Vazio", () => {
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type(usuarioValido);
        cy.get("#password").type(senhaValida);
        cy.get(".btn_action").click();
        cy.get(".shopping_cart_link").click();
        cy.get(".cart_contents_container").should(
            "contain.text",
            "Your cart is empty"
        );
    });
});
