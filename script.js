const rightSide = document.querySelector(".right");
const leftMonth = document.querySelector(".left .buttom");
const yearNum = document.querySelector(".year-num");
const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");
const themeSwitch = document.querySelector(".themeSwitch");
const body = document.querySelector("body");

let monthIndex = 0;
const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const Day = ["S", "M", "T", "W", "T", "F", "S"];

const date = new Date();
calender();
function calender() {
    rightSide.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        let month = createMonth(i, date.getFullYear());
        rightSide.appendChild(month);
    }
    yearNum.innerHTML = date.getFullYear();
    backward.innerHTML = date.getFullYear() - 1;
    forward.innerHTML = date.getFullYear() + 1;
    setLeftCalender();
    clickAdjust();
}
function createMonth(monthNumber, yearNumber) {
    year = yearNumber;
    let i = monthNumber;
    const month = document.createElement("div");
    month.classList.add("months");
    const monthNum = document.createElement("div");
    monthNum.classList.add("month-num");
    monthNum.innerHTML = pad(i + 1);
    month.appendChild(monthNum);
    const monthName = document.createElement("div");
    monthName.classList.add("month-name");
    monthName.innerHTML = Months[i];
    month.appendChild(monthName);
    const daysDiv = document.createElement("div");
    daysDiv.classList.add("days");
    const barDiv = document.createElement("div");
    barDiv.classList.add("bar");
    for (let j = 0; j < 7; j++) {
        const p = document.createElement("p");
        if (j % 7 == 0) p.classList.add("sunday");
        else if (j % 7 == 6) p.classList.add("saturday");
        p.innerHTML = Day[j];
        barDiv.appendChild(p);
    }
    daysDiv.appendChild(barDiv);
    const line = document.createElement("div");
    line.classList.add("border");
    daysDiv.appendChild(line);
    const datesDiv = document.createElement("div");
    datesDiv.classList.add("dates");

    let firstDayIndex = new Date(year, i, 0).getDay() + 1;
    let lastDate = new Date(year, i + 1, 0).getDate();
    firstDayIndex = firstDayIndex == 7 ? 0 : firstDayIndex;
    let count = 0;
    for (j = 0; j < firstDayIndex; j++) {
        const blankDiv = document.createElement("div");
        datesDiv.appendChild(blankDiv);
        count++;
    }
    for (let j = 1; j <= lastDate; j++) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        if (count % 7 == 0) dayDiv.classList.add("sunday");
        else if (count % 7 == 6) dayDiv.classList.add("saturday");
        dayDiv.innerHTML = j;
        datesDiv.appendChild(dayDiv);
        count++;
    }
    if (count < 37) {
        for (j = 0; j < 36 - count; j++) {
            const blankDiv = document.createElement("div");
            datesDiv.appendChild(blankDiv);
        }
    }
    daysDiv.appendChild(datesDiv);
    month.appendChild(daysDiv);
    return month;
}
function pad(number) {
    let a = number < 10 ? "0" + number : number + "";
    return a;
}

function initClick() {
    const allMonth = document.querySelectorAll(".months");
    allMonth.forEach((month, index) => {
        month.addEventListener("click", () => {
            monthIndex = index;
            setLeftCalender();
        });
    });
}
function setLeftCalender() {
    leftMonth.innerHTML = "";
    let month = createMonth(monthIndex, date.getFullYear());
    leftMonth.appendChild(month);
    const fix = document.querySelector(".left .buttom .months");
    let htmlString = fix.innerHTML;
    leftMonth.innerHTML = htmlString;
    leftMonth.classList.add("animation");
    setTimeout(() => {
        leftMonth.classList.remove("animation");
    }, 300);
}

backward.addEventListener("click", () => {
    date.setFullYear(date.getFullYear() - 1);
    calender();
    clickAdjust();
});
forward.addEventListener("click", () => {
    date.setFullYear(date.getFullYear() + 1);
    calender();
    clickAdjust();
});
themeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});
window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight") {
        forward.click();
    } else if (e.key == "ArrowLeft") {
        backward.click();
    } else if (e.key == "ArrowDown") {
        if (monthIndex < 11) {
            monthIndex += 1;
            setLeftCalender();
        }
    } else if (e.key == "ArrowUp") {
        if (monthIndex > 0) {
            monthIndex -= 1;
            setLeftCalender();
        }
    }
});

function clickAdjust() {
    const width = window.innerWidth;
    if (width >= 1060) {
        initClick();
    }
}
