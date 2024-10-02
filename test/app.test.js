const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function testForm() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:5041');

    await driver.sleep(3000);
    await driver.findElement(By.name('Nome')).sendKeys('MIBR Fallen');
    
    await driver.sleep(3000);
    await driver.findElement(By.name('Email')).sendKeys('fallen.com');
    
    await driver.sleep(3000);
    await driver.findElement(By.name('Telefone')).sendKeys('123456789');

    console.log('Enviando formulário...');
    
    await driver.sleep(3000);
    await driver.findElement(By.css('form button[type="submit"]')).click();

    await driver.sleep(3000);

    await driver.wait(until.elementLocated(By.css('.erro-email')), 5000);

    let erroEmail = await driver.findElement(By.css('.erro-email')).getText();
    if (erroEmail === 'Email inválido') {
      console.log('Validação de email funcionando corretamente.');
    } else {
      console.log('Validação de email não funcionou como esperado.');
    }

    await driver.findElement(By.name('Email')).clear();
    
    await driver.sleep(3000);
    await driver.findElement(By.name('Email')).sendKeys('fallen@gmail.com');
    
    await driver.sleep(3000);
    await driver.findElement(By.css('form button[type="submit"]')).click();

    await driver.wait(until.urlContains('pagina_sucesso'), 5000);
    console.log('Formulário submetido com sucesso e página de sucesso carregada.');

  } catch (error) {
    console.error('Erro no teste:', error);
  } finally {
    await driver.quit();
  }
})();
