describe("Operation", () => {
  // beforeEach(() => {
  //   cy.exec("npm run seed:db");
  // });

  it("should add operations", () => {
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
    cy.get("tbody tr")
      .first()
      .should("contain", "Fundo de Investimento em Ações");
    cy.get("tbody tr").first().should("contain", "30,19");
    cy.get("tbody tr").first().should("contain", "1");
    cy.get("tbody tr").first().should("contain", "COMPRA");
    cy.contains("Operação adicionada com sucesso!").should("be.visible");
  });

  it("should list operations", () => {
    cy.visit("http://localhost:3000/operations");
    cy.get("tbody tr").should("have.length.greaterThan", 0);
  });

  it("should edit operations", () => {
    cy.visit("http://localhost:3000/operations");
    cy.get("tbody tr").first().find("#edit-button").click();
    cy.get('input[name="cnpj"]').clear().type("00.017.024/0001-53");
    cy.get('input[name="data"]').clear().type("2022-10-07");
    cy.get('input[name="razao-social"]').clear().type("Fundo de Investimento");
    cy.get("button#next-button").click();
    cy.get('input[name="quantidade"]').clear().type("2");
    cy.get("div#input-tipo").click();
    cy.get('[data-value="COMPRA"]').click();
    cy.get('button[type="submit"]').click();
    cy.get("tbody tr").should("have.length.greaterThan", 0);
    // cy.get("tbody tr").first().should("contain", "00.017.024/0001-53");
    // cy.get("tbody tr").first().should("contain", "Fundo de Investimento");
    cy.contains("Operação editada com sucesso!").should("be.visible");
  });

  it("should delete operations", () => {
    cy.visit("http://localhost:3000/operations");
    cy.get("tbody tr").first().find("#delete-button").click();
    cy.contains("Você tem certeza que deseja apagar essa operação?").should(
      "be.visible"
    );
    cy.get("#confirm-delete").click();
    cy.contains("Operação apagada com sucesso.").should("be.visible");
  });
});
