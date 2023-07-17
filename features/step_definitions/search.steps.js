const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { bookingSomeChairs, successBooking } = require("../../lib/commands.js");
const { clickElement } = require("../../lib/util.js");

let day = ".page-nav > a:nth-child(3)";
let time = "a.movie-seances__time";
let button = "button.acceptin-button";

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("Пользователь находится на странице {string}", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 20000,
  });
});

When("Пользователь бронирует 1 место в зале", async function () {
  await bookingSomeChairs(this.page, day, time, button, "chair 2");
});

When("Пользователь бронирует 2 места в зале", async function () {
  await bookingSomeChairs(this.page, day, time, button, "chair 7", "chair 8");
});

When("Пользователь бронирует 1 место в зале дважды", async function () {
  await bookingSomeChairs(this.page, day, time, button, "chair 3");
  await successBooking(
    this.page,
    "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
  );
  await this.page.goto("http://qamid.tmweb.ru/client/index.php");
  await clickElement(this.page, day);
  await clickElement(this.page, time);
  await clickElement(this.page, "chair 2");
});

Then("Пользователь получил qr-code", async function () {
  await successBooking(
    this.page,
    "После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал."
  );
});

Then(
  "Пользователь не может забронировать уже забронированное место",
  async function () {
    const actual = await this.page.$eval("button", (button) => {
      return button.disabled;
    });
    expect(actual).to.be.true;
  }
);