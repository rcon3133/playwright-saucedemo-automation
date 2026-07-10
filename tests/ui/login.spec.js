const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/LoginPage');
const users = require('../data/users.json');


test.describe('Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  test('@smoke @login valid user can login successfully', async ({ page }) => {
    const user = users.standard;
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('@login locked out user cannot login', async ({ page }) => {
    const user = users.lockedOut;
    await loginPage.login(user.username, user.password);
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });

  test('@login performance_glitch_user can login despite slower load times', async ({ page }) => {
    const user = users.performanceGlitch;
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('@login error_user can login and reach inventory page', async ({ page }) => {
    const user = users.error;
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('@login visual_user can login and reach inventory page', async ({ page }) => {
    const user = users.visual;
    await loginPage.login(user.username, user.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('@login missing username shows error message', async ({ page }) => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username is required'
    );
  });

  test('@login missing password shows error message', async ({ page }) => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Password is required'
    );
  });

  test('@login invalid credentials shows error message', async ({ page }) => {
    await loginPage.login('invalid_user', 'invalid_password');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });
});
