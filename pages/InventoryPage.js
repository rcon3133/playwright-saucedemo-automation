class InventoryPage {
    constructor (page) {
        this.page = page;
        this.title = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.shoppingCartlink = page.locator('.shopping_cart_link');
        this.sortdropdown = page.locator('[data-test="product-sort-container"]');
    }   

    async getProductsCount() {
        return await this.inventoryItems.count();
    }

    getInventoryTitle() {
        return this.title;
    }

    async addItemToCart(itemName) {
        const item = this.inventoryItems.filter({ hasText: itemName });
        const addButton = item.locator('button');
        await addButton.click();
    }     
    
    async getProductNames() {
        const names = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const name = await this.inventoryItems.nth(i).locator('.inventory_item_name').textContent();
            names.push(name);
        }
        return names;
    }

    async getProductPrices() {
        const prices = [];
        const count = await this.inventoryItems.count();
        for (let i = 0; i < count; i++) {
            const price = await this.inventoryItems.nth(i).locator('.inventory_item_price').textContent();
            prices.push(parseFloat(price.replace('$', '')));
        }
        return prices;
    }

    async sortProductsBy(option) {
        await this.sortdropdown.selectOption(option);
    }

    async sortProductsByPriceLowToHigh() {
        await this.sortdropdown.selectOption('lohi');
    }

    async sortProductsByPriceHighToLow() {
        await this.sortdropdown.selectOption('hilo');
    }

    async sortProductsByNameAToZ() {
        await this.sortdropdown.selectOption('az');
    }

    async sortProductsByNameZToA() {
        await this.sortdropdown.selectOption('za');
    }

    async getProductCount() {
        return await this.inventoryItems.count();
    }

    async getcartCount() {
        const cartCount = await this.shoppingCartlink.locator('.shopping_cart_badge').textContent();
        return parseInt(cartCount) || 0;
    }

    async goToCart() {
        await this.shoppingCartlink.click();
    }

   
}

module.exports = InventoryPage;