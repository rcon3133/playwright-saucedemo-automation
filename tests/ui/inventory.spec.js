const {test, expect} = require('@playwright/test');
const InventoryPage = require('../../pages/InventoryPage');
const LoginPage = require('../../pages/LoginPage');
const users = require('../data/users.json');

test.describe('Inventory Page', () => {
    let inventoryPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goTo();
        await loginPage.login(users.standard.username, users.standard.password);
    });

    test('@inventory user can reach inventory page after login', async  ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.getInventoryTitle()).toc('Products');
    });

    test('@inventory user can view products on the inventory page', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(inventoryPage.getInventoryTitle()).toContainText('Products');
        const productcount = await inventoryPage.getProductCount();
        expect(productcount).toBe(6);
    });

    test('@inventory user can add items to the cart', async ({ page }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        const cartCount = await inventoryPage.getcartCount();
        expect(cartCount).toBe(2);
    });

    test('@inventory user can sort products by price low to high', async ({ page }) => {
        await inventoryPage.sortProductsByPriceLowToHigh();
        const prices = await inventoryPage.getProductPrices();
        // Add assertions to verify the sorting
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
        }
    });

    test('@inventory user can sort products by price high to low', async ({ page }) => {
        await inventoryPage.sortProductsByPriceHighToLow();
        const prices = await inventoryPage.getProductPrices();
        // Add assertions to verify the sorting
        for (let i = 0; i < prices.length - 1; i++) {
            expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
        }
    });

    test('@inventory user can sort products by name A to Z', async ({ page }) => {
        await inventoryPage.sortProductsByNameAToZ();
        const names = await inventoryPage.getProductNames();
        // Add assertions to verify the sorting
        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
        }
    });

    test('@inventory user can sort products by name Z to A', async ({ page }) => {
        await inventoryPage.sortProductsByNameZToA();
        const names = await inventoryPage.getProductNames();
        // Add assertions to verify the sorting
        for (let i = 0; i < names.length - 1; i++) {
            expect(names[i].localeCompare(names[i + 1])).toBeGreaterThanOrEqual(0);
        }
    });


});