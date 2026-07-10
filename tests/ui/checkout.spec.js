const {test, expect} = require('@playwright/test');
const InventoryPage  = require('../../pages/InventoryPage');
const LoginPage  = require('../../pages/LoginPage');
const CartPage  = require('../../pages/CartPage');
const CheckoutPage  = require('../../pages/CheckoutPage');
const users = require('../data/users.json');

test.describe('CheckoutPage', () => {
    let inventoryPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);    
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goTo();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.goToCart();
        const cartCount = await cartPage.getCartItemsCount();
        expect(cartCount).toBe(2);
        await cartPage.checkout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    });

    test('@Checkout User can complete the checkout process', async ({ page }) => {

        await expect(checkoutPage.getCheckoutOverviewTitle()).toHaveText('Checkout: Your Information');
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
    });

    test('@Checkout User can cancel the checkout process and return to the cart page', async ({ page }) => {

        await expect(checkoutPage.getCheckoutOverviewTitle()).toHaveText('Checkout: Your Information');
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickCancel();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
});
