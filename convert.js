// const BASE_URL ="https://api.currencyapi.com/v3/latest?apikey=cur_live_SviZJ5ljUynHFPI2LL3iNd72Xf14pQCOjzHclQwG";
const BASE_URL ="https://api.currencyapi.com/v3/latest?apikey=cur_live_SviZJ5ljUynHFPI2LL3iNd72Xf14pQCOjzHclQwG";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countries) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") { // Default from currency
            newOption.selected = "selected"; // Default from currency
        } else if (select.name === "to" && currCode === "INR") { // Default to currency
            newOption.selected = "selected"; // Default to currency
        }    
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if (amtVal === "" || amtVal <= 1) {
            amtVal = 1; // Default amount if input is empty or less than 1
            amount.value = "1"; // Set the default amount in the input field  
        }
        // console.log(fromCurr.value, toCurr.value);
        
        // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        const URL = `${BASE_URL}&base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.data[toCurr.value.toUpperCase()].value; // Get the conversion rate from the response
        let finalAmount = amtVal * rate; // Calculate the converted amount
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // Display the conversion rate (you can format this as needed)
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countries[currCode]; // Get the country code from the countries object
    let newSrc = `https://countryflagsapi.netlify.app/flag/${countryCode}.png`;
    let img =  element.parentElement.querySelector("img");
    img.src = newSrc;
};


// btn.addEventListener("click", (evt) => {
    //evt.preventDefault(); // Prevent from submitting the form
    // let amount = document.querySelector(".amount input");
    // let amtVal = amount.value;
    // if (amtVal === "" || amtVal <= 1) {
    //     amtVal = 1; // Default amount if input is empty or less than 1
    //     amount.value = "1"; // Set the default amount in the input field  
    // }
    // // console.log(fromCurr.value, toCurr.value);
    
    // // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    // const URL = `${BASE_URL}&base_currency=${fromCurr.value.toUpperCase()}&currencies=${toCurr.value.toUpperCase()}`;
    // let response = await fetch(URL);
    // let data = await response.json();
    // let rate = data.data[toCurr.value.toUpperCase()].value; // Get the conversion rate from the response
    // let finalAmount = amtVal * rate; // Calculate the converted amount
    // msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // Display the conversion rate (you can format this as needed)
    // // try {
        // //     let response = await fetch(URL);
    // //     let data = await response.json();
    // //     // Get the conversion rate
    // //     let rate = data.data[toCurr.value].value;
    // //     let converted = (amtVal * rate).toFixed(2);
    // //     // Display the result (implement your own display logic)
    // //     console.log(`Converted Amount: ${converted}`);
    // // } catch (error) {
        // //     console.error("Conversion failed", error);
        // // }
// });

btn.addEventListener("click", (evt) => {
        evt.preventDefault(); // Prevent from submitting the form
        updateExchangeRate(); // Call the function to update the exchange rate
});


window.addEventListener("load", () => {
    updateExchangeRate(); // Call the function to update the exchange rate on page load
});