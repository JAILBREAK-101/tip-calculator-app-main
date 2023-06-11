// Variables
let initialVal = (0.0).toPrecision(3);

let billAmount = document.querySelector("[data-bill-amount]");

let noOfPeople = document.querySelector("[data-no-of-people]");

let customTip = document.querySelector("[data-custom-tip]");

let errorMessage = document.querySelector("[data-error-msg]");

let tipAmount = document.querySelector("[data-tip-value]");
tipAmount.innerText = initialVal;

let totalAmount = document.querySelector("[data-total-value]");
totalAmount.innerText = initialVal;

const tipSelects = document.querySelectorAll("[data-grid-button]");

const resetButton = document.querySelector("[data-reset-button]");
// resetButton.disabled = true;

class TipCalculator {
  constructor(initialValue, bill, people, tip, total, custom) {
    this.initialValue = initialValue;
    this.bill = bill;
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

  get calculateTipAmount() {
    this.setTipAmount(
      (this.tip =
        (eval(this.bill / this.people) / 100) * this.selectedTip).toPrecision(4)
    );
  }

  setTipAmount(tipAmount) {
    this.tip = tipAmount;
  }

  setTotalAmount(totalAmount) {
    this.total = totalAmount;
  }

  setSelect(selectedButton) {
    this.selectedTip = selectedButton;
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
    console.log(this.selectedTip);
  }

  extractTip(tipValue) {
    let slicedTipValue;
    if (tipValue.innerText.length > 2) {
      slicedTipValue = tipValue.innerText.slice(0, 2);
    } else {
      slicedTipValue = tipValue.innerText.slice(0, 1);
    }
  }

  checkInputs(...inputs) {
    inputs.forEach((input) => {
      input.addEventListener("keypress", (e) => {
        console.log(e);
        if (parseInt(e.key) === 0) {
          errorMessage.innerText = "Can't be zero";
        } else {
          errorMessage.innerText = "";
        }
      });
    });
  }

  determineInputs(eventObj, targetInput) {
    if (eventObj.target.value.includes(eventObj.target.value)) {
      this.setBillAmount = eventObj.target.value.slice(
        eventObj.target.value.length - 1
      );
      if (eventObj.key === "Backspace") {
        targetInput = eventObj.target.value.substr(
          0,
          eventObj.target.value.length
        );
      }
    }
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
  initialVal,
  initialVal,
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

billAmount.addEventListener("keyup", (e) => {
  if (e.target.value.includes(e.target.value)) {
    CalculatorApp.setBillAmount = e.target.value.slice(
      e.target.value.length - 1
    );
    if (e.key === "Backspace") {
      CalculatorApp.bill = e.target.value.substr(0, e.target.value.length);
    }
  }
  // CalculatorApp.determineInputs(e, this.bill);
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

noOfPeople.addEventListener("keyup", (e) => {
  CalculatorApp.determineInputs(e, CalculatorApp.people);
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

tipSelects.forEach((select) => {
  select.addEventListener("click", () => {
    CalculatorApp.pickSelect(select);
  });
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

resetButton.addEventListener("click", () => resetInputAndText(inputs, texts));
