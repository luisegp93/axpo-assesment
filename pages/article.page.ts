import { Page } from "@playwright/test";

const locators = {
    editArticleButton: "a.btn.btn-outline-secondary.btn-sm",
    deleteArticleButton: "button.btn.btn-outline-danger",
    articleTitle: "div>h1",
    footer: "div#root>footer",
    commentBox: "textarea[name='comment']",
    postCommentButton: "button[type='submit']",
    commentsOnArticle: "p.card-text",
    deleteCommentButton: "span.mod-options"
}

export default class ArticlePage {

    constructor(public page: Page) { }

    async clickEditArticleButton(){
        await this.page.locator(locators.editArticleButton).click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickDeleteArticleButton(){
        await this.page.locator(locators.deleteArticleButton).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(locators.footer).scrollIntoViewIfNeeded();
    }

    async getArticleTitle(){
        return await this.page.locator(locators.articleTitle).textContent();
    }

    async typeComment(comment: string){
        await this.page.fill(locators.commentBox, comment);
    }

    async getLastCommentText() {
        await this.page.waitForSelector(locators.commentsOnArticle);
        const elements = await this.page.locator(locators.commentsOnArticle).all();
        const size = elements.length;
        return await this.page.locator(locators.commentsOnArticle).nth(size-1).textContent();
    }

    async deleteMostRecentComment(){
        await this.page.waitForSelector(locators.deleteCommentButton);
        const elements = await this.page.locator(locators.deleteCommentButton).all();
        const size = elements.length;
        await this.page.locator(locators.deleteCommentButton).nth(size-1).click();
    }

    async checkIfCommentPresent(comment: string){
        return await this.page.getByText(`${comment}`).count()
    }

    async clickPostCommentButton(){
        await this.page.locator(locators.postCommentButton).click();
        await this.page.waitForLoadState('networkidle');
    }

}