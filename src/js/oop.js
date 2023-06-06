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

class TipCalculator {
  constructor(initialValue, bill, people, tip, total) {
    this.initialValue = initialValue;
    this.bill = bill;
    this.people = people;
    this.tip = tip;
    this.total = total;
  }

  // Getters and setters
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

  setTipAmount(tipAmount) {
    this.tip = tipAmount;
  }

  setTotalAmount(totalAmount) {
    this.total = totalAmount;
  }

  setSelect(selectedButton) {
    this.selectedTip = selectedButton;
  }

  // Pure Methods
  get calculateTipAmount() {
    // Object.defineProperty(CalculatorApp, "setTotalAmount", {
    //   set: {
    //     total: eval(this.bill / this.people + this.tip).toPrecision(4),
    //   },
    // });
    this.setTipAmount(
      (this.tip =
        (eval(this.bill / this.people) / 100) * this.selectedTip).toPrecision(4)
    ); // setters should only be accessed outside the class, but not called as methods inside or outside the class, same as getters

    this.setTotalAmount((this.total = this.bill / this.people + this.tip));
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

  // Number Input Validation

  checkInputs(...inputs) {
    // Number Input validation

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

  resetInputs(...e) {
    e.forEach((value) => {
      value.value = null;
      CalculatorApp.bill = "";
      CalculatorApp.people = "";
      CalculatorApp.selectedTip = "";
      CalculatorApp.tip = undefined;
      CalculatorApp.total = undefined;
      try {
        value.innerText = initialVal;
      } catch (err) {
        console.log(err, "error, not possible");
      }
    });
  }

  displayResults() {
    tipAmount.innerText = this.tip;
    totalAmount.innerText = this.total;
  }
}

// Pure Function
const inputLength = (input) => {
  if (input.value.length === 0) {
    CalculatorApp.input = "";
  }
};

// The Class Created App
const CalculatorApp = new TipCalculator(
  initialVal,
  billAmount.value,
  noOfPeople.value,
  initialVal,
  initialVal
);
// Add Event Listener
billAmount.addEventListener("keyup", (e) => {
  inputLength(billAmount);
  if (e.target.value.includes(e.target.value)) {
    CalculatorApp.setBillAmount = e.target.value.slice(
      e.target.value.length - 1
    );
    // If the user cancels a value
    if (e.key === "Backspace") {
      CalculatorApp.bill = e.target.value.substr(0, e.target.value.length);
    }
  }
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

noOfPeople.addEventListener("keyup", (e) => {
  // CalculatorApp.setNoOfPeople = !isNaN(e.target.value) ? e.target.value : "";
  // CalculatorApp.setNoOfPeople = !isNaN(e.target.value) ? e.target.value : "";
  inputLength(noOfPeople);
  if (e.target.value.includes(e.target.value)) {
    CalculatorApp.setNoOfPeople = e.target.value.slice(
      e.target.value.length - 1
    );
    // If the user cancels a value
    if (e.key === "Backspace") {
      // CalculatorApp.setNoOfPeople = e.target.value.slice(
      //   0,
      //   e.target.value.indexOf([e.target.value.length])
      // );
      CalculatorApp.people = e.target.value.substr(0, e.target.value.length);
    }
  }
  CalculatorApp.calculateTipAmount;
  CalculatorApp.displayResults();
});

tipSelects.forEach((select) => {
  select.addEventListener("click", () => {
    // select.classList.toggle("control-grid-select-focus");
    CalculatorApp.pickSelect(select);
    CalculatorApp.calculateTipAmount;
    CalculatorApp.displayResults();
  });
});

resetButton.addEventListener("click", () =>
  CalculatorApp.resetInputs(billAmount, noOfPeople, tipAmount, totalAmount)
);

CalculatorApp.displayResults();
