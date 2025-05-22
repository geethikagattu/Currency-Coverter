let base_url = "https://2024-03-06.currency-api.pages.dev/v1/currencies"

let dropdowns = document.querySelectorAll(".dropdown select");
let but = document.querySelector("button")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let msg = document.querySelector(".msg")




for(let select of dropdowns){
for (Currcode in countryList){
    let newoption = document.createElement("option")
    newoption.innerText = Currcode;
    newoption.value = Currcode;
    if(select.name === "from" && Currcode === "INR"){
    newoption.selected = "selected"
    }else if(select.name === "to" && Currcode === "USD"){
        newoption.selected = "selected"
    }
    select.append(newoption)
    }

    select.addEventListener("change",(evnt)=>{
      changeflag(evnt.target);
})
}

const exchange = async()=>{
    let amount = document.querySelector(".amount input")
    let amtval = amount.value
    if(amtval === " " || amtval < 1){
        amtval = 1
        amtval.value = "1"
    }
    const url = `${base_url}/${fromCurr.value.toLowerCase()}.json`
    let response = await fetch(url )
    let data = await response.json()
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let value = amtval*data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    msg.innerText = `${amount.value} ${fromCurr.value} to ${value} ${toCurr.value}`
}

const changeflag= (Element) =>{
    let currcode = Element.value
     let countrycode = countryList[currcode];
     let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
     let img = Element.parentElement.querySelector("img")
     img.src = newsrc;
    
}

but.addEventListener("click" , (evt)=>{
    
    evt.preventDefault();
    exchange()
    
})

window.addEventListener("load",()=>{
    exchange();
})






























