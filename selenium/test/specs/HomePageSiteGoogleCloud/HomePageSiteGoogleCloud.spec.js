import '@babel/polyfill';
import chai from 'chai';
import { expect } from 'chai';
import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import {
    CompletedForm,
    YopmailPage,
    CalculatorPage,
    HomePageGoogleCloud,
} from '../../../pageObject_model/index.js';

describe('Data previously entered in the field', function () {
    before(async function () {
        await YopmailPage.initAndOpenBrowser();
        await YopmailPage.openPage(HomePageGoogleCloud.urlHomeGoogleCloud);
        await YopmailPage.openCalculator();

        await YopmailPage.getFrame(
            CalculatorPage.frame1,
            CalculatorPage.frameOneXpath
        );

        await YopmailPage.getFrame(
            CalculatorPage.frame2,
            CalculatorPage.frameTwoXpath
        );

        await YopmailPage.selectSection();

        await YopmailPage.fillInput(CalculatorPage.inputNumberInstancesData);

        await YopmailPage.fillSelect(
            CalculatorPage.selectOperatingSystemXpath,
            CalculatorPage.selectOperatingSystem,
            CalculatorPage.operatingSystemList,
            CalculatorPage.operatingSystemListXpath,
            CalculatorPage.operatingSystemItem,
            CalculatorPage.operatingSystemItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.machineClassSelectXpath,
            CalculatorPage.machineClassSelect,
            CalculatorPage.machineClassList,
            CalculatorPage.machineClassListXpath,
            CalculatorPage.machineClassItem,
            CalculatorPage.machineClassItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.seriesSelectXpath,
            CalculatorPage.seriesSelectX,
            CalculatorPage.seriesList,
            CalculatorPage.seriesListXpath,
            CalculatorPage.seriesItem,
            CalculatorPage.seriesItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.machineTypeSelectXpath,
            CalculatorPage.machineTypeSelect,
            CalculatorPage.machineTypeList,
            CalculatorPage.machineTypeListXpath,
            CalculatorPage.machineTypeItem,
            CalculatorPage.machineTypeItemXpath
        );

        await YopmailPage.addCheckbox(
            CalculatorPage.checkbox,
            CalculatorPage.checkboxXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.GruTypeSelectXpath,
            CalculatorPage.numberGrusSelect,
            CalculatorPage.GruTypeList,
            CalculatorPage.GruTypeListXpath,
            CalculatorPage.GruTypeItem,
            CalculatorPage.GruTypeItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.numberGrusSelectXpath,
            CalculatorPage.numberGrusSelect,
            CalculatorPage.numberGrusList,
            CalculatorPage.numberGrusListXpath,
            CalculatorPage.numberGrusItem,
            CalculatorPage.numberGrusItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.localSsdSelectXpath,
            CalculatorPage.localSsdSelect,
            CalculatorPage.localSsdList,
            CalculatorPage.localSsdListXpath,
            CalculatorPage.localSsdItem,
            CalculatorPage.localSsdItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.datacenterSelectXpath,
            CalculatorPage.datacenterSelect,
            CalculatorPage.datacenterList,
            CalculatorPage.datacenterListXpath,
            CalculatorPage.datacenterItem,
            CalculatorPage.datacenterItemXpath
        );

        await YopmailPage.fillSelect(
            CalculatorPage.committedUsageSelectXpath,
            CalculatorPage.committedUsageSelect,
            CalculatorPage.committedUsageList,
            CalculatorPage.committedUsageListXpath,
            CalculatorPage.committedUsageItem,
            CalculatorPage.committedUsageItemXpath
        );

        await YopmailPage.submitForm();

        await YopmailPage.getTextFromForm(
            CompletedForm.VMClassXpath,
            async function (text) {
                CompletedForm.VMClassText = await text;
            }
        );

        await YopmailPage.getTextFromForm(
            CompletedForm.instanceTypeXpath,
            async function (text) {
                CompletedForm.instanceText = await text;
            }
        );

        await YopmailPage.getTextFromForm(
            CompletedForm.localSsdXpath,
            async function (text) {
                CompletedForm.localSsdText = await text;
            }
        );

        await YopmailPage.getTextFromForm(
            CompletedForm.regionXpath,
            async function (text) {
                CompletedForm.regionText = await text;
            }
        );

        await YopmailPage.getTextFromForm(
            CompletedForm.termXpath,
            async function (text) {
                CompletedForm.termText = await text;
            }
        );

        await YopmailPage.getTextFromForm(
            CompletedForm.priceXpath,
            async function (text) {
                CompletedForm.priceText = await text;
            }
        );

        await YopmailPage.addEmail();

        await YopmailPage.openAndSwitchNewTab();
        await YopmailPage.openPage(YopmailPage.urlYopmail);
        await YopmailPage.openRandomEmail();
        await YopmailPage.getEmailAdress();
        await YopmailPage.switchTab(YopmailPage.originalWindow);

        await YopmailPage.exitFrame();
        await YopmailPage.getFrame(
            CalculatorPage.frame1,
            CalculatorPage.frameOneXpath
        );
        await YopmailPage.getFrame(
            CalculatorPage.frame2,
            CalculatorPage.frameTwoXpath
        );

        await console.log(YopmailPage.emailContent);

        await YopmailPage.fillEmail(YopmailPage.emailContent);

        await YopmailPage.sendEmail();

        await YopmailPage.switchTab(YopmailPage.childWindow);
        await YopmailPage.checkMail();
        await YopmailPage.updateMail();
        await YopmailPage.getFrame(
            YopmailPage.iframeMail,
            YopmailPage.iframeMailXpath
        );
        await YopmailPage.getTotalCost();
    });
    after(async function () {
        await YopmailPage.closeBrowser();
    });

    it('VM Class - coincided', function () {
        expect(CompletedForm.VMClassText).to.include('regular');
    });
    it('Instance type - coincided', function () {
        expect(CompletedForm.instanceText).to.include('n1-standard-8');
    });
    it('Region - coincided', function () {
        expect(CompletedForm.regionText).to.include('Frankfurt');
    });
    it('Дocal SSD - coincided', function () {
        expect(CompletedForm.localSsdText).to.include('2x375 GiB');
    });
    it('Сommitment term - coincided', function () {
        expect(CompletedForm.termText).to.include('1 Year');
    });
    it('The rental price corresponds ', function () {
        expect(CompletedForm.priceText).to.include('USD 1,084.69');
    });
    it('The rental price is the same as the price in the email ', function () {
        expect(CompletedForm.priceText).to.include(YopmailPage.totalMonthCost);
    });
});
