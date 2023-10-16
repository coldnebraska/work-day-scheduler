// Current date variables
let date = new Date()
let hour = date.getHours() // 24 hr format
let dayName = date.getDay() // returns as number index
let day = date.getDate()
let month = date.getMonth() // returns as number index
let newHour = hour - 12 // 12 hr format
let button = $("button[data-index]")

$(document).ready(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  button.on("click", function() {
    console.log(this)
  })

  // !change block colors based on current hour
  setBlockColors()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  getSchedule()

  // !Current date code
  getCurrentDate()
});

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
  let events = JSON.parse(localStorage.getItem("events"))
  // console.log(events)


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
