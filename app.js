//@ts-nocheck
// Globals
let money = 0;
let upgrades = {
  clickUpgrades: [
    {
      name: "extra juicer",
      quantity: 0,
    },
  ],
};

//Globals for selecting elements
let moneyElem = document.getElementById("amountOfMoney");

// Draws updates to the screen
function update() {
  moneyElem.innerText = money;
}

// Click function
function getThatGreen() {
  money++;
  update();
}
