var args = arguments[0] || {};
var images = [];
var listImages;
var pageCount = $.pageCount;
var currentPage = 0;
exports.openMainWindow = function() {
	listImages = args.pages;
	$.mangaReadingWindow.title = "Chapter " + args.chapter;
	$.chapterTitle.text = 'Chapter ' + args.chapter;
	pageCount.text = '1/' + listImages.length;
	Alloy.Globals.adv(3, function(advImage) {
		$.advView2.add(advImage);
		$.advView2.height = Alloy.Globals.getAdvHeight();
	});
	SetChangeChapterButtons(args.next, args.prev);
	hideFuncBar();
	
	$.imageHolderView.showPagingControl = false;
	$.imageHolderView.currentPage = 0;
	addImageView();
	$.imageHolderView.views = images;
	changePage();
	$.mangaReadingWindow.addEventListener('singletap', showFuncBar);
	$.mangaReadingWindow.addEventListener('scrollend', checkEndChapter);
  if (Alloy.Globals.getOSType() == "iPhone OS") {
    $.mangaReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
  } else {
    $.mangaReadingWindow.open();
  }
};

function checkEndChapter(e) {
	pageCount.text = (e.currentPage + 1) + '/' + (listImages.length);
	currentPage = e.currentPage;
	if (e.currentPage + 1 == listImages.length) {
		showFuncBar();
	}
}

function SetChangeChapterButtons(next, prev) {
	if (next != null) {
		$.nextButton.visible = true;
		$.nextButton.chapterId = next;
	}
	if (prev != null) {
		$.prevButton.visible = true;
		$.prevButton.chapterId = prev;
	}
}

function changeChapter(e) {
	Alloy.Globals.getAjax('/mangaReading', {
		'id': args.mangaId,
		'chapter': e.source.chapterId
	},
	function(response) {
		var json = JSON.parse(response);
		Alloy.Globals.setAdmobPublisher(json.advPublisher, json.admobPublisher);
		json.data.next = json.nextPrevChapters.next;
		json.data.prev = json.nextPrevChapters.prev;
		json.data.mangaId = args.mangaId;
		Alloy.Globals.track("Manga", "Reading", args.mangaId);
		closeWindowNoAnimation();
		var mangaReadingController = Alloy.createController('mangaReading', json.data);
		mangaReadingController.openMainWindow();
	});
}

function hideFuncBar() {
	$.funcBar.hide();
	$.funcBar.opacity = 0;
};

function showFuncBar(e) {
	if ($.funcBar.visible) {
		$.funcBar.animate({opacity: 0, duration: 500}, function() {
			$.funcBar.hide();
		});
	} else {
		$.funcBar.show();
		$.funcBar.animate({opacity: 1, duration: 500}, function() {
		});
	}
}

function closeWindowNoAnimation() {
	SaveReadingChapter();
	$.mangaReadingWindow.close();
}

function closeWindow() {
	SaveReadingChapter();
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.mangaReadingWindow.close({ transform: smallDown, duration:300 });
};

function SaveReadingChapter() {
	if (currentPage >= listImages.length / 2) {
		Alloy.Globals.readingChapters[args.mangaId] = args.chapter;
		Alloy.Globals.readingCount++;
		if (Alloy.Globals.readingCount % Alloy.Globals.popupAdNumb == 0) {
			revmob.showFullscreen();
			Alloy.Globals.readingCount = 0;
		}
	} 
};

function addImageView() {
	for (var i = 0; i < listImages.length; i++) {
		var image = Ti.UI.createImageView({
			// image: "http://truyentranhtuan.com" + listImages[i],
			width: '100%',
			top: 0,
			height: 'auto',
		});
	  if (Alloy.Globals.getOSType() != "iPhone OS") {
	  	image.height = '90%';
	  	images.push(image);
	  } else {
			var scrollView = Ti.UI.createScrollView({
			  contentWidth: '100%',
			  contentHeight: '100%',
			  backgroundColor: '#000',
			  showVerticalScrollIndicator: true,
			  showHorizontalScrollIndicator: true,
			  height: Ti.Platform.displayCaps.platformHeight - Alloy.Globals.getAdvHeight(),
			  width: '100%',
			  index: i,
			  top: 0,
			  maxZoomScale: 3,
				minZoomScale: 1
			});
			scrollView.add(image);
			images.push(scrollView);
	  }
 		Alloy.Globals.loadImage(image, "http://truyentranhtuan.com" + listImages[i], args.mangaId + args.chapter + i + "");
	}
};

function changePage() {
};