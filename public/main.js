var money = 0;
var numAuto = 0;

var autoPrice = 10;
var perClickPrice = 50;
var businessPrice = 300;
var megaClickPrice = 500;

var moneyPerClick = 1;
var earnPerSec = 0;

var timer;
var autoMoneyTime = 1000;

var dimmed = 0;
var dimmedAuto = 0;

var helpOpen = 0;

// Add money when user clicks dollar sign
function addDollar() {
  event.preventDefault();
  if (helpOpen == 0) { // No pressing button with help screen open
    // Flash button alternating clicks
    if (dimmed == 0) {
    document.getElementById("addDollarButtonImg").style.opacity = "0.5";
    dimmed = 1;
  } else {
    document.getElementById("addDollarButtonImg").style.opacity = "1.0";
    dimmed = 0;
  }
  money = money + moneyPerClick;
  document.getElementById("moneyAmount").innerHTML = "$" + money;
  toggleButton();
  }
}

// Add dollar per second
function addAutoClicker() {
  event.preventDefault();
  clearInterval(timer);

  // Get cost of autoclicker from html, substring changes depending on digits
  var priceStr = document
    .getElementById("autoClickerButton")
    .innerHTML.substring(1, autoPrice.toString().length + 1);
  var price = parseInt(priceStr);

  // Successful buy
  if (money >= autoPrice) {
    numAuto++; // Add autoclicker
    // Decrement total money and update money text
    money = money - autoPrice;
    document.getElementById("moneyAmount").innerHTML = "$" + money;

    // Increase price of autoclicker and update button text
    autoPrice = Math.round(price * 1.2);
    document.getElementById("autoClickerButton").innerHTML =
      "$" + autoPrice + ": Add Autoclicker";

    earnPerSec = numAuto / (autoMoneyTime / 1000);
    document.getElementById("moneyPerSecond").innerHTML = "$" + earnPerSec;

    toggleButton();
  }
  startAutoDollars();
}

// Increase amount of money per click by $1
function increasePerClick() {
  event.preventDefault();
  clearInterval(timer);

  var priceStr = document
    .getElementById("perClickButton")
    .innerHTML.substring(1, perClickPrice.toString().length + 1);
  var price = parseInt(priceStr);
  if (money >= perClickPrice) {
    moneyPerClick++;
    money = money - perClickPrice;
    document.getElementById("moneyAmount").innerHTML = "$" + money;
    perClickPrice = Math.round(price * 1.1);
    document.getElementById("perClickButton").innerHTML =
      "$" + perClickPrice + ": Increase per Click";
    toggleButton();
    
    document.getElementById("moneyPerClick").innerHTML = "$" + moneyPerClick;
  }
  startAutoDollars();
}

// Increase money earned per second by $25
function addBusiness() {
  event.preventDefault();
  clearInterval(timer);

  var priceStr = document
    .getElementById("addBusinessButton")
    .innerHTML.substring(1, businessPrice.toString().length + 1);
  var price = parseInt(priceStr);

  if (money >= businessPrice) {
    numAuto += 25;
    money = money - businessPrice;
    document.getElementById("moneyAmount").innerHTML = "$" + money;
    businessPrice = Math.round(price * 1.5);
    document.getElementById("addBusinessButton").innerHTML =
      "$" + businessPrice + ": Add Business";

    earnPerSec = numAuto / (autoMoneyTime / 1000);
    document.getElementById("moneyPerSecond").innerHTML = "$" + earnPerSec;

    toggleButton();
  }
  startAutoDollars();
}

// Increase money earned per click by 30
function addMegaClick() {
  event.preventDefault();
  clearInterval(timer);

  var priceStr = document
    .getElementById("megaClickButton")
    .innerHTML.substring(1, megaClickPrice.toString().length + 1);
  var price = parseInt(priceStr);

  if (money >= megaClickPrice) {
    moneyPerClick += 25;
    money = money - megaClickPrice;
    document.getElementById("moneyAmount").innerHTML = "$" + money;

    megaClickPrice = Math.round(price * 1.5);
    document.getElementById("megaClickButton").innerHTML =
      "$" + megaClickPrice + ": Add MegaClick";
    toggleButton();
    
    document.getElementById("moneyPerClick").innerHTML = "$" + moneyPerClick;
  }
  startAutoDollars();
}

// Enable / disable four buttons based on if user can afford them
function toggleButton() {
  if (money < autoPrice)
    document.getElementById("autoClickerButton").disabled = true;
  else if (money >= autoPrice && document.getElementById("autoClickerButton").disabled)
    document.getElementById("autoClickerButton").disabled = false;

  if (money < perClickPrice)
    document.getElementById("perClickButton").disabled = true;
  else if (money >= perClickPrice && document.getElementById("perClickButton").disabled)
    document.getElementById("perClickButton").disabled = false;

  if (money < businessPrice)
    document.getElementById("addBusinessButton").disabled = true;
  else if (money >= businessPrice && document.getElementById("addBusinessButton").disabled)
    document.getElementById("addBusinessButton").disabled = false;

  if (money < megaClickPrice)
    document.getElementById("megaClickButton").disabled = true;
  else if (money >= megaClickPrice && document.getElementById("megaClickButton").disabled)
    document.getElementById("megaClickButton").disabled = false;
}

// Automatically add money every second to user
function startAutoDollars() {
  timer = setInterval(function () {
    if (helpOpen == 0) { // Make no auto money if help screen open
      money = money + numAuto;
      document.getElementById("moneyAmount").innerHTML = "$" + money;
      toggleButton();
      if (dimmedAuto == 0) {
        document.getElementById("addDollarButtonImg").style.opacity = "0.5";
        dimmedAuto = 1;
      } else {
        document.getElementById("addDollarButtonImg").style.opacity = "1.0";
        dimmedAuto = 0;
      }
    }
  }, autoMoneyTime);
}

// Click help button once open, click help button twice close
function showHelp() {
  var prev = document.getElementById("addDollarButtonImg").style.opacity;
  if (helpOpen == 0) {
    document.getElementById("helpDiv").style.visibility = "visible";
    document.getElementById("addDollarButtonImg").style.opacity = "0";
    helpOpen = 1;
  } else {
    document.getElementById("helpDiv").style.visibility = "hidden";
    document.getElementById("addDollarButtonImg").style.opacity = "1";
    helpOpen = 0;
  }
}

// close help
function hideHelp() {
  document.getElementById("helpDiv").style.visibility = "hidden";
  document.getElementById("addDollarButtonImg").style.opacity = "1";
  helpOpen = 0;
}
