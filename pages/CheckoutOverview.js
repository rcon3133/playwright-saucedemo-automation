class CheckoutOverview {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');

        this.backHomeButton = page.locator('[data-test="back-to-products"]');
        this.checkoutCompleteImage = page.locator('.pony_express');
        this.checkoutCompleteTitle = page.locator('.title');
        this.checkoutCompleteMessage = page.locator('[data-test="complete-text"]');
    }

    async cartItemsCount() {
        return await this.cartItems.count();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    getCheckoutCompleteTitle() {
        return this.checkoutCompleteTitle;
    }

    getCheckoutCompleteMessage() {
        return this.checkoutCompleteMessage;
    }

    getCheckoutCompleteImage() {
        return this.checkoutCompleteImage;
    }

    getCheckoutOverviewTitle() {
        return this.page.locator('.title');
    }

    getItemTotal() {
        return this.page.locator('.summary_subtotal_label');
    }

    getItemNames() {
        return this.page.locator('.inventory_item_name');
    }

    getItemPrices() {
        return this.page.locator('.inventory_item_price');
    }

    getTax() {
        return this.page.locator('.summary_tax_label');
    }

    getTotal() {
        return this.page.locator('.summary_total_label');
    }
}

module.exports = CheckoutOverview;