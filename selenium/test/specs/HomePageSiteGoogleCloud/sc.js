import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import {
    YopmailHome,
    CalculatorHome,
    GoogleCloudHome,
} from '../../../pageObject_model/index.js';
(async function () {
    await YopmailHome.initBrowser();
    await YopmailHome.openPage('https://cloud.google.com/products/calculator');
    // await YopmailHome.openCalculator();
    await YopmailHome.getFrame(CalculatorHome.frameOneXpath);
    await YopmailHome.getFrame(CalculatorHome.frameTwoXpath);
    await YopmailHome.selectSection();
    await YopmailHome.fillInput('4');
    await YopmailHome.fillForm();
    // await YopmailHome.submitForm();
    // await YopmailHome.getAllField(CompletedForm);
    // await YopmailHome.addEmail();
    // await YopmailHome.openAndSwitchNewTab();
    // await YopmailHome.openPage(YopmailHome.urlYopmail);
    // await YopmailHome.openRandomEmail();
    // await YopmailHome.getEmailAdress();
    // await YopmailHome.switchTab(YopmailHome.originalWindow);
    // await YopmailHome.exitFrame();
    // await YopmailHome.getFrame(CalculatorHome.frameOneXpath);
    // await YopmailHome.getFrame(CalculatorHome.frameTwoXpath);
    // await YopmailHome.fillEmail(YopmailHome.emailContent);
    // await YopmailHome.sendEmail();
    // await YopmailHome.switchTab(YopmailHome.childWindow);
    // await YopmailHome.checkMail();
    // await YopmailHome.updateMail();
    // await YopmailHome.getFrame(YopmailHome.iframeMailXpath);
    // await YopmailHome.getTotalCost();
})();
