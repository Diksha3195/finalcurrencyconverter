const Base_URL =
"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr =document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load",() => {

    updateexchangerate();
});


for(let select of dropdowns){
    for(Currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = Currcode;
        newoption.value = Currcode;
        if(select.name === "from" && Currcode ==="USD"){
            newoption.selected = "selected";
        }
        else if(select.name === "to" && Currcode ==="INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);

    });
}

    const updateflag = (element) => {
        Currcode = element.value;
        Countrycode = countryList[Currcode];
        let newimg = `https://flagsapi.com/${Countrycode}/flat/64.png`;
        let img = element.parentElement.querySelector("img");
        img.src = newimg;
    };

     btn.addEventListener("click",  (evt) =>{
        evt.preventDefault();
        updateexchangerate();


     });

     const updateexchangerate = async() =>{

        let amount = document.querySelector(".amount input");
        let amtval = amount.value;
        if(amtval === "" || amtval < 1){
            amtval = 1;
            amount.value = "1";
            
        }
        // console.log(fromcurr.value,tocurr.value);
         const URL = `${Base_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
         let response = await fetch(URL);
         let data = await response.json();
         let rate = data[tocurr.value.toLowerCase()];

         finalamount = amtval*rate;
         msg.innerText = `${amtval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`;
        

     };
    
   
    



