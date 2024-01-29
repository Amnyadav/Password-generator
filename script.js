const displayScreen=document.querySelector(".display");
const inputSlider=document.querySelector("[data-slider]");
const silderLength=document.querySelector("[data-Length");
const copyButton=document.querySelector(".copy-button");
const copyMessage=document.querySelector("[data-copyMsg]")
const upperCase=document.querySelector("#uppercase");
const lowerCase=document.querySelector("#lowercase");
const number=document.querySelector("#number");
const symbol=document.querySelector("#symbols");
const indicator=document.querySelector("[data-indicator]");
const generateButton=document.querySelector(".generate-button");
const allCheckBox=document.querySelectorAll("input[type=checkbox]");
let symbolsStr="'!~`@*&^%$#-+=[]{})(?/.,:;/'";

let password="";
let passwordLength=10;
let countCheck=0;
// indicator color to grey

handleSlider();
setIndicator("#ccc");
function handleSlider() {
    inputSlider.value=passwordLength;
    silderLength.innerText=passwordLength;
    // hw
    const max=inputSlider.max;
    const min=inputSlider.min;
    inputSlider.backgroundSize=((passwordLength-min)*100/(max-min)) +"% 100%";

}
function getRandomIntenger(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getRandomNumber() {
    return getRandomIntenger(0,9);
}

function getLowercase() {
    let lowercaseChar=String.fromCharCode(getRandomIntenger(97,123));
    return lowercaseChar;
}
function getUppercase() {
    let uppercaseChar=String.fromCharCode(getRandomIntenger(65,91));
    return uppercaseChar;
}

function generateSymbol() {
    let index=Math.floor(getRandomIntenger(0,symbolsStr.length));
    return symbolsStr[index];
}

function setIndicator(color) {
    indicator.style.background=color;
    
}

function calcStrength() {
    let hasUpper=false;
    let hasLower=false;
    let hasNumber=false;
    let hasSymbol=false;

    if(upperCase.checked) {
        hasUpper=true;
    }
    if(lowerCase.checked) {
        hasLower=true;
    }
    if(number.checked) {
        hasNumber=true;
    }
    if(symbol.checked) {
        hasSymbol=true;
    }
    if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNumber || hasSymbol) &&
        passwordLength >= 6) {
        setIndicator("#ff0");
    } 
    else {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(displayScreen.value);
        copyMessage.innerText="copied";

    }
    catch(e) {
        copyMessage.innerText="failed";
    }

    copyMessage.classList.add("active");
    setTimeout(()=> {
        copyMessage.classList.remove("active");
    },2000);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    countCheck=0;
    allCheckBox.forEach((checkbox)=> {
        if(checkbox.checked) {
            countCheck++;
        }
    });
    //special corner case
    if(passwordLength<countCheck) {
        passwordLength=countCheck;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox)=> {
    checkbox.addEventListener("change",handleCheckBoxChange);
} );

inputSlider.addEventListener("input",(e)=> {
    passwordLength=e.target.value;
    handleSlider();

});

copyButton.addEventListener('click',()=> {
    if(displayScreen.value) {
        copyContent();
    }
});

generateButton.addEventListener("click", ()=> {
    if(countCheck==0) {
        return;
    }

    if(passwordLength<countCheck) {
        passwordLength=countCheck;
        handleSlider();
    }

    password="";

    // necessary stuff
    // if(upperCase.checked) {
    //     password+=getUppercase();
    // }
    // if(lowerCase.checked) {
    //     password+=getLowercase();
    // }
    // if(number.checked) {
    //     password+=getRandomNumber();
    // }
    // if(symbol.checked) {
    //     password+=generateSymbol();
    // }

    let funcArray=[];
    if(upperCase.checked) {
        funcArray.push(getUppercase);
    }
    if(lowerCase.checked) {
        funcArray.push(getLowercase);
    }
    if(number.checked) {
        funcArray.push(getRandomNumber);
    }
    if(symbol.checked) {
        funcArray.push(generateSymbol);
    }
    for(let i=0;i<funcArray.length;i++) {

        password+=funcArray[i]();
    }

    // remaining password
    for(let i=0;i<(passwordLength-funcArray.length);i++) {
        let randIndex=getRandomIntenger(0,funcArray.length);
        password+=funcArray[randIndex]();
    }

    password = shuffle(Array.from(password));
    calcStrength();
    // passwordDisplay.value = password;
    displayScreen.value=password;
});




