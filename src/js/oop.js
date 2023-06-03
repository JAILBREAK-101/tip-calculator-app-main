// Variables
let billAmount = document
  .querySelector("[data-bill-amount]")
  .value.toPrecision(3);

let noOfPeople = document.querySelector("[data-no-of-people]");

let errorMessage = document.querySelector("[data-error-msg]");

let tipAmount = (document.querySelector("[data-tip-value]").innerText =
  (0.0).toPrecision(3));

let totalAmount = (document.querySelector("[data-total-value]").innerText =
  (0.0).toPrecision(3));

const tipSelects = document.querySelectorAll("[data-grid-button]");

const resetButton = document.querySelector("[data-reset-button]");

let selectedButtonValue;

class TipCalculator {
  constructor(billAmount, tipAmount) {
    billAmount = billAmount;
    tipAmount = tipAmount;
  }
}
