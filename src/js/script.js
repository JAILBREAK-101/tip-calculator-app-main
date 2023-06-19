8; // Variables
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

// Functions
const pickSelect = (select) => {
  console.log("button", select);
  selectedButtonValue = parseInt(select.innerText);
};

const calculateTipAmount = () => null;

const calculateTotalAmount = () => null;

const checkInputs = (input) => {
  if (parseInt(input.key) === 0) {
    errorMessage.innerText = "Can't be zero";
    input.classList.add("error-input");
  } else {
    errorMessage.innerText = "";
    input.classList.remove("error-input");
  }
};

const resetInputs = () => null;

// Event Listeners
billAmount.addEventListener("keyup", () => {});

tipSelects.forEach((select) =>
  select.addEventListener("click", () => pickSelect(select))
);

noOfPeople.addEventListener("keyup", (e) => {
  checkInputs(e);
});
