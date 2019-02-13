// Global Variables

var omdbApiKey = "&apikey=7cc4d503";
var gbApiKey = "?api_key=1da49a76dc5aff961a13224d42119be60f600160";
var searchType = $('#search-type');
var sourceType = $('#source-type');

// On-Click search function for OMDB API call: 

$("#search-button").click(function (event) {
  $('#results-display').html('');
  event.preventDefault();
  $("#results-display").css('display', 'block');
  $("#results-display").remove(".package");
  var searchInput = $("#search-input").val().trim();
  var typeO; if (searchType.hasClass('movies')) {var typeO='&type=movie'} else {var typeO='&type=series'};
  var omdbQueryURL = 'https://www.omdbapi.com/?s='+searchInput+typeO+omdbApiKey;
  console.log("This is the passed omdbQueryURL: "+omdbQueryURL);
  $.get(omdbQueryURL)
    .done(function (omdbResponse) {
      $('#search-input').val('');
      console.log(omdbResponse);
      var omdbResults = omdbResponse.Search;
      if (omdbResults == '') {$('<div>', {class:'col-md-12', text:"There isn't a result for this search. Womp womp."}).appendTo('#results-display'); return 0;}
      for (var i = 0; i < omdbResults.length; i++) {
        var imdbID = omdbResults[i].imdbID;
        var posterSrc = omdbResults[i].Poster;
        var package = $('<div>', {class:'package animated flipInY', 'data-imdbID':imdbID});
        var streamSearch = $('<div>', {class:'streamSearch', text:'StreamIt'});
        var poster = $('<img>', {class:'movie-image', src:posterSrc});
        var fav = $('<img>', {class:'fav', src:'assets/images/heart-icon.png', 'data-src':posterSrc});
        var details = $('<div>', {class:'details', type:'button', 'data-toggle':'modal', 'data-target':'#exampleModal', text:'Info'});
        $(package).append(poster, fav, details, streamSearch);
        $('#results-display').append(package);}
    });
});

// On-Click function for OMDB API calling additional media details:

$(document).on("click", ".details", function () {
  $("#details").text("");
  var id = $(this).parent().attr("data-imdbID");
  var omdbDetailsURL = "http://www.omdbapi.com/?i="+id+"&plot=full"+omdbApiKey;
  $.get(omdbDetailsURL)
    .done(function (response) {
      var title = $('<h2>', {class:'pTitle', text:response.Title});
      var rating = $('<p>', {class:'pRating', text:'Rated: '+response.Rated});
      var released = $('<p>', {class:'pReleased', text:'Released: '+response.Released});
      var runTime = $('<p>', {class:'pRunTime', text:'Runtime: '+response.Runtime});
      var director = $('<p>', {class:'pDirector', text:'Directed By: '+response.Director});
      var actors = $('<p>', {class:'pActors', text:'Lead Cast: '+response.Actors});
      var plot = $('<p>', {class:'pPlot', text:response.Plot});
      var ratingHeader = $('<h6>', {class:'hRatingHeader', text:'Critical Ratings:'});
      var critics = $('<p>', {class:'pCritics', text:'IMDB: '+response.imdbRating+'/10  Metacritic: '+response.Metascore+'/100'});
      $("#details").append(title, rating, released, runTime, director, actors, plot, ratingHeader, critics);
    });
});

// On-Click function for GuideBox API call:

$("#results-display").on("click", ".streamSearch", function () {
  var id = $(this).parent().attr("data-imdbID");
  fadeServiceIcons();
  console.log('This is the searched items IMDB ID: '+id);
  console.log('-----------------------------------------------------')
  var guideboxId;
  var typeA; if (searchType.hasClass('movies')) {var typeA='movies/'} else {var typeA='shows/'};
  var typeB; if (searchType.hasClass('movies')) {var typeB='&type=movie'} else {var typeB='&type=show'};
  var costSource; if (sourceType.hasClass('free')) {var costSource="&sources=free"} else {var costSource="&sources=subscription"}
  var gbQueryURLimdb = "http://api-public.guidebox.com/v2/search"+gbApiKey+typeB+"&field=id&id_type=imdb&query="+id;
  console.log("This is the passed gbQueryURLimdb: "+gbQueryURLimdb);
  console.log('-----------------------------------------------------')
  // First GuideBox call to get the GuideBox ID (required to get streaming sources):
  $.get(gbQueryURLimdb)
    .done(function (gbResponse) {
      console.log(gbResponse);
      console.log('-----------------------------------------------------')
      guideboxId = gbResponse.id;
      console.log("This is the searched items GuideBox ID: "+guideboxId);
      console.log('-----------------------------------------------------')
      if (gbResponse.results == '') {$("<div class='col-md-12'>").text("There isn't a result for this search. Womp womp. :(").appendTo('#results-display')};
      var gbQueryURLfinal = "https://api-public.guidebox.com/v2/"+typeA+guideboxId+gbApiKey+costSource
      console.log("This is the passed gbQueryURLfinal: "+gbQueryURLfinal);
      console.log('-----------------------------------------------------')
  // Second GuideBox call to map streaming sources available for searched media:
      $.get(gbQueryURLfinal)
          .done(function (gbResponse) {
            $('.streamingservicecontainer').show();
            console.log(gbResponse);
            // Subscription services media is available on:
            gbResponse.subscription_web_sources.forEach(checkSources);
            gbResponse.subscription_ios_sources.forEach(checkSources);
            gbResponse.subscription_android_sources.forEach(checkSources);
            // Services media can be purchased on:
            gbResponse.purchase_android_sources.forEach(checkSources);
            gbResponse.purchase_ios_sources.forEach(checkSources);
            gbResponse.purchase_web_sources.forEach(checkSources);
            // Free services media is available on:
            gbResponse.free_web_sources.forEach(checkSources);
            gbResponse.free_ios_sources.forEach(checkSources);
            gbResponse.free_android_sources.forEach(checkSources);
            // TV Everywhere service availability:
            gbResponse.tv_everywhere_android_sources.forEach(checkSources);
            gbResponse.tv_everywhere_ios_sources.forEach(checkSources);
            gbResponse.tv_everywhere_web_sources.forEach(checkSources);
            });
    });
});

// Function to render logo display based on source being available:

function checkSources(src) {
  if(src.source.includes("netflix")) {
    $("#netflix").css("opacity", "1");
  }
  if(src.source.includes("hbo")) {
    $("#hbo").css("opacity", "1");
  }
  if(src.source.includes("hulu")) {
    $("#hulu").css("opacity", "1");
  }
  if(src.source.includes("youtube")) {
    $("#youtube").css("opacity", "1");
  }
  if(src.source.includes("amazon")) {
    $("#primevideo").css("opacity", "1");
  }
  if(src.source.includes("itunes")) {
    $("#itunes").css("opacity", "1");
  }
  if(src.source.includes("vudu")) {
    $("#vudu").css("opacity", "1");
  }
  if(src.source.includes("google")) {
    $("#googleplay").css("opacity", "1");
  }
}

// Function to render logo display based on source being unavailable:

function fadeServiceIcons() {
  $("#netflix").css("opacity", ".5");
  $("#hbo").css("opacity", ".5");
  $("#hulu").css("opacity", ".5");
  $("#primevideo").css("opacity", ".5");
  $("#youtube").css("opacity", ".5");
  $("#itunes").css("opacity", ".5");
  $("#vudu").css("opacity", ".5");
  $("#googleplay").css("opacity", ".5");
}

/* GuideBox searches that do not return streaming information:

By IMDB ID
By TVDB ID
By TheMovieDB ID



*/