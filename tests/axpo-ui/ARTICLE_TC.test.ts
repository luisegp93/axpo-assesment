import { test, expect } from "@playwright/test";

import HomePage from "../../pages/home.page";
import SignInPage from "../../pages/signin.page";
import ArticleEditorPage from "../../pages/article_editor.page";
import ArticlePage from "../../pages/article.page";
import ProfilePage from "../../pages/profile.page";

const testEmail = "testemail@email.com";
const testPassword = "testpassword";

test.describe("ARTICLE_TC", () => {

    test("ARTICLE_TC_01", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const articleEditorPage = new ArticleEditorPage(page);

        const count = 10000;
        const randomIndex = Math.floor(Math.random() * count);
        const stringRandomIndex = randomIndex.toString();

        const title = "TestTitle" + stringRandomIndex;
        const description = "Test description";
        const body = "Test body";
        const tag = "test";


        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        //1.Create new article
        await homePage.clickNewArticle();

        //2.Fill fields
        await articleEditorPage.inputTitle(title);
        await articleEditorPage.inputDescription(description);
        await articleEditorPage.inputBody(body);
        await articleEditorPage.inputTag(tag);
        await articleEditorPage.clickPublish();

        //Intercepting API response
        const response = await page.waitForResponse('https://api.realworld.io/api/articles');
        const status = response.status();

        //Expect Status Code: 201 Created
        expect(status).toBe(201);
    });

    test("ARTICLE_TC_02", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);
        const articlePage = new ArticlePage(page);
        const articleEditorPage = new ArticleEditorPage(page);

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        //1.Edit Existing article
        await homePage.clickUserIcon();

        await profilePage.waitForProfileToLoad();
        await profilePage.clickFirstArticle();

        const articleTitle = await articlePage.getArticleTitle();
        await articlePage.clickEditArticleButton();

        const count = 10000;
        const randomIndex = Math.floor(Math.random() * count);
        const stringRandomIndex = randomIndex.toString();

        const title = "EditedTitle" + stringRandomIndex;
        const description = "Edited description";
        const body = "Edited body";
        const tag = "editedtest";

        await articleEditorPage.inputTitle(title);
        await articleEditorPage.inputDescription(description);
        await articleEditorPage.inputBody(body);
        await articleEditorPage.inputTag(tag);
        await articleEditorPage.clickPublish();

        // Intercepting API response
        const response = await page.waitForResponse(`https://api.realworld.io/api/articles/${articleTitle}-4166`);
        const status = response.status();

        //Expect Status Code: 200 OK
        expect(status).toBe(200);
    });

    test("ARTICLE_TC_03", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        //1.Open Existing Article
        await homePage.clickUserIcon();
        await profilePage.waitForProfileToLoad();

        const firstArticleTitle = await profilePage.getFirstArticleTitle();
        await profilePage.clickFirstArticle();


        // Intercepting API response
        const response = await page.waitForResponse(`https://api.realworld.io/api/articles/${firstArticleTitle}-4166`);
        const status = response.status();

        //Expect Status Code: 200 OK
        expect(status).toBe(200);
    });

    test("ARTICLE_TC_04", async ({ page }) => {
        await page.goto('https://conduit.realworld.how/');

        const signInPage = new SignInPage(page);
        const homePage = new HomePage(page);
        const profilePage = new ProfilePage(page);
        const articlePage = new ArticlePage(page);

        await homePage.clickBarSignInButton();

        await signInPage.inputEmail(testEmail);
        await signInPage.inputPassword(testPassword);
        await signInPage.clickSignInButton();

        //1.Delete Existing article
        await homePage.clickUserIcon();
        await profilePage.waitForProfileToLoad();

        const firstArticleTitle = await profilePage.getFirstArticleTitle();
        await profilePage.clickFirstArticle();
        await articlePage.clickDeleteArticleButton();

        await homePage.clickUserIcon();
        //2. Assert article is no longer visible in UI
        const titles = await profilePage.getArticlesInProfile();

        const filteredTitles = titles.filter(el => el === firstArticleTitle);
        const expectedResults = filteredTitles.length;

        expect(expectedResults).toBe(0);
    });

});




