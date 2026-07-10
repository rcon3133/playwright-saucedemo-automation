class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.errorMessage = page.locator('[data-test="error"]');

    }

    async fillCheckoutInformation(firstName, lastName, postalCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    getCheckoutOverviewTitle() {
        return this.page.locator('.title');
    }

    async clickContinue() {
        await this.continueButton.click();
        
    }

    async clickCancel() {
        await this.page.locator('[data-test="cancel"]').click();
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
    }
}

module.exports = CheckoutPage;