// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {

  // Get current hour
  var currentHour = dayjs().hour();

  // Loop through each time block
  $(".time-block").each(function() {
    // Extract the hour from the id
    var blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Add or remove classes based on the comparison
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Load saved data from local storage
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    var savedData = localStorage.getItem(blockId);

    if (savedData) {
      $(this).find(".description").val(savedData);
    }
  });

  $(".saveBtn").on("click", function() {
    // Find the parent ".time-block" element
    var timeBlock = $(this).parent(".time-block");
    
    // Retrieve the id attribute and user input
    var blockId = timeBlock.attr("id");
    var inputData = timeBlock.find(".description").val();
    
    // Save data to local storage
    localStorage.setItem(blockId, inputData);
    $("#local-storage").text("Appointment added to local storage");
  });

    // Display current date at the top
    var currentDate = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDate);

});