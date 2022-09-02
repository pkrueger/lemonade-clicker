//@ts-nocheck

// Globals
let money = {
  cash: 0,
  cashPerClick: 1,
  cashPerInterval: 0,
};

let upgrades = {
  clickUpgrades: [
    {
      name: "extra juicer",
      quantity: 0,
      cashValue: 1,
      cost: 20,
    },
    {
      name: "new flavor",
      quantity: 0,
      cashValue: 2,
      cost: 20,
    },
  ],
  autoUpgrades: [
    {
      name: "advertisement",
      quantity: 0,
      cashPerIntervalValue: 1,
      cost: 20,
    },
    {
      name: "open new stand",
      quantity: 0,
      cashPerIntervalValue: 4,
      cost: 20,
    },
  ],
  goCorporate: {
    name: "corporate sponsorship",
    quantity: 0,
    multiplier: 1.1,
  },
};

//Globals for selecting elements
let moneyElem = document.getElementById("amountOfMoney");

// Draws updates to the screen
function update() {
  moneyElem.innerText = money.cash;
}

// Click function
function getThatGreen() {
  money.cash += money.cashPerClick;
  update();
}

function autoMoneyGet() {
  money.cash += money.cashPerInterval;
  update();
}

// Buys upgrades
function buyUpgrade(nameOfUpgrade) {
  let listOfUpgrades = [...upgrades.clickUpgrades, ...upgrades.autoUpgrades];
  let upgrade = listOfUpgrades.find((u) => u.name == nameOfUpgrade);

  if (money.cash > upgrade.cost) {
    upgrade.quantity++;
    money.cash -= upgrade.cost;

    if ("cashValue" in upgrade) {
      money.cashPerClick += upgrade.cashValue;
    } else {
      money.cashPerInterval += upgrade.cashPerIntervalValue;
    }
    upgrade.cost = Math.round((upgrade.cost *= 1.5));
    update();
  }
  console.log(money);
}

setInterval(autoMoneyGet, 3000);
