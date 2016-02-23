$(document).ready(function(){

  $(document).on('click', "#search", function(){
    // alert("clicked");
    $('.results').html('');
    if($(".usersearch").val() !== ""){
      var searchterm = $(".usersearch").val();
      var tags = capitalizeEachWord(searchterm);
      wikipedia(tags);
      $(".searchterm").text(tags);
      flickr(searchterm);
    }
    });
    $(".searchbox").submit(function(e){
      e.preventDefault();
      $('.results').html('');
      if($(".usersearch").val() !== ""){
        var searchterm = $(".usersearch").val();
        var tags = capitalizeEachWord(searchterm);
        wikipedia(tags);
        $(".searchterm").text(tags);
        flickr(searchterm);
      }
  });
});

function flickr(searchterm){
  $.getJSON("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c02c1d6a2a822e30c67dd1c0d5a9ccb1&tags=" + searchterm + "&per_page=20&format=json&jsoncallback=?", function(data){
    $.each(data.photos.photo, function(index, value){
        var flickrResults = imageInput(value);
        $(".results").append(flickrResults);
      });
    });
  }

  var imageInput = function(value){
      var result = $(".templates .user").clone();
      var photoElem = result.find(".flickrphoto img");
      photoElem.attr('src', "https://farm" + value.farm + ".static.flickr.com/" + value.server + "/" + value.id + "_" + value.secret + "_q.jpg");

      var linkElem = result.find(".flickrphoto a");
      linkElem.attr('href', "https://farm" + value.farm + ".static.flickr.com/" + value.server + "/" + value.id + "_" + value.secret + ".jpg")

      return result;
  };


function wikipedia(tags){
  $.ajax({
		url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=',
		data: {titles: tags},
		dataType: 'jsonp',
		crossDomain: true,
		type: 'GET',
		success: function(data){
			console.log(data);
      $.each(data.query.pages, function(pageid, value){
        $(".wikipediamedia").text(value.extract);
      });
		}
	});
}

  function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
