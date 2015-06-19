var url = "//www.youtube.com/embed/";

function showResponse(response) {
   
    var i;
    for (i=1; i <= 12; i++)
    {
        $('<iframe />');
        $('<iframe />', {
            name: 'frame'+i,
            id: 'frame'+i,
            width: 373, 
            height: 250,
            src: url + JSON.parse(JSON.stringify(response.items[i].id.videoId))
        }).appendTo('#videos');
    }
}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCS-MPGT_gh2_JJ3UjEGbPAJebEUmIwKv0');
    search("Goal Setting");
}

function search(tags) {
    var request = gapi.client.youtube.search.list({
        part: 'id',
        q: tags,
        type: "video",
        maxResults: 25,
        order: "viewCount"
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    showResponse(response);
}

$(document).ready(function(){

    $('.youtube-search').submit( function(event){
        var tags = $(this).find("input[name='search']").val();
        $('#videos').empty();
        search(tags);
    });
});