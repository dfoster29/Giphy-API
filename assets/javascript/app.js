
var gifs = ["cat", "dog", "shark", "bird", "monkey"];

function displayGifs() {
  // In this case, the "this" keyword refers to the button that was clicked
  var giphy = $(this).attr("data-name");

  // Constructing a URL to search Giphy for the name of the person who said the quote
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=ChQcDZavsw8J53mE5HXu31YOwzqbpwvA&q=" +
    giphy +
    "&limit=9&offset=0&rating=PG-13&lang=en";

  // Performing our AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After the data comes back from the API
    .then(function(response) {
      // Storing an array of results in the results variable
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r") {


          // Creating an image tag
          var gifImage = $("<img class='gif-images m-2'>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          gifImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          //gifDiv.append(p);
          //gifDiv.append(gifImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifImage);
        }
      }
    });
};

function renderButtons() {

  // (this is necessary otherwise we will have repeat buttons)
  $("#gif-buttons").empty();

  // Looping through the array of movies
  for (var i = 0; i < gifs.length; i++) {
    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("btn m-3 btn-primary gif-button");
    // Adding a data-attribute with a value of the movie at index i
    a.attr("data-name", gifs[i]);
    // Providing the button's text with a value of the movie at index i
    a.text(gifs[i]);
    // Adding the button to the HTML
    $("#gif-buttons").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-gif").on("click", function(event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();

  if ($("#gif-input").val() !== '') {
  // This line will grab the text from the input box
  var gif = $("#gif-input").val().trim();
  $("#gif-input").val("");
  // The movie from the textbox is then added to our array
  gifs.push(gif);

  // calling renderButtons which handles the processing of our movie array
  renderButtons();
  }
});

$(document).on("click", ".gif-button", displayGifs);

// Calling the renderButtons function at least once to display the initial list of movies
renderButtons();
