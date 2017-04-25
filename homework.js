var actors = ["Pepe the frog", "Roger Smith", "Morty" , "Face Palm"];
var animateUrl = "";
var staticUrl = ""; 
      // This function handles events where submit button is clicked
      $("#addActor").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var act = $("#actor-input").val().trim();
        // The movie from the textbox is then added to our array
        actors.push(act);

        // calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

      $('#addsubmit').on('click', function(){
    var pets = $('#add').val().trim();
    $('#animalbuttons').append('<button data-animal="'+pets+'">'+pets+'</button>')
    return false;
                    });

      // Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();


      // Function for displaying movie data
      function renderButtons() {

        // Deleting the buttons prior to adding new buttons
        // (this is necessary otherwise we will have repeat buttons)
        $("#actor-view").empty();

        // Looping through the array of buttons
        for (var i = 0; i < actors.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array.
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("acting");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", actors[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(actors[i]);
          // Adding the button to the HTML
          $("#actor-view").append(a);
        }
      }


// click event listener to buttons
    $(document).on('click','button', function() {


      // Grabbing and storing the data-animal property value from the button
      var individualactor = $(this).attr("data-name");

      // Constructing a queryURL using the animal name
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        individualactor + "&api_key=dc6zaTOxFJmzC&limit=10";

      // AJAX request with the queryURL
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {

          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var actorDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var actorImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            actorImage.attr("src", results[i].images.fixed_height_still.url);
            actorImage.attr("data-animate", results[i].images.fixed_height.url);
            actorImage.attr("data-still", results[i].images.fixed_height_still.url);
            actorImage.attr("data-state", "still"); // set the image state
            actorImage.addClass("gif");


            // Append the paragraph and image tag to the animalDiv
            actorDiv.append(p);
            actorDiv.append(actorImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#actorsHTML").prepend(actorDiv);
          }
        });
        $("#actorsHTML").empty();
    });
$(document).on("click", ".gif", function(){
      // The attr jQuery method 
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


