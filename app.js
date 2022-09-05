//@ts-nocheck

// Globals
let money = {
  cash: 0,
  totalCash: 0,
  cashPerClick: 1,
  cashPerInterval: 0,
};

const moneyDefault = {
  cash: 0,
  totalCash: 0,
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
      cashValue: 4,
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
    available: 0,
    multiplier: 1,
    cost: 100,
  },
};

const upgradesDefault = {
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
      cashValue: 4,
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
    available: 0,
    multiplier: 1,
    cost: 100,
  },
};

// Returns upgrade object
function findUpgrade(nameOfUpgrade) {
  let listOfUpgrades = [...upgrades.clickUpgrades, ...upgrades.autoUpgrades];
  return listOfUpgrades.find((u) => u.name == nameOfUpgrade);
}

//Globals for selecting elements
let cashElem = document.getElementById("amountOfMoney");
let cashPerClickElem = document.getElementById("cashPerClick");
let cashPerIntervalElem = document.getElementById("cashPerInterval");
let progressBarElem = document.getElementById("progressBar");
let totalCashElem = document.getElementById("totalCash");

let juicerQuantityElem = document.getElementById("juicerQuantity");
let juicerPriceElem = document.getElementById("juicerPrice");
let juicerValueElem = document.getElementById("juicerValue");

let flavorQuantityElem = document.getElementById("flavorQuantity");
let flavorPriceElem = document.getElementById("flavorPrice");
let flavorValueElem = document.getElementById("flavorValue");

let advertisementQuantityElem = document.getElementById(
  "advertisementQuantity"
);
let advertisementPriceElem = document.getElementById("advertisementPrice");
let advertisementValueElem = document.getElementById("advertisementValue");

let standQuantityElem = document.getElementById("standQuantity");
let standPriceElem = document.getElementById("standPrice");
let standValueElem = document.getElementById("standValue");

let goCorporateElem = document.getElementById("goCorporate");
let corporatePrice;

// Draws updates to the screen
function update() {
  cashElem.innerText = money.cash;
  cashPerClickElem.innerText = money.cashPerClick;
  cashPerIntervalElem.innerText =
    money.cashPerInterval * upgrades.goCorporate.multiplier;
  totalCashElem.innerText = money.totalCash;

  juicerQuantityElem.innerText = findUpgrade("extra juicer").quantity;
  juicerPriceElem.innerText = findUpgrade("extra juicer").cost;
  juicerValueElem.innerText = findUpgrade("extra juicer").cashValue;

  flavorQuantityElem.innerText = findUpgrade("new flavor").quantity;
  flavorPriceElem.innerText = findUpgrade("new flavor").cost;
  flavorValueElem.innerText = findUpgrade("new flavor").cashValue;

  advertisementQuantityElem.innerText = findUpgrade("advertisement").quantity;
  advertisementPriceElem.innerText = findUpgrade("advertisement").cost;
  advertisementValueElem.innerText =
    findUpgrade("advertisement").cashPerIntervalValue *
    upgrades.goCorporate.multiplier;

  standQuantityElem.innerText = findUpgrade("open new stand").quantity;
  standPriceElem.innerText = findUpgrade("open new stand").cost;
  standValueElem.innerText =
    findUpgrade("open new stand").cashPerIntervalValue *
    upgrades.goCorporate.multiplier;

  trackAvailableCorporate();
  saveLemonade();
}

function saveLemonade() {
  window.localStorage.setItem("upgrades", JSON.stringify(upgrades));
  window.localStorage.setItem("money", JSON.stringify(money));
}

function loadLemonade() {
  localUpgrades = JSON.parse(window.localStorage.getItem("upgrades"));
  localMoney = JSON.parse(window.localStorage.getItem("money"));

  if (
    localMoney.cash > 0 ||
    localMoney.cashPerClick > 1 ||
    localMoney.cashPerInterval > 0
  ) {
    money = localMoney;
    upgrades = localUpgrades;

    if (localMoney.cashPerInterval > 0) {
      activateInterval();
    }
  }
}

// Click function
function getThatGreen() {
  money.cash += money.cashPerClick;
  money.totalCash += money.cashPerClick;
  update();
}

function autoMoneyGet() {
  money.cash += money.cashPerInterval * upgrades.goCorporate.multiplier;
  money.totalCash += money.cashPerInterval * upgrades.goCorporate.multiplier;
  Math.round(money.cash);
  Math.round(money.totalCash);
  update();
}

// Buys upgrades
function buyUpgrade(nameOfUpgrade) {
  let upgrade = findUpgrade(nameOfUpgrade);

  if (money.cash >= upgrade.cost) {
    upgrade.quantity++;
    money.cash -= upgrade.cost;

    if ("cashValue" in upgrade) {
      money.cashPerClick += upgrade.cashValue;
    } else {
      money.cashPerInterval += upgrade.cashPerIntervalValue;
      activateInterval();
    }
    upgrade.cost = Math.round((upgrade.cost *= 1.5));
  }
  update();
}

function activateInterval() {
  if (!progressBarElem.classList.contains("interval-progress-bar")) {
    progressBarElem.classList.add("interval-progress-bar");
  }
}

progressBarElem.addEventListener("animationiteration", (event) => {
  autoMoneyGet();
});

function countUpgrades() {
  let listOfUpgrades = [...upgrades.clickUpgrades, ...upgrades.autoUpgrades];
  let upgradeCounter = 0;

  for (upgrade of listOfUpgrades) {
    upgradeCounter += upgrade.quantity;
  }
  return upgradeCounter;
}

function trackAvailableCorporate() {
  let upgradeCounter = countUpgrades();

  upgrades.goCorporate.available = Math.floor(upgradeCounter / 10);

  if (upgrades.goCorporate.available > upgrades.goCorporate.quantity) {
    goCorporateElem.classList.remove("hidden");
  } else {
    goCorporateElem.classList.add("hidden");
  }
}

function buyCorporate() {
  if (money.cash >= upgrades.goCorporate.cost) {
    money.cash -= upgrades.goCorporate.cost;
    upgrades.goCorporate.quantity++;
    upgrades.goCorporate.multiplier++;
    update();
  }
}

function reset() {
  money = { ...moneyDefault };
  upgrades = { ...upgradesDefault };
  progressBarElem.classList.remove("interval-progress-bar");
  update();
}

loadLemonade();
update();

// Go Corporate button needs to remove hidden class from the button and
//  add padding to corporate button
