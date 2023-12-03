let timeInput = document.getElementById("timeInput");
let Start = document.getElementById("Start");
let Pause = document.getElementById("Pause");
let Reset = document.getElementById("Reset");
let runningStatus = false;
let interValID;
let counterS = 0;
let counterM = 0;
let counterH = 0;
let totalCounterInMiliSec = 0;

function colonCounter(str) {
    let counter = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == ":") {
            counter++;
        }
    };
    return counter;
};

function convertSMH() {
    let SeMnHo = timeInput.value.split(":");
    counterS = SeMnHo[SeMnHo.length - 1];
    counterM = SeMnHo[SeMnHo.length - 2];
    counterH = SeMnHo[SeMnHo.length - 3];

    if (counterS == undefined) {
        counterS = 0;
    }
    if (counterM == undefined) {
        counterM = 0;
    }
    if (counterH == undefined) {
        counterH = 0;
    }
    totalCounterInMiliSec = (Number(counterS)) + (Number(counterM) * 60) + (Number(counterH) * 60 * 60);
    console.log(totalCounterInMiliSec);

    clearInterval(interValID);
    runningStatus = false;
    document.title = "JS Timer by Paritosh Barman";
}

function makeString(value) {
    // console.log(value);
    if (value.length > 2 && !value.includes(":")) {
        timeInput.value = `${value.slice(0, 2)}:${value.slice(2, 4)}`;
    } else if (value.length > 5 && colonCounter(value) == 1) {
        timeInput.value = `${value.slice(0, 2)}:${value.slice(3, 5)}:${value.slice(5, 7)}`;
    }
    else if (value.length > 8 && colonCounter(value) >= 2) {
        value = value.replaceAll(":", "");
        timeInput.value = `${value.slice(0, value.length - 4)}:${value.slice(value.length - 4, value.length - 2)}:${value.slice(value.length - 2, value.length)}`;
    }
    convertSMH();
};


Start.addEventListener("click", () => {
    if (runningStatus == false) {
        runningStatus = true;
        interValID = setInterval(() => {

            totalCounterInMiliSec--;
            if (totalCounterInMiliSec < 60) {
                timeInput.value = `${totalCounterInMiliSec}s`;
                document.title = `${totalCounterInMiliSec}s - JS Timer by Paritosh Barman`;
            }
            else if (totalCounterInMiliSec < 3600) {
                timeInput.value = `${parseInt(totalCounterInMiliSec / 60)}m ${totalCounterInMiliSec % 60}s`;
                document.title = `${parseInt(totalCounterInMiliSec / 60)}m ${totalCounterInMiliSec % 60}s - JS Timer by Paritosh Barman`;
            }
            else if (totalCounterInMiliSec >= 3600) {
                timeInput.value = `${parseInt(totalCounterInMiliSec / 3600)}h ${parseInt(parseInt(totalCounterInMiliSec % 3600) / 60)}m ${parseInt(totalCounterInMiliSec % 3600) % 60}s`;
                document.title = `${parseInt(totalCounterInMiliSec / 3600)}h ${parseInt(parseInt(totalCounterInMiliSec % 3600) / 60)}m ${parseInt(totalCounterInMiliSec % 3600) % 60}s - JS Timer by Paritosh Barman`;
            }
            console.log(totalCounterInMiliSec);

            if (totalCounterInMiliSec <= 0) {
                clearInterval(interValID);
                runningStatus = false;
                timeInput.value = "";
                document.title = "JS Timer by Paritosh Barman";
            }
        }, 1000);
    }
});


Pause.addEventListener("click", () => {
    clearInterval(interValID);
    runningStatus = false;
});

Reset.addEventListener("click", () => {
    clearInterval(interValID);
    runningStatus = false;
    timeInput.value = "";
    document.title = "JS Timer by Paritosh Barman";
    totalCounterInMiliSec = 0;
});
