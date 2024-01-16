import { Page } from "@playwright/test";

const locators = {
    navBarBrand: "a.navbar-brand",
    signInBarButton: "a[ui-sref='app.login']",
    tagNames: "div.tag-list>a",
    activeTag: " ul.nav.nav-pills.outline-active>li.nav-item>a.nav-link.active",
    tagsOnArticles: "ul.tag-list>li",
    articlesPreview: ".article-preview",
    pageCounter: "ul.pagination>li",
    pageNumbers: "a.page-link",
    userIcon: "img.user-pic",
    authorsNames: "a.author",
    footer: "div#root>footer",
    navbar: "nav.navbar"
}

export default class HomePage {

    constructor(public page: Page) { };

    async getNavBarBrand() {
        return await this.page.locator(locators.navBarBrand)
            .textContent();
    }

    async clickBarSignInButton() {
        await this.page.getByText("Sign in")
            .click();
    }

    async selectRandomTag() {
        await this.page.waitForSelector(locators.tagNames);
        let availableTags = await this.page.locator(locators.tagNames).all();
        const count = availableTags.length;
        const randomIndex = Math.floor(Math.random() * count);
        await this.page.locator(locators.tagNames).nth(randomIndex)
            .click();
        await this.page.waitForLoadState('networkidle');
        await this.page.isVisible(locators.articlesPreview);
    }

    async getActiveTag() {
        return await this.page.locator(locators.activeTag).innerText();
    }

    async getArticlesPreviewAmount() {
        await this.page.waitForSelector(locators.articlesPreview);
        let availableArticlePrevious = await this.page.locator(locators.articlesPreview).all();
        const count = availableArticlePrevious.length;
        return count;
    }

    async getTagsInArticlesPreviews() {
        await this.page.waitForSelector(locators.tagsOnArticles);
        const elements = await this.page.locator(locators.tagsOnArticles).all();
        const tags = await Promise.all(elements.map(async (element) => {
            return element.innerText();
        }));
        return tags;
    }

    async getPageCount() {
        const elements = await this.page.locator(locators.pageCounter).all();
        const count = elements.length;
        return count;
    }

    async clickSecondPage() {
        await this.page.locator(locators.pageNumbers).nth(1).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(locators.navbar).scrollIntoViewIfNeeded();
        await this.page.waitForLoadState('networkidle');
    }

    async clickYourFeed() {
        await this.page.getByText("Your Feed").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(locators.footer).scrollIntoViewIfNeeded();
    }

    async articlesVisible() {
        debugger
        return await this.page.isVisible(locators.articlesPreview);
    }

    async clickNewArticle() {
        await this.page.getByText("New Article").click();
    }

    async clickUserIcon() {
        await this.page.waitForSelector(locators.userIcon);
        await this.page.locator(locators.userIcon).scrollIntoViewIfNeeded();
        await this.page.locator(locators.userIcon).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector(locators.userIcon);
    }

    async clickFirstAuthor(){
        await this.page.locator(locators.authorsNames).nth(0).click();
    }

    async clickCorrectAuthor(author: string) {
        await this.page.waitForSelector(locators.authorsNames);
    
        const elements = await this.page.locator(locators.authorsNames).all();
    
        const namesWithIndex = await Promise.all(elements.map(async (element, index) => {
            return {
                name: await element.innerText(),
                index: index
            };
        }));
    
        const filteredNamesWithIndex = namesWithIndex.filter(({ name }) => name !== author);
        await this.page.locator(locators.authorsNames).nth(filteredNamesWithIndex[0].index).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickGlobalFeed() {
        await this.page.getByText("Global Feed").click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickHomeNavBar() {
        await this.page.getByText("Home").click();
    }

    async clickFirstArticle() {
        await this.page.locator(locators.articlesPreview).nth(0).click();
        await this.page.waitForLoadState('networkidle');
    }

    async getAuthorsNames() {
        await this.page.waitForSelector(locators.authorsNames);
        const elements = await this.page.locator(locators.authorsNames).all();
        const names = await Promise.all(elements.map(async (element) => {
            return element.innerText();
        }));
        return names
    }

    async clickAuthorByName(authorName: string) {
        await this.page.getByText(`${authorName}`).nth(0).click();
    }


}