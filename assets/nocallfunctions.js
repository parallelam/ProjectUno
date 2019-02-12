// Change search type on-click to be either by movie or show; default is movie:

$('#search-type').on('click', function changeSearchType (event){
    event.preventDefault();
    var searchType = $('#search-type');
    if (searchType.hasClass('movies')){
        searchType.removeClass('movies');
        searchType.addClass('shows');
        $('#search-type').text('Searching By Shows');    
    } else {
        searchType.removeClass('shows');
        searchType.addClass('movies');
        $('#search-type').text('Searching By Movies');
}});

// Change source type on-click to be either by paid or free; default is free:
  
$('#source-type').on('click', function changeCostType (event){
    event.preventDefault();
    var sourceType = $('#source-type')
    if (sourceType.hasClass('free')){
        sourceType.removeClass('free');
        sourceType.removeClass('btn-success')
        sourceType.addClass('paid');
        sourceType.addClass('btn-danger');
        $('#source-type').text('Showing Paid Stuff');    
    } else {
        sourceType.removeClass('paid');
        sourceType.removeClass('btn-danger')
        sourceType.addClass('free');
        sourceType.addClass('btn-success');
        $('#source-type').text('Showing Free Stuff');    
}});

// Sets default text and default search parameters for togglable buttons:

$('#search-type').text('Searching By Movies'); $('#source-type').text('Showing Free Stuff'); $('#search-button').text('Search');

// Sets default container to be hidden until completion of GuideBox call:

$('.streamingservicecontainer').hide();