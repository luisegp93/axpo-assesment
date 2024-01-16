import { test, expect } from "@playwright/test";

import HomePage from "../../pages/home.page";
import SignInPage from "../../pages/signin.page";
import ArticlePage from "../../pages/article.page";

const testEmail = "testemail@email.com";
const testPassword = "testpassword";

test.describe("COMMENT_TC", () => {

    test("COMMENT_TC_ALL", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const articlePage = new ArticlePage(page);

        const commentForArticle = "Comment for article";

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        await homePage.clickGlobalFeed();
        await homePage.clickFirstArticle();

        await articlePage.typeComment(commentForArticle);
        await articlePage.clickPostCommentButton();

        const recentComment = await articlePage.getLastCommentText();
        debugger
        expect(recentComment).toBe(commentForArticle);

        await articlePage.deleteMostRecentComment();

        const commentCount = await articlePage.checkIfCommentPresent(commentForArticle);

        expect(commentCount).toBe(0)
    });

});




