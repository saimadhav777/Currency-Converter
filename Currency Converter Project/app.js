let BaseURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector("form button"); 
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".To select");
const msg = document.querySelector(".msg p");

//Step - 1: Making all countries available in the "select".
const dropdown = document.querySelectorAll(".select-container select");

for(let select of dropdown){
    for(currCode in countryList){
        let newOps = document.createElement("option");
        newOps.innerText = currCode;
        newOps.value = currCode;
        //to make default appearing currency
        if(select.name === "from" && currCode === "USD"){
            newOps.selected = "selected";
        }
        else if(select.name === "To" && currCode ==="INR"){
            newOps.selected = "selected";
        }
        select.append(newOps);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let finalAmount = amtVal * rate;
 
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

