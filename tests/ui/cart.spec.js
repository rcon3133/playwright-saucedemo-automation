const {test, expect} = require('@playwright/test');
const InventoryPage  = require('../../pages/InventoryPage');
const  LoginPage  = require('../../pages/LoginPage');
const CartPage  = require('../../pages/CartPage');
const users = require('../data/users.json');

test.describe('Cart Page', () => {
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.goTo();
        await loginPage.login(users.standard.username, users.standard.password);  
    });

    test('@cart User can adds two items to the cart', async ({ page }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.goToCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        const cartCount = await cartPage.getCartItemsCount();
        expect(cartCount).toBe(2);
        
    });

    test('@cart User can remove items from the cart', async () => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.removeItem('Sauce Labs Backpack');
        const cartCount = await cartPage.getCartItemsCount();
        expect(cartCount).toBe(0);
    });

    test('@cart User can continue shopping from the cart page', async ({ page }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.continueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('@cart User can proceed to checkout from the cart page', async ({ page }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await cartPage.checkout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('@cart User can verify that the correct items are in the cart', async ({ page }) => {
        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.goToCart();
        const isBackpackInCart = await cartPage.verifyItemInCart('Sauce Labs Backpack');
        const isBikeLightInCart = await cartPage.verifyItemInCart('Sauce Labs Bike Light');
        expect(isBackpackInCart).toBe(true);
        expect(isBikeLightInCart).toBe(true);
    });

        

        
        
});