const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');

describe('React App Selenium Tests', function() {
    let driver;
    const APP_URL = 'http://localhost:3000';

    // Set up Chrome driver before running tests
    before(async function() {
        this.timeout(30000);
        const options = new chrome.Options();
        options.addArguments('--headless');
        options.addArguments('--no-sandbox');
        options.addArguments('--disable-dev-shm-usage');
        options.addArguments('--disable-gpu');
        
        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    });

    // Close browser after all tests
    after(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    describe('Page Load Tests', function() {
        it('should load the application successfully', async function() {
            await driver.get(APP_URL);
            const title = await driver.getTitle();
            expect(title).to.equal('React App');
        });

        it('should display the main title', async function() {
            await driver.get(APP_URL);
            const mainTitle = await driver.wait(
                until.elementLocated(By.id('main-title')),
                10000
            );
            const titleText = await mainTitle.getText();
            expect(titleText).to.equal('React Selenium Testing Demo');
        });
    });

    describe('Counter Functionality Tests', function() {
        beforeEach(async function() {
            await driver.get(APP_URL);
            await driver.wait(until.elementLocated(By.id('counter-value')), 10000);
        });

        it('should display initial counter value as 0', async function() {
            const counter = await driver.findElement(By.id('counter-value'));
            const counterText = await counter.getText();
            expect(counterText).to.equal('Count: 0');
        });

        it('should increment counter when increment button is clicked', async function() {
            const incrementBtn = await driver.findElement(By.id('increment-btn'));
            await incrementBtn.click();
            await driver.sleep(500); // Wait for state update
            
            const counter = await driver.findElement(By.id('counter-value'));
            const counterText = await counter.getText();
            expect(counterText).to.equal('Count: 1');
        });

        it('should decrement counter when decrement button is clicked', async function() {
            const decrementBtn = await driver.findElement(By.id('decrement-btn'));
            await decrementBtn.click();
            await driver.sleep(500); // Wait for state update
            
            const counter = await driver.findElement(By.id('counter-value'));
            const counterText = await counter.getText();
            expect(counterText).to.equal('Count: -1');
        });

        it('should reset counter to 0 when reset button is clicked', async function() {
            // First increment a few times
            const incrementBtn = await driver.findElement(By.id('increment-btn'));
            await incrementBtn.click();
            await incrementBtn.click();
            await incrementBtn.click();
            await driver.sleep(500);
            
            // Then reset
            const resetBtn = await driver.findElement(By.id('reset-btn'));
            await resetBtn.click();
            await driver.sleep(500);
            
            const counter = await driver.findElement(By.id('counter-value'));
            const counterText = await counter.getText();
            expect(counterText).to.equal('Count: 0');
        });

        it('should handle multiple increment operations correctly', async function() {
            const incrementBtn = await driver.findElement(By.id('increment-btn'));
            
            // Click increment 5 times
            for (let i = 0; i < 5; i++) {
                await incrementBtn.click();
                await driver.sleep(100);
            }
            
            const counter = await driver.findElement(By.id('counter-value'));
            const counterText = await counter.getText();
            expect(counterText).to.equal('Count: 5');
        });
    });

    describe('Form Functionality Tests', function() {
        beforeEach(async function() {
            await driver.get(APP_URL);
            await driver.wait(until.elementLocated(By.id('name-input')), 10000);
        });

        it('should display name input field', async function() {
            const nameInput = await driver.findElement(By.id('name-input'));
            const isDisplayed = await nameInput.isDisplayed();
            expect(isDisplayed).to.be.true;
        });

        it('should accept text input in the name field', async function() {
            const nameInput = await driver.findElement(By.id('name-input'));
            await nameInput.sendKeys('John Doe');
            
            const inputValue = await nameInput.getAttribute('value');
            expect(inputValue).to.equal('John Doe');
        });

        it('should display greeting message after form submission', async function() {
            const nameInput = await driver.findElement(By.id('name-input'));
            const submitBtn = await driver.findElement(By.id('submit-btn'));
            
            await nameInput.sendKeys('Alice');
            await submitBtn.click();
            await driver.sleep(500);
            
            const greetingMessage = await driver.wait(
                until.elementLocated(By.id('greeting-message')),
                5000
            );
            const messageText = await greetingMessage.getText();
            expect(messageText).to.equal('Hello, Alice!');
        });

        it('should update greeting message with different names', async function() {
            const nameInput = await driver.findElement(By.id('name-input'));
            const submitBtn = await driver.findElement(By.id('submit-btn'));
            
            // First submission
            await nameInput.sendKeys('Bob');
            await submitBtn.click();
            await driver.sleep(500);
            
            let greetingMessage = await driver.findElement(By.id('greeting-message'));
            let messageText = await greetingMessage.getText();
            expect(messageText).to.equal('Hello, Bob!');
            
            // Clear and submit again
            await nameInput.clear();
            await nameInput.sendKeys('Charlie');
            await submitBtn.click();
            await driver.sleep(500);
            
            greetingMessage = await driver.findElement(By.id('greeting-message'));
            messageText = await greetingMessage.getText();
            expect(messageText).to.equal('Hello, Charlie!');
        });
    });

    describe('UI Element Verification Tests', function() {
        beforeEach(async function() {
            await driver.get(APP_URL);
        });

        it('should have all required buttons visible', async function() {
            const incrementBtn = await driver.findElement(By.id('increment-btn'));
            const decrementBtn = await driver.findElement(By.id('decrement-btn'));
            const resetBtn = await driver.findElement(By.id('reset-btn'));
            const submitBtn = await driver.findElement(By.id('submit-btn'));
            
            expect(await incrementBtn.isDisplayed()).to.be.true;
            expect(await decrementBtn.isDisplayed()).to.be.true;
            expect(await resetBtn.isDisplayed()).to.be.true;
            expect(await submitBtn.isDisplayed()).to.be.true;
        });

        it('should have correct button text', async function() {
            const incrementBtn = await driver.findElement(By.id('increment-btn'));
            const decrementBtn = await driver.findElement(By.id('decrement-btn'));
            const resetBtn = await driver.findElement(By.id('reset-btn'));
            const submitBtn = await driver.findElement(By.id('submit-btn'));
            
            expect(await incrementBtn.getText()).to.equal('Increment');
            expect(await decrementBtn.getText()).to.equal('Decrement');
            expect(await resetBtn.getText()).to.equal('Reset');
            expect(await submitBtn.getText()).to.equal('Submit');
        });

        it('should have proper input placeholder text', async function() {
            const nameInput = await driver.findElement(By.id('name-input'));
            const placeholder = await nameInput.getAttribute('placeholder');
            expect(placeholder).to.equal('Enter your name');
        });
    });
});

