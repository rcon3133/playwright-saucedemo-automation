class CartPage {
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        
    }

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeItem(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        const removeButton = item.locator('.cart_button');
        await removeButton.click();
    }

    async addItem(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        const addButton = item.locator('.cart_button');
        await addButton.click();
    }

    async verifyItemInCart(itemName) {
        const item = this.cartItems.filter({ hasText: itemName });
        return await item.count() > 0;
    }

    getCartItems() {
        return this.cartItems.filter({ hasText: itemName });
    }
}

module.exports = CartPage;