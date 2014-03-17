/* ============================== */
/*  FUNCTIONS
/* ============================== */

function loadArticles(){
	var randomArticles = 'http://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=10&rnnamespace=0&format=json&callback=?';

	$.getJSON(randomArticles, function(data){
		$.each(data.query.random, function(i, article){
			var articleInfo = 'http://en.wikipedia.org/w/api.php?action=query&pageids=' + article.id + '&prop=info&inprop=url&format=json&callback=?';

			$.getJSON(articleInfo, function(data){
				$.each(data.query.pages, function(i, info){
					var articleExtract = 'http://en.wikipedia.org/w/api.php?action=query&pageids=' + article.id + '&prop=extracts&format=json&callback=?';

					$.getJSON(articleExtract, function(data){
						$.each(data.query.pages, function(i, item){
							var excerpt = $(item.extract).filter('p').text();

							$('#content .container').append('<article><div class="title"><a href="' + info.fullurl + '">' + info.title + '</a></div><div class="excerpt">' + excerpt + '</div><div class="read-more"><a href="' + info.fullurl + '">Continue Reading</a></div></article>');
						});
					});
				});
			});
		});
	});
}


/* ============================== */
/*  DOCUMENT READY
/* ============================== */

$(document).ready(function(){


/* ============================== */
/*  INITIAL LOAD
/* ============================== */

	loadArticles();


/* ============================== */
/*  SCROLLING
/* ============================== */

	$('.scroll').on('click touchstart', function(e){
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $(this.hash).offset().top
		}, 1000);
	});

	$(window).bind('scroll', function(e){
		if ($(this).scrollTop() < 99){
			$('#back-to-top').removeClass('show');
		}
		if ($(this).scrollTop() > 100){
			$('#back-to-top').addClass('show');
		}
	});


/* ============================== */
/*  REFRESH
/* ============================== */

	$('#refresh button').on('click touchstart', function(){
		$(this).toggleClass('spin');
		$('#content .container').empty();
		loadArticles();
		setTimeout(function(){
			$('#refresh button').removeClass('spin');
        }, 1000);
	});
});