describe("Blog ", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    //cy.request("POST", "http://localhost:3003/api/testing/reset");

    const user1 = {
      name: "Arto Hellas",
      username: "hellas",
      password: "secret-1",
    };

    cy.request("POST", "http://localhost:3003/api/users/", user1);

    const user2 = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "secret-2",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users/`, user2);
    cy.visit("");
    //cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.visit("");
    cy.contains("Blogs");
    cy.contains("username");
    cy.contains("password");
    cy.contains("login").click();
  });

  it("succeeds with correct credentials", function () {
    cy.login({ username: "mluukkai", password: "secret-2" });
    cy.contains("Matti Luukkainen logged in");
  });

  it("fails with wrong credentials", function () {
    cy.loginError({ username: "mluukkai", password: "wrong" });
    //cy.get(".error").contains("wrong username or password");
    //cy.get(".error").should("contain", "wrong username or password");
    //cy.contains("wrong username or password");
    //cy.contains("wrong username or password", 3000).should("be.visible");

    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    cy.contains("Matti Luukkainen logged in").should("not.exist");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "secret-2" });
    });

    it("a new blog can be created", function () {
      cy.createBlog({
        title: "a blog created by cypress",
        author: "Mr. playwright",
        url: "www.playwright.com",
        likes: "10",
      });

      cy.contains("a blog created by cypress");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another blog cypress",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "10",
        });
      });

      it("likes can be incremented", function () {
        cy.get("#view-button").click();
        cy.contains("likes 10");
        cy.get("#like-button").click();
        cy.contains("likes 11");
      });
    });

    describe("When view button is clicked", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another blog cypress",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "10",
        });
      });

      it("only a user who added a blog can remove the blog", function () {
        cy.get("#view-button").click();
        cy.contains("another blog cypress");
        cy.contains("Matti Luukkainen");
        cy.contains("remove");
        cy.get("#remove-button").click();
        cy.should("not.contain", "another blog cypress");
      });
    });

    describe("When other user logs in after blog is created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "another blog cypress",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "10",
        });
        cy.get("#logout-button").click();
        cy.login({ username: "hellas", password: "secret-1" });
      });

      it("only a user who added a blog can see and click the blog's remove button", function () {
        cy.get("#view-button").click();
        cy.contains("another blog cypress");
        cy.contains("Matti Luukkainen");
        cy.should("not.contain", "remove");
      });
    });

    describe("When there are blogs with different number of likes", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the third most likes",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "1",
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "3",
        });
        cy.createBlog({
          title: "The title with the second most likes",
          author: "Mr. playwright",
          url: "www.playwright.com",
          likes: "2",
        });
      });

      it("blogs are sorted in ascending order according to number of likes", function () {
        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
        cy.get(".blog")
          .eq(2)
          .should("contain", "The title with the third most likes");
      });

      it("blogs are sorted again after increasing the number of likes", function () {
        cy.get('button[name="view"]').eq(2).click();
        cy.get("#like-button").click();
        cy.wait(1000);
        cy.get("#like-button").click();
        cy.wait(1000);
        cy.get("#like-button").click();
        cy.wait(1000);
        cy.get("#hide-button").click();

        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the third most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(2)
          .should("contain", "The title with the second most likes");
      });
    });
  });
});
