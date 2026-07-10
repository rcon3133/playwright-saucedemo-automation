const {test, expect} = require('@playwright/test');
const  InventoryPage  = require('../../pages/InventoryPage');
const  LoginPage  = require('../../pages/LoginPage');    
const  CartPage  = require('../../pages/CartPage');
const  CheckoutPage  = require('../../pages/CheckoutPage');
const CheckoutOverview = require('../../pages/CheckoutOverview');
const users = require('../data/users.json');

test.describe('Checkout Overview Page', () => {
    let loginPage;
    let inventoryPage;
    let cartPage;
    let checkoutPage;
    let checkoutOverviewPage;  

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        checkoutOverviewPage = new CheckoutOverview(page);
        await loginPage.goTo();
        await loginPage.login(users.standard.username, users.standard.password);
        await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await inventoryPage.goToCart();
        const cartCount = await cartPage.getCartItemsCount();
        expect(cartCount).toBe(2);
        await cartPage.checkout();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
        await checkoutPage.clickContinue();
        

    });


    test('@Checkout_Overview User can view the checkout overview page after filling in checkout information', async ({ page }) => {

        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await expect(checkoutOverviewPage.getCheckoutOverviewTitle()).toHaveText('Checkout: Overview');
        await expect(checkoutOverviewPage.getItemNames()).toHaveText([
            'Sauce Labs Bolt T-Shirt',
            'Sauce Labs Bike Light'
        ]);
        await expect(checkoutOverviewPage.getItemPrices()).toHaveText([
            '$15.99',
            '$9.99'
        ]); 

        await checkoutOverviewPage.clickFinish();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    
        await expect(checkoutOverviewPage.getCheckoutCompleteTitle()).toHaveText('Checkout: Complete!');
        await expect(checkoutOverviewPage.getCheckoutCompleteMessage()).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(checkoutOverviewPage.getCheckoutCompleteImage()).toBeVisible();
        await checkoutOverviewPage.clickBackHome();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        




    });
});