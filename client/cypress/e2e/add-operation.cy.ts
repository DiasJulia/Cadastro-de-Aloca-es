describe("add-operation", () => {
  it("should add operation", () => {
    cy.visit("http://localhost:3000/operations");
    cy.get("button.add-button").click();
    cy.get('input[name="cnpj"]').type("00.017.024/0001-53");
    cy.get('input[name="data"]').type("2022-10-07");
    cy.get('input[name="razao-social"]').type("Fundo de Investimento em Ações");
    cy.get("button#next-button").click();
    cy.get('input[name="valor"]').should("have.value", "R$30,19");
    cy.get('input[name="quantidade"]').type("1");
    cy.get("div#input-tipo").click();
    cy.get('[data-value="COMPRA"]').click();
    cy.get('button[type="submit"]').click();
    cy.get("tbody tr").should("have.length.greaterThan", 0);
    cy.get("tbody tr").first().should("contain", "00.017.024/0001-53");
  });
});
