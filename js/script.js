$(document).ready(function(){
    let pixURL = "https://pixabay.com/api/";
    let key = "17422134-72993a0b45a4b30f41eb08cf4";
    let numPhotos = 4;
    
    // Update the number of photos to be displayed
    $("#num-photos").on("change", function(){
        numPhotos = $("#num-photos").val();
        
        // Do not allow numbers less than 1
        if(numPhotos < 1){
            numPhotos = 1;
            $("#num-photos").val(1);
            $("#numberError").html("Must be at least 1");
        // Do no allow numbers greater than 20
        } else if(numPhotos > 20){
            numPhotos = 20;
            $("#num-photos").val(20);
            $("#numberError").html("Cannot be more than 20");
        // Reset the page without an error message
        } else {
            $("#numberError").html("");
        }
    });//num-photos
    
    
    // Display photos based on the user's search
    $("#search-btn").on("click", function() {
        if(validInput()){
            let searchTerm = $("#search-text").val().trim();
            
            // Retrieve images using ajax
            $.ajax({
                method: "GET",
                url: pixURL + "?key=" + key + "&q=" + searchTerm,
                dataType: "json",
                success: displayImages
            }); //ajax
        }
    });//search button
    
    function displayImages(result, status) {
        let html = "";
        for(let i = 0; i < numPhotos; i++){
            html += '<img height="300px" src="' + result.hits[i].webformatURL + '" alt="Data">';
        }
        $("#output").html(html);
    }//display images
    
    function validInput(){
        if($("#search-text").val() == ""){
            $("#searchError").html("Please enter a key word");
            $("#searchError").css("background-color","white");
            $("#output").html("What would you like to see?");
            return false;
        } else {
            $("#searchError").html("");
        }
        return true;
    }//valid input
})