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
  constructor(initialValue, bill, people, tip, selectedTip) {
    this.initialValue = initialValue;
    this.bill = bill;
    this.people = people;
    this.tip = tip;
    this.selectedTip = selectedTip;
  }

  // Getters and setters
  /**
   * @param {(arg0: any) => void} billAmount
   */
  set setBillAmount(billAmount) {
    if (typeof parseInt(noOfPeople) === NaN) return;
    this.bill += billAmount;
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

  setSelect(selectedButton) {
    this.selectedTip = selectedButton;
  }

  // Pure Methods
  get calculateTipAmount() {
    this.setTipAmount(
      (tipAmount = eval(this.bill / this.people) / 100) * this.selectedTip
    ); // setters should only be accessed outside the class, but not called as methods inside or outside the class, same as getters
    console.log(this.tip);
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
      try {
        value.innerText = initialVal;
      } catch (err) {
        console.log(err, "error, not possible");
      }
    });
  }
}

// The Class Created App
const CalculatorApp = new TipCalculator(
  initialVal,
  billAmount.value,
  noOfPeople.value
);
// Add Event Listener
billAmount.addEventListener("keypress", (e) => {
  // CalculatorApp.setBillAmount = e.key;
  // CalculatorApp.calculateTipAmount;
  console.log(isNaN(parseInt(e.key)));
});

noOfPeople.addEventListener("keypress", (e) => {
  CalculatorApp.setNoOfPeople = e.key;
  CalculatorApp.calculateTipAmount;
});

tipSelects.forEach((select) => {
  select.addEventListener("click", () => {
    CalculatorApp.pickSelect(select);
  });
});

resetButton.addEventListener("click", () =>
  CalculatorApp.resetInputs(billAmount, noOfPeople, tipAmount, totalAmount)
);

//   {
//     [
//       "input",
//       "keydown",
//       "keyup",
//       "mousedown",
//       "mouseup",
//       "select",
//       "contextmenu",
//       "drop",
//     ].forEach((event) => {
//       input.addEventListener(event, () => {
//         if (inputFilter(this.value)) {
//           this.oldValue = this.value;
//           this.oldSelectionStart = this.selectionStart;
//           this.oldSelectionEnd = this.selectionEnd;
//         } else if (this.hasOwnProperty("oldValue")) {
//           this.value = this.oldValue;
//           this.setSelectionRange(
//             this.oldSelectionStart,
//             this.oldSelectionEnd
//           );
//         } else {
//           this.value = "";
//         }
//       });
//     });
//   }
// setInputFilter(val) {
//   (val) => {
//     return /^\d*\.?\d*$/.test(val);
//   };
// }
