(function () {
  const dayNameList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNameList = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const calendarBody = document.querySelector("#calendar");
  calendarBody.innerHTML += `
    <div id="cal_monthYearContainer">
      <div id="year_number"></div>
      <div id="month_number"></div>
    </div>
    <div id="calendar_body">
      <div id="calendar_former" class="cal_button"></div>
      <div id="calendar_weekColumn">
      </div>
      <div id="calendar_next" class="cal_button"></div>
    </div>
  `;
  const calendar = document.getElementById("calendar_weekColumn");


  function endOfMonth(month, year) {
    // 1, 3, 5, 7, 8, 10, 12 => 31
    // 2 => 28
    // 4, 6, 9, 11 => 30
    let result = 0
    const leap = year%4===0 ? true : false ;
    
    if (leap) {
      result = month === 3 || month === 5 || month === 8 || month === 10 ? 30 : 0;
      if (month === 1) { result = 29; }
      else { return 31; }
    } else {
      result = month === 3 || month === 5 || month === 8 || month === 10 ? 30 : 0;
      if (month === 1) { result = 28; }
      else { result = 31; }
    }
    return result;
  }

  function getFirstDayName(day, date) {
    while(date > 0) {
          date = date - 7;
    }
    return (day - date + 1) % 7;
  }

  function pushWeekItems(eom, fom, dObj) {
    const lst = [];
    let count = 0;
    const formerDateObj = initDateObj(new Date(dObj.year, dObj.month-1));
    const lastDay = dObj.firstDayNameOfMonth + ((dObj.endOfMonthDate-1) % 7);

    for (let i = 0; i < fom; i++) {
      const item = document.createElement("span");
      item.innerText = formerDateObj.endOfMonthDate-i;
      item.classList.add("weekDays");
      item.classList.add(`${dayNameList[fom-i-1]}`);
      item.classList.add("former");
      lst.unshift(item);
      count++;
    }
    
    for (let i = fom; i < eom + fom; i++) {
      const item = document.createElement("span");
      item.innerText = i-fom+1;
      item.classList.add("weekDays");
      item.classList.add(`${dayNameList[i%7]}`)
      lst.push(item);
      count++;
    }

    for (let i = 1; count < 42; i++) {
      const item = document.createElement("span");
      item.innerText = i;
      item.classList.add("weekDays");
      item.classList.add(`${dayNameList[(lastDay+i)%7]}`);
      item.classList.add("next");
      lst.push(item);
      count++;
    }

    return lst;
  }
         
  function initDateObj(d) {
    const dateObj = {
      date: d.getDate(),
      day: d.getDay(),
      year: d.getFullYear(),
      month: d.getMonth(),
      endOfMonthDate: endOfMonth(d.getMonth(), d.getFullYear()),
      firstDayNameOfMonth: getFirstDayName(d.getDay(), d.getDate())
    };
    return dateObj;
  }

  function init(d) {
    const lst = [];
    for (let i = 0 ; i < 7; i++) {
      const item = document.createElement("span");
      item.innerText = dayNameList[i];
      item.classList.add(`${dayNameList[i]}`);
      item.classList.add("weekDays");
      lst.push(item);
    }
    lst.forEach((item) => { calendar.appendChild(item); });

    const dateObj = initDateObj(d);
    const cal = pushWeekItems(dateObj.endOfMonthDate, dateObj.firstDayNameOfMonth, dateObj);
    cal.forEach((item) => { calendar.appendChild(item); });

    document.querySelector("#year_number").innerText = d.getFullYear();
    document.querySelector("#month_number").innerText = monthNameList[d.getMonth()];
  }

  init(new Date());
})();
