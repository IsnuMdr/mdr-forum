/* eslint-disable quotes */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when username and password are correct
 */

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should display login page correctly", () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Input your email"]').should("be.visible");
    cy.get('input[placeholder="Input your password"]').should("be.visible");
    cy.get("button.btnLogin")
      .contains(/^Login$/)
      .click();
  });

  it("should display alert when Email is empty", () => {
    // klik tombol login tanpa mengisi username
    cy.get("button.btnLogin")
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login failed");
    });
  });

  it("should display alert when password is empty", () => {
    // mengisi username
    cy.get('input[placeholder="Input your email"]').type("testuser@gmail.com");

    // klik tombol login tanpa mengisi password
    cy.get("button.btnLogin")
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login failed");
    });
  });

  it("should display alert when email and password are wrong", () => {
    // mengisi username
    cy.get('input[placeholder="Input your email"]').type("testuser@gmail.com");

    // mengisi password yang salah
    cy.get('input[placeholder="Input your password"]').type("wrong_password");

    // menekan tombol Login
    cy.get("button.btnLogin")
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Login failed");
    });
  });

  it("should display homepage when username and password are correct", () => {
    // mengisi username
    cy.get('input[placeholder="Input your email"]').type("isnu@gmail.com");

    // mengisi password yang benar
    cy.get('input[placeholder="Input your password"]').type("isnu123");

    // menekan tombol Login
    cy.get("button.btnLogin")
      .contains(/^Login$/)
      .click();
  });
});
