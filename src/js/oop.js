// Variables
let initialVal = (0.0).toPrecision(3);

let billAmount = document.querySelector("[data-bill-amount]");
billAmount.innerText = 0;

let noOfPeople = document.querySelector("[data-no-of-people]");

let customTip = document.querySelector("[data-custom-tip]");

let errorMessage = document.querySelector("[data-error-msg]");

let tipAmount = document.querySelector("[data-tip-value]");
tipAmount.innerText = (0.0).toPrecision(3);

let totalAmount = document.querySelector("[data-total-value]");
totalAmount.innerText = (0.0).toPrecision(3);

const tipSelects = document.querySelectorAll("[data-grid-button]");

const resetButton = document.querySelector("[data-reset-button]");

let formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

class TipCalculator {
  constructor(initialValue, bill, people, tip, total, custom, pickedTip) {
    this.initialValue = initialValue;
    this.bill = bill;
    this.pickedTip = pickedTip;
    this.people = people;
    this.tip = tip;
    this.total = total;
    this.custom = custom;
  }

  /**
   * @param {(arg0: any) => void} billAmount
   */
  set setBillAmount(billAmount) {
    if (typeof parseInt(noOfPeople) === NaN) return;
    this.bill += billAmount;
    if (billAmount.length - 1 === true) {
      this.bill.slice(0, this.bill.length - 1);
    }
  }

  /**
   * @param {(arg0: any) => void} noOfPeople
   */
  set setNoOfPeople(noOfPeople) {
    if (typeof parseInt(noOfPeople) === NaN) return;
    this.people += noOfPeople;
  }

  /**
   * @param {any} customTipValue
   */
  set setCustomTip(customTipValue) {
    this.pickedTip ? this.pickedTip === "" : (this.pickedTip = customTipValue);
    this.custom = customTipValue;
  }

  get calculateTipAmount() {
    this.amount = this.bill / this.people;
    this.setTipAmount(
      (this.tip = (Math.round(this.amount) * 100) / 100).toPrecision(3) *
        this.pickedTip
    );
    this.setTotalAmount((this.total = this.amount).toPrecision(3));
  }

  setTipAmount(tipAmount) {
    this.tip = tipAmount;
  }

  setTotalAmount(totalAmount) {
    this.total = totalAmount;
  }

  setSelect(selectedButton) {
    this.pickedTip = selectedButton;
  }

  setDisabled() {
    billAmount.value.length <= 0 && noOfPeople.value.length <= 0
      ? (resetButton.disabled = true)
      : (resetButton.disabled = false);
  }

  pickSelect(select) {
    if (select.innerText.length > 2) {
      this.setSelect(select.innerText.slice(0, 2));
    } else {
      this.setSelect(select.innerText.slice(0, 1));
    }
    console.log(this.pickedTip);
  }

  displayResults() {
    tipAmount.innerText = this.tip;
    totalAmount.innerText = this.total;
  }
}

const CalculatorApp = new TipCalculator(
  initialVal,
  billAmount.value,
  noOfPeople.value,
  tipAmount.innerText,
  totalAmount.innerText,
  customTip.value
);

let inputs = [CalculatorApp.bill, CalculatorApp.custom, CalculatorApp.people];
let texts = [CalculatorApp.total, CalculatorApp.tip];

// Pure Functions
const resetInputAndText = (inputs, texts) => {
  inputs.forEach((value) => (value.value !== "" ? value.value === "" : null));
  texts.forEach((text) =>
    text.innerText !== "" ? text.innerText === initialVal : null
  );
};

const determineCustomTip = () => {
  if (customTip.value > 100) return;
  CalculatorApp.pickedTip = customTip.value;
};

billAmount.addEventListener("input", (e) => {
  if (e.target.value.includes(e.target.value)) {
    CalculatorApp.setBillAmount = e.target.value.slice(
      e.target.value.length - 1
    );
  }
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
  billAmount.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
      CalculatorApp.bill = e.target.value.substr(0, e.target.value.length);
    }
  });
});

noOfPeople.addEventListener("input", (e) => {
  if (e.target.value.includes(e.target.value)) {
    CalculatorApp.setNoOfPeople = e.target.value.slice(
      e.target.value.length - 1
    );
  }
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
  noOfPeople.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
      CalculatorApp.people = e.target.value.substr(0, e.target.value.length);
    }
  });
});

tipSelects.forEach((select) => {
  select.addEventListener("click", () => {
    CalculatorApp.pickSelect(select);
  });
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

customTip.addEventListener("input", determineCustomTip);

resetButton.addEventListener("click", () => {
  billAmount.value = "";
  noOfPeople.value = "";
  tipAmount.innerText = initialVal;
  totalAmount.innerText = initialVal;
  CalculatorApp.pickedTip = "";
  customTip.value = "";
});
