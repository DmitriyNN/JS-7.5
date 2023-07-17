const { clickElement, getText } = require("./util.js");
const chai = require("chai");
const expect = chai.expect;

module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }},
  bookingSomeChairs: async function (
    page,
    day,
    time,
    button,
    ...chairSelector
  ) {
    await clickElement(page, day);
    await clickElement(page, time);
    for (let i = 0; i < chairSelector.length; i++) {
      await clickElement(
        page,
        `.buying-scheme__row > span:nth-child(${chairSelector[i]
          .split(" ")
          .pop()})`
      );
    }
    await clickElement(page, button);
  },
  successBooking: async function (page, text) {
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).contain(text);
  },
 
  };