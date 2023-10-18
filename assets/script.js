// Current date variables
let date = new Date()
let hour = date.getHours() // 24 hr format
let dayName = date.getDay() // returns as number index
let day = date.getDate()
let month = date.getMonth() // returns as number index
let newHour = hour - 12 // 12 hr format
let button = $("button[id]")
let content = $("textarea[data-content]")
let savedSchedule = {
  hour9: [],
  hour10: [],
  hour11: [],
  hour12: [],
  hour1: [],
  hour2: [],
  hour3: [],
  hour4: [],
  hour5: []
}

$(document).ready(function () {
  // !save button event listeners
  button.on("click", saveContent)

  // !change block colors based on current hour
  setBlockColors()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  getSchedule()

  // !current date code
  getCurrentDate()
});

function saveContent() {
  let buttonIndex = this.id
  let blockSelector = Object.values(savedSchedule)[buttonIndex]
  // console.log("Button id " + this.id)
  // console.log(content[buttonIndex].value)
  // console.log(blockSelector)
  blockSelector.push(content[buttonIndex].value)
  // console.log(blockSelector)
  localStorage.setItem("schedule", JSON.stringify(savedSchedule))
}

function setEvent() {
  console.log("button clicked")
}

function setBlockColors() {
  // Change to current
  let currentHour = "hour-" + hour // 12 hr format
  let currentMilHour = "hour-" + newHour // 24 hr format
 
  if (hour > 12) {
    $("#" + currentMilHour).addClass("present")
    // console.log(currentMilHour + " changed to present")
  } else {
    $("#" + currentHour).addClass("present")
    // console.log(currentHour + " changed to present")
  }
 
  // Change to past
  for (i = 9; i < hour && i <= 12; i++) {
    let pastHours = "hour-" + i
    // console.log(pastHours + " changed to past")
    $("#" + pastHours).addClass("past")
  }
  for (i = 1; i < newHour; i++) {
    let pastHours = "hour-" + i
    // console.log(pastHours + " changed to past")
    $("#" + pastHours).addClass("past")
  }
 
  // Change to future
  if (hour > 12) {
    for (i = newHour + 1; i > newHour && i < 6; i++) {
      let futureHours = "hour-" + i // 
      // console.log(futureHours + " changed to future")
      $("#" + futureHours).addClass("future")
    }
  } else {
    for (i = hour + 1; i > hour && i <= 12; i++) {
      let futureHours = "hour-" + i
      // console.log(futureHours + " changed to future")
      $("#" + futureHours).addClass("future")
    }
    for (i = 1; i < 6; i++) {
      let futureHours = "hour-" + i
      // console.log(futureHours + " changed to future")
      $("#" + futureHours).addClass("future")
   }
 }
}

function getSchedule() {
  let schedule = JSON.parse(localStorage.getItem("schedule"))
  // console.log(schedule)
  for (i = 0; i < 9; i++) {
    // console.log(Object.values(schedule)[i])
    // console.log(content.eq(i))
    content.eq(i).val(Object.values(schedule)[i])
  }
}
  
function getCurrentDate() {
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let suffix = ""

  if (day === 1 || day === 21 || day === 31) {
    suffix = "st"
  } else if (day === 2 || day === 22) {
    suffix = "nd"
  }else if (day === 3 || day === 23) {
    suffix = "rd"
  }else {
    suffix = "th"
  }
  currentDay = days[dayName] + ", " + months[month] + " " + day + suffix
  $("#currentDay").text(currentDay)
}
