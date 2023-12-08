import {By, Key, until, WebDriver, Builder} from 'selenium-webdriver';
import 'selenium-webdriver/chrome';
import moment from 'moment';

let driver: WebDriver = new Builder()
    .forBrowser('chrome')
    .build();

async function testAddFunction() {
    let stringPromise;
    try {
        // Step 1: Open the page.
        await driver.get('https://computer-database.gatling.io/computers');
        await driver.manage().window().maximize();

        // Step 2: Click on add button.
        await driver.wait(until.elementLocated(By.id('add')), 5000)
            .click();
        console.log('Click on add Button');

        // Step 3: Fill in the form and click on Create button
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        console.log('Create date');
        await driver.wait(until.elementLocated(By.id('name')), 5000)
            .sendKeys('Ulk');
        await driver.wait(until.elementLocated(By.id('introduced')), 5000)
            .sendKeys((moment(new Date())).format('YYYY-MM-DD'));
        await driver.wait(until.elementLocated(By.id('discontinued')), 5000)
            .sendKeys((moment(tomorrow)).format('YYYY-MM-DD'));
        await driver.wait(until.elementLocated(By.id('company')), 5000)
            .click()
        await driver.wait(until.elementLocated(By.xpath('//option[text()=\'Nokia\']')), 5000)
            .click();
        await driver.wait(until.elementLocated(By.xpath('//input[@type=\'submit\']')), 5000)
            .click();
        console.log('Click on submit Button');

        // Step 4: Verify success message
        var message = await driver.wait(until.elementLocated(By.className('alert-message')), 5000)
            .getText();
        if (!message.includes('Computer Ulk has been created')) throw new Error("No success message")
        else console.log('\'Computer Ulk has been created\' Message has appeared');

        // Step 5: Set the computer name into search field and click on filter button.
        await driver.wait(until.elementLocated(By.id('searchbox')), 5000)
            .sendKeys('ARRA');
        await driver.wait(until.elementLocated(By.id('searchsubmit')), 5000)
            .click();
        console.log('Click on filter Button');

        // Step 6: Verify filter results
        var message2 = await driver.wait(until.elementLocated(By.xpath('//a[text()=\'ARRA\']')), 5000)
            .getText();
        if (!message2.includes('ARRA')) throw new Error("No such computer as \'ARRA\' was found")
        else console.log('Computer \'ARRA\' was found');

        // Step 7: Set the computer name \'Ulk\' into search field and click on filter button.
        await driver.wait(until.elementLocated(By.id('searchbox')), 5000)
            .clear();
        await driver.wait(until.elementLocated(By.id('searchbox')), 5000)
            .sendKeys('Ulk');
        await driver.wait(until.elementLocated(By.id('searchsubmit')), 5000)
            .click();
        console.log('Click on filter Button');

        // Step 8: Verify filter results
        var message3 = await driver.wait(until.elementLocated(By.xpath('//a[text()=\'Ulk\']')))
            .getText();
        if (!message3.includes('Ulk')) throw new Error("No such computer as \'Ulk\' was found")
        else console.log('Computer \'Ulk\' was found');
    } finally {
        //await driver.quit();
    }
}

testAddFunction();
