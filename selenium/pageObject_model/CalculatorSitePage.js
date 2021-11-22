import pkg from 'selenium-webdriver';
const { Builder, Browser, By, until, wait } = pkg;
import { HomePageSiteGoogleCloud } from './HomePageSiteGoogleCloud.js';

export class CalculatorSitePage extends HomePageSiteGoogleCloud {
    constructor(driver) {
        super(driver);
        this.urlCalculatorPage = 'https://cloud.google.com/products/calculator';
        this.frameOneXpath = '//*[@id="cloud-site"]/devsite-iframe/iframe';
        this.frameTwoXpath = '//*[@id="myFrame"]';
        this.checkedModeXpath = './/div[@title="Compute Engine"]';
        this.formComputeEngineXpath = '//form[@name="ComputeEngineForm"]';
        this.inputNumberInstancesXpath = '//input[@name="quantity"]';
        this.selectOperatingSystemXpath =
            '//*[@id="select_value_label_67"]/span[1]/div';
        this.operatingSystemListXpath = '//div[@id="select_container_89"]';
        this.operatingSystemItemXpath = '//*[@id="select_option_77"]/div';
        this.machineClassSelectXpath =
            '//*[@id="select_value_label_68"]/span[1]/div';
        this.machineClassListXpath = '//*[@id="select_container_93"]';
        this.machineClassItemXpath = '//*[@id="select_option_90"]/div';
        this.seriesSelectXpath = '//*[@id="select_value_label_70"]/span[1]/div';
        this.seriesListXpath = '//*[@id="select_container_101"]';
        this.seriesItemXpath = '//*[@id="select_option_215"]/div';
        this.machineTypeSelectXpath =
            '//*[@id="select_value_label_71"]/span[1]/div';
        this.machineTypeListXpath = '//*[@id="select_container_103"]';
        this.machineTypeItemXpath = '//*[@id="select_option_418"]/div[1]';
        this.checkboxXpath =
            '//*[@aria-label="Add GPUs"]/div[@class="md-container md-ink-ripple"]';
        this.numberGrusSelectXpath = '//*[@id="select_value_label_450"]';
        this.numberGrusListXpath = '//*[@id="select_container_454"]';
        this.numberGrusItemXpath = '//*[@id="select_option_462"]/div[1]';
        this.GruTypeSelectXpath = '//*[@aria-label="GPU type"]';
        this.GruTypeListXpath = '//*[@id="select_container_452"]';
        this.GruTypeItemXpath = '//*[@value="NVIDIA_TESLA_V100"]';
        this.localSsdSelectXpath =
            '//*[@id="select_value_label_412"]/span[1]/div';
        this.localSsdListXpath = '//*[@id="select_container_414"]';
        this.localSsdItemXpath = '//*[@id="select_option_439"]/div[1]';
        this.datacenterSelectXpath =
            '//*[@id="select_value_label_73"]/span[1]/div';
        this.datacenterListXpath = '//*[@id="select_container_109"]';
        this.datacenterItemXpath = '//*[@id="select_option_236"]/div[1]';
        this.committedUsageSelectXpath =
            '//*[@id="select_value_label_74"]/span[1]/div';
        this.committedUsageListXpath = '//*[@id="select_container_116"]';
        this.committedUsageItemXpath = '//*[@id="select_option_113"]/div[1]';
        this.buttonAddToEstimateXpath =
            '//button[@aria-label="Add to Estimate"]';
        this.formComputeEngine = null;
        this.checkedMode = null;
        this.inputNumberInstances = null;
        this.selectOperatingSystem = null;
        this.operatingSystemList = null;
        this.operatingSystemItem = null;
        this.seriesSelect = null;
        this.seriesList = null;
        this.seriesItem = null;
        this.machineTypeSelect = null;
        this.machineTypeItem = null;
        this.machineTypeItem = null;
        this.checkbox = null;
        this.numberGrusSelect = null;
        this.numberGrusList = null;
        this.numberGrusItem = null;
        this.GruTypeSelect = null;
        this.GruTypeList = null;
        this.GruTypeItem = null;
        this.localSsdSelect = null;
        this.localSsdList = null;
        this.localSsdItem = null;
        this.datacenterSelect = null;
        this.datacenterList = null;
        this.datacenterItem = null;
        this.committedUsageSelect = null;
        this.committedUsageList = null;
        this.committedUsageItem = null;
        this.buttonAddToEstimate = null;
        this.machineClassSelect = null;
        this.machineClassList = null;
        this.machineClassItem = null;
        this.inputNumberInstancesData = 4;
    }

    async getFrame(frame, frameXpath) {
        frame = await this.driver.wait(
            until.elementLocated(By.xpath(frameXpath)),
            20000
        );
        await this.driver.wait(until.ableToSwitchToFrame(frame), 20000);
        return this;
    }

    async exitFrame() {
        await this.driver.switchTo().defaultContent();
        return this;
    }

    async selectSection() {
        this.checkedMode = await this.driver.wait(
            until.elementLocated(By.xpath(this.checkedModeXpath)),
            20000
        );
        await this.checkedMode.click();
        return this;
    }

    async fillInput(data) {
        this.formComputeEngine = await this.driver.wait(
            until.elementLocated(By.xpath(this.formComputeEngineXpath)),
            20000
        );
        await this.driver.wait(
            until.elementLocated(By.xpath(this.inputNumberInstancesXpath))
        );
        this.inputNumberInstances = await this.formComputeEngine.findElement(
            By.xpath(this.inputNumberInstancesXpath)
        );

        await this.inputNumberInstances.sendKeys(data);
        return this;
    }

    async fillSelect(
        selectXpath,
        select,
        selectList,
        selectListXpath,
        selectItem,
        selectItemXpath
    ) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.formComputeEngineXpath)),
            20000
        );
        this.formComputeEngine = await this.driver.findElement(
            By.xpath(this.formComputeEngineXpath)
        );
        await this.driver.wait(
            until.elementLocated(By.xpath(selectXpath)),
            20000
        );
        select = await this.formComputeEngine.findElement(
            By.xpath(selectXpath)
        );
        await select.click();

        await this.driver.wait(
            until.elementLocated(By.xpath(selectListXpath)),
            20000
        );
        selectList = await this.formComputeEngine.findElement(
            By.xpath(selectListXpath)
        );
        await this.driver.wait(
            until.elementLocated(By.xpath(selectItemXpath)),
            20000
        );
        selectItem = await selectList.findElement(By.xpath(selectItemXpath));
        await this.driver.wait(until.elementIsVisible(selectItem), 20000);
        await selectItem.click();
        this.selectItemText = await selectItem.getAttribute('innerText');
        return this;
    }

    async addCheckbox(checkbox, checkboxXpath) {
        await this.driver.wait(
            until.elementLocated(By.xpath(this.formComputeEngineXpath)),
            20000
        );
        this.formComputeEngine = await this.driver.findElement(
            By.xpath(this.formComputeEngineXpath)
        );
        await this.driver.wait(
            until.elementLocated(By.xpath(checkboxXpath)),
            2000
        );
        checkbox = await this.formComputeEngine.findElement(
            By.xpath(checkboxXpath)
        );
        await checkbox.click();
        return this;
    }

    async submitForm() {
        this.buttonAddToEstimate = await this.driver.wait(
            until.elementLocated(By.xpath(this.buttonAddToEstimateXpath)),
            20000
        );
        await this.buttonAddToEstimate.click();
        return this;
    }
}
export let CalculatorPage = new CalculatorSitePage('chrome');
