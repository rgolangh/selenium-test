var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var firefox = require('selenium-webdriver/firefox');

var binary = new firefox.Binary(firefox.Channel.NIGHTLY);
    binary.addArguments("-headless");

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().setBinary(binary))
    .build();

driver.get('http://localhost:8080/ovirt-engine/webadmin');
driver.findElement(By.id('username')).sendKeys('admin');
driver.findElement(By.name('password')).sendKeys('123');

driver.findElement(By.className('btn-primary')).click();

driver.sleep(10000).then(function() {
    driver.getTitle().then(function(title) {
        if(title === 'oVirt Open Virtualization Manager') {
            console.log('Test passed');
        } else {
            console.log('Test failed with title' + title);
        }
    });
});

driver.quit();