// Variables
let initialVal = (0.0).toPrecision(3);

let billAmount = document.querySelector("[data-bill-amount]");

let noOfPeople = document.querySelector("[data-no-of-people]");

let errorMessage = document.querySelector("[data-error-msg]");

let tipAmount = document.querySelector("[data-tip-value]");
tipAmount.innerText = initialVal;

let totalAmount = document.querySelector("[data-total-value]");
totalAmount.innerText = initialVal;

const tipSelects = document.querySelectorAll("[data-grid-button]");

const resetButton = document.querySelector("[data-reset-button]");

let selectedButtonValue;

class TipCalculator {
  constructor(billAmount, tipAmount, errorMessage, totalAmount, noOfPeople) {
    this.billAmount = billAmount;
    this.tipAmount = tipAmount;
    this.errorMessage = errorMessage;
    this.totalAmount = totalAmount;
    this.noOfPeople = noOfPeople;
  }

  pickSelect(select) {
    selectedButtonValue = parseInt(select.innerText);
  }

  calculateTipAmount(e) {
    if (typeof e.key !== "string") return;
    else {
      tipAmount.innerText += e.key;
    }
  }

  calculateTotalAmount(e) {}

  // Number Input Validation
  setInputFilter(val) {
    (val) => {
      return /^\d*\.?\d*$/.test(val);
    };
  }

  checkInputs(input, inputFilter) {
    {
      [
        "input",
        "keydown",
        "keyup",
        "mousedown",
        "mouseup",
        "select",
        "contextmenu",
        "drop",
      ].forEach((event) => {
        input.addEventListener(event, () => {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(
              this.oldSelectionStart,
              this.oldSelectionEnd
            );
          } else {
            this.value = "";
          }
        });
      });
    }
    // Number Input validation

    // if (parseInt(input.key) === 0) {
    //   errorMessage.innerText = "Can't be zero";
    //   input.classList.add("error-input");
    // } else {
    //   errorMessage.innerText = "";
    //   input.classList.remove("error-input");
    // }
  }

  resetInputs(...e) {
    e.forEach((value) => {
      value.value = "";
      try {
        value.innerText = initialVal;
      } catch (e) {
        console.log(e, "error, not possible");
      }
    });
  }
}

// The Class Created App
const CalculatorApp = new TipCalculator(billAmount, tipAmount);

// Add Event Listener
billAmount.addEventListener("keypress", (e) => {
  CalculatorApp.calculateTipAmount(e);
});

noOfPeople.addEventListener("keypress", () => {});

tipSelects.forEach((select) => () => {
  CalculatorApp.pickSelect(select);
});

noOfPeople.addEventListener("keypress", (e) => {
  CalculatorApp.checkInputs(e, CalculatorApp.setInputFilter(e.target.value));
});

resetButton.addEventListener("click", () =>
  CalculatorApp.resetInputs(billAmount, noOfPeople, tipAmount, totalAmount)
);
