module.exports = {
  generateName: function (length) {
    let name = ""; 
    let chars = "abcdefgABCDEFG1234567890"; 
    let charLength = chars.length; 
    for (let i = 0; i < length; i++) {
      name += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return name;
  },

  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },
};