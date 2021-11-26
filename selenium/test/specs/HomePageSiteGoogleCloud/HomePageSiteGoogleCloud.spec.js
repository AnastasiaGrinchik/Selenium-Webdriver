import '@babel/polyfill';
import chai from 'chai';
import { expect } from 'chai';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import {
    CompletedForm,
    YopmailHome,
    CalculatorHome,
    GoogleCloudHome,
} from '../../../pageObject_model/index.js';

describe('Data previously entered in the field', function () {
    before(async function () {
        await YopmailHome.initBrowser();
        await YopmailHome.openPage(GoogleCloudHome.urlGoogleCloudHome);
        await YopmailHome.openCalculator();
        await YopmailHome.getFrame(CalculatorHome.frameOneXpath);
        await YopmailHome.getFrame(CalculatorHome.frameTwoXpath);
        await YopmailHome.selectSection();
        await YopmailHome.fillInput('4');
        await YopmailHome.fillForm();
        await YopmailHome.submitForm();
        await YopmailHome.getAllField(CompletedForm);
        await YopmailHome.addEmail();
        await YopmailHome.openAndSwitchNewTab();
        await YopmailHome.openPage(YopmailHome.urlYopmail);
        await YopmailHome.openRandomEmail();
        await YopmailHome.getEmailAdress();
        await YopmailHome.switchTab(YopmailHome.originalWindow);
        await YopmailHome.exitFrame();
        await YopmailHome.getFrame(CalculatorHome.frameOneXpath);
        await YopmailHome.getFrame(CalculatorHome.frameTwoXpath);
        await YopmailHome.fillEmail(YopmailHome.emailContent);
        await YopmailHome.sendEmail();
        await YopmailHome.switchTab(YopmailHome.childWindow);
        await YopmailHome.checkMail();
        await YopmailHome.updateMail();
        await YopmailHome.getFrame(YopmailHome.iframeMailXpath);
        await YopmailHome.getTotalCost();
    });
    after(async function () {
        await YopmailHome.closeBrowser();
    });

    it('VM Class - coincided', function () {
        expect(CompletedForm.VMClass).to.include('regular');
    });
    it('Instance type - coincided', function () {
        expect(CompletedForm.instanceType).to.include('n1-standard-8');
    });
    it('Region - coincided', function () {
        expect(CompletedForm.region).to.include('Frankfurt');
    });
    it('Local SSD - coincided', function () {
        expect(CompletedForm.localSSD).to.include('2x375 GiB');
    });
    it('Сommitment term - coincided', function () {
        expect(CompletedForm.term).to.include('1 Year');
    });
    it('The rental price corresponds ', function () {
        expect(CompletedForm.price).to.include('USD 1,084.69');
    });
    it('The rental price is the same as the price in the email', function () {
        expect(CompletedForm.price).to.include(YopmailHome.totalMonthCost);
    });
});
