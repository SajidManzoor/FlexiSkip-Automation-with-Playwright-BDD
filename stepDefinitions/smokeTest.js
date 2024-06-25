import { createBdd } from 'playwright-bdd';
import { test } from '@playwright/test'
import { Login } from '../pages/login'
import { Dashboard } from '../pages/dashboard'
import { Portals } from '../pages/portals'
import { Order } from '../pages/order'
import { Checkout } from '../pages/checkout'
import { FAQ } from '../pages/FAQ'
const ExcelJS = require('exceljs');

const { Given, When, Then } = createBdd();

let page;
let login;
let dashboard;
let portals;
let order;
let checkout;
let faq;
let workbook;
let dataSheet;
let cardDetailsSheet;
let testData = {};
let cardDetails = {};

Given('a new page is created', async ({ browser }) => {
  page = await browser.newPage();
  login = new Login(page)
  dashboard = new Dashboard(page)
  portals = new Portals(page)
  order = new Order(page)
  checkout = new Checkout(page)
  faq = new FAQ(page)
});

Given('the Excel file {string} is read', async ({ }, arg) => {
  workbook = await new ExcelJS.Workbook().xlsx.readFile('data.xlsx');
});

Given('the test data is extracted from {string} sheet', async ({ }, arg) => {
  dataSheet = workbook.getWorksheet('SmokeTests');
  dataSheet.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      testData[row.values[1]] = row.values[2];
    }
  })
});

Given('the card details are extracted from {string} sheet', async ({ }, arg) => {
  // ...
  cardDetailsSheet = workbook.getWorksheet('CardDetails');
  cardDetailsSheet.eachRow(function (row, rowNumber) {
    if (rowNumber > 1) {
      cardDetails[row.values[1]] = row.values[2];
    }
  })
});
// Scenario: Login
Given('the user is on the login page', async ({ }) => {
  await login.goto()
});

When('the user logs in with the email address and API key from the test data the user should be logged in successfully', async ({ }) => {
  await login.login(testData.emailAddress, testData.apiKey)
});


// Scenario: Create Order
Given('the user is logged in', async ({ }) => {
  console.log('Verify login successful')
});

When('the user selects the portal from the test data', async ({ }) => {
  await dashboard.selectPortal(testData.portalName)
});

When('the user clicks on eligibility', async ({ }) => {
  await portals.clickEligibility()
});

When('the user searches for the address from the test data', async ({ }) => {
  await order.searchAddress(testData.address)
});

When('the user selects the first option', async ({ }) => {
  await order.selectFirstOption()
});

When('the user clicks on checkout', async ({ }) => {
  await order.clickCheckout()
});

When('the user fills in the details from the test data', async ({ }) => {
  await checkout.fillDetails(testData.firstName, testData.lastName, testData.phoneNumber)
});

When('the user confirms the order', async ({ }) => {
  await checkout.confirmOrder()
});

When('the user fills in the Stripe details from the card details', async ({ }) => {
  await checkout.fillStripeDetails(cardDetails.cardNumber, cardDetails.cardExpiry, cardDetails['CVC'], cardDetails.billingName, cardDetails.country, cardDetails.zipCode)
});

Then('the order should be created successfully', async ({ }) => {
  console.log('Verify order created')
});

Given('the user is on the dashboard', async ({ }) => {
  console.log('Verify user is on dashboard')
});

// Scenario: FAQ page
When('the user opens the FAQ page', async ({ }) => {
  await dashboard.openFAQ()
});

Then('the FAQ page should be validated successfully', async ({ }) => {
  await faq.validateFAQ()
});

// Scenario: Sign Out
When('the user signs out', async ({ }) => {
  await dashboard.signOut()
});


