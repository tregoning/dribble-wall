(function($){

	'use strict';

	var $body = $('body'),
		dribbleEndPoint = 'http://api.dribbble.com/shots/popular?callback=?', //debuts, everyone, popular
		winWidth = $body.width(),
		winHeight = $body.height(),
		imageList,
		imageWidth = 200,
		imageHeight = 150,
		numberOfImagesFetchedPerCall = 30,
		numberOfColumnsRendered = 0,
		delayBetweenTileAnimation = 500,
		imgCollection = [],
		numberOfImagesPerColumn,
		numberOfColumnsRequired,
		numberOfRenderColumnCallsPerFetch = Math.floor( winWidth / numberOfImagesFetchedPerCall );

	var init = function(){
		numberOfImagesPerColumn = getNumberOfImagesPerColumn();
		numberOfColumnsRequired = getNumberOfColumnsRequired();
		imageList = $('ul');
		imageList.width( numberOfImagesPerColumn * imageWidth );
		centerList();
		renderPage();
		assignEventHandlers();
		startAnimation();
	};

	var assignEventHandlers = function(){
		$body.on('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', 'li',  animationEndCallback);
	};

	var animationEndCallback = function(){
		$(this).removeClass('rotate');
	};

	var startAnimation = function(){
		var randomIndex,
			totalNumberOfImgs = numberOfImagesPerColumn * numberOfColumnsRequired;

		window.setInterval(function(){
			randomIndex = Math.floor(Math.random() * totalNumberOfImgs);
			rotateImg(randomIndex);
		}, delayBetweenTileAnimation);
	};

	var rotateImg = function(index){
		var node = $('li',imageList).eq(index);
		node.addClass('rotate');
	};

	var centerList = function(){
		var marginLeft,
			marginTop;

		marginLeft = (( imageWidth * numberOfImagesPerColumn ) - winWidth ) / -2;
		marginTop = (( imageHeight * numberOfColumnsRequired ) - winHeight ) / -2;

		imageList.css('margin-left', marginLeft);
		imageList.css('margin-top', marginTop);
	};

	var getNumberOfImagesPerColumn = function(){
		return Math.ceil( winWidth / imageWidth );
	};

	var getNumberOfColumnsRequired = function(){
		return Math.ceil( winHeight / imageHeight );
	};

	var renderPage = function(){
		var totalNumberOfImagesRequired = numberOfImagesPerColumn * numberOfColumnsRequired,
			numberOfFetches = Math.ceil( totalNumberOfImagesRequired / numberOfImagesFetchedPerCall );

		for (var i = 1; i <= numberOfFetches; i++){
			fetchDribbbleImages(i);
		}
	};

	var fetchDribbbleImages = function(page){
		$.getJSON(dribbleEndPoint,
			{
				page: page,
				per_page:numberOfImagesFetchedPerCall
			},
			function(data){
				$.each(data.shots, function(){
					imgCollection.push(this);
				});

				for(var i=0; i < numberOfRenderColumnCallsPerFetch; i++){
					if(numberOfColumnsRendered < numberOfColumnsRequired){
						insertColumn();
					}else{
						break;
					}
				}

			});
	};

	var renderColumn = function(){
		var imgs = imgCollection.splice(0, numberOfImagesPerColumn);

		$.each(imgs,function(){
			imageList.append('<li><a href="' + this.url + '"><img src="' + this.image_teaser_url + '" height="' + imageHeight + '" width="' + imageWidth + '"/></a></li>');
		});

		numberOfColumnsRendered += 1;
	};

	var insertColumn = function(){
		if(numberOfImagesPerColumn <= imgCollection.length){
			renderColumn();
		}
	};

	$(init);

}(jQuery));