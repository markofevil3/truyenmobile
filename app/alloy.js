// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
Alloy.Globals.isTablet = function() {
	var osname = Ti.Platform.osname;
	if (osname.search(/iphone/i) > -1) {
		return false;
	} else {
		return true;
	}
};
// Alloy.Globals.SERVER = 'http://www.fulltruyen.com';
Alloy.Globals.SERVER = 'http://113.190.0.110:3000';
Alloy.Globals.MAX_DISPLAY_ROW = 30;
Alloy.Globals.NEW_TIME_MILLISECONDS = 259200000;
Alloy.Globals.RATIO = 1;
Alloy.Globals.CURRENT_TAB = null;
Alloy.Globals.TAB_GROUP = null;
Alloy.Globals.currentLoadingView = null;
Alloy.Globals.FBPOST_LINK = 'https://www.facebook.com/fulltruyen?ref=hl';
Alloy.Globals.facebook = require('facebook');
Alloy.Globals.facebook.appid = "517068261714145";
Alloy.Globals.facebook.permissions = ['read_stream'];
// Alloy.Globals.facebook.permissions = ['publish_stream', 'read_stream'];
Alloy.Globals.facebook.forceDialogAuth = false;
Alloy.Globals.DEFAULT_PASSWORD = "truyenAlloy";
Alloy.Globals.DEFAULT_PUSH_CHANNEL = "news"; 
Alloy.Globals.fbLoginListener = false;
Alloy.Globals.FB_USERNAME = null;
Alloy.Globals.homeWindowStack = [];
Alloy.Globals.readingChapters = {};
Alloy.Globals.readingCount = 0;
Alloy.Globals.popupAdNumb = 3;
Alloy.Globals.localAudioFolder = Titanium.Filesystem.applicationDataDirectory +'/truyenAudio';
Alloy.Globals.readingFontSize = Alloy.Globals.isTablet() ? 26 : 16;
Alloy.Globals.advPublisher = 0; // 0: iad - 1: admob
Alloy.Globals.admobPublisher = { "android": "a1524cf9df9881d",
                      					 "iphone": "a15283aa0b43c3f",
																 "ipad": "a15283aa5be9001"
															 };

function RevMob(appIds) {
  var moduleNames = { 'iPhone OS': 'com.revmob.titanium',  'android': 'com.revmob.ti.android' };
  var revmobModule = require(moduleNames[Ti.Platform.name]);
  revmobModule.startSession(appIds[Ti.Platform.name]);
  return revmobModule;
}

var revmob = new RevMob({ 'iPhone OS': '52443a8f95b82813ab000035',  'android': 'copy your RevMob Android App ID here' });

var Inmobi = require('ti.inmobi');
var inmobiAppId = "35d83d6ca730455780ae455dbf12091a";
Inmobi.initWithParams(inmobiAppId, {
	/* Set User Information - Optional (for better Ad Targeting) */
	"logLevel": Inmobi.CONSTANTS.LOGLEVEL_DEBUG,
	"gender": Inmobi.CONSTANTS.GENDER_MALE,
	"education": Inmobi.CONSTANTS.EDUCATION_HIGHSCHOOLORLESS,
	"ethnicity": Inmobi.CONSTANTS.ETHNICITY_ASIAN, 
	"dob": "29-11-1984",
	"income": "10000",
	"age": "30",
	"maritalStatus": Inmobi.CONSTANTS.MARITAL_STATUS_SINGLE,
	"hasChildren": Inmobi.CONSTANTS.TRUE,
	"sexualOrientation": Inmobi.CONSTANTS.SEXUAL_ORIENTATION_STRAIGHT,
	"language": "eng",
	"postalCode": "10000",
	"areaCode": "435",
	"interests": "swimming, adventure sports",
	"deviceIdMasks": [Inmobi.CONSTANTS.EXCLUDE_ADVERTISER_ID, Inmobi.CONSTANTS.EXCLUDE_ODIN1, Inmobi.CONSTANTS.EXCLUDE_UDID]
});

log("## " + Inmobi.CONSTANTS.ADSIZE_320X50);

Alloy.Globals.createInmobiBannerAdd = function() {
	var bannerAd = Inmobi.createBannerAd({
	  "backgroundColor":"transparent",
	  "top": 0,
	  "left": 0,
	  "width":320,
	  "height":50,
	  "adSize": 15,
	  "refreshInterval": "30",
	  // "keywords": "games, chess, magazines",
	  // "additionalParams": { "myname": "nkapser" },
	  // "refTagKey": "from",
	  // "refTagValue": "inmobi"
	});
	bannerAd.addEventListener('onAdRequestCompleted', function(){
	Ti.API.info("banner Ad Request Completed!");
	});
	bannerAd.addEventListener('onAdRequestFailed', function(e){
		Ti.API.info("banner Ad Request Failed! "+e.message);
	});
	bannerAd.addEventListener('onClick', function(){
		Ti.API.info("Banner was clicked!");
	});
	bannerAd.addEventListener('beforePresentScreen', function(){
		Ti.API.info("Banner will go fullscreen!");
	});
	bannerAd.addEventListener('beforeDismissScreen', function(){
		Ti.API.info("Banner Ad will dismiss fullscreen!");
	});
	bannerAd.addEventListener('onDismissScreen', function(){
		Ti.API.info("Banner Ad dismissed fullscreen!");
	});
	bannerAd.addEventListener('onLeaveApplication', function(){
		Ti.API.info("Banner Ad will leave application!");
	});
	return bannerAd;
};

Alloy.Globals.setAdmobPublisher = function(publisher, admobPublishers) {
	Alloy.Globals.advPublisher = publisher;
	Alloy.Globals.admobPublisher = admobPublishers;
};

Alloy.Globals.saveUserData = function() {
	var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'userData.txt');
	f.write(JSON.stringify(Alloy.Globals.readingChapters));
};

var Admob = require('ti.admob');
var GA = require('analytics.google');
var tracker = GA.getTracker("UA-44461245-1");

Alloy.Globals.track = function(cate, action, label) {
	tracker.trackEvent({
		category: cate,
		action: action,
		label: label,
		value: 1
	});
};

Alloy.Globals.listeners = function(e, callback) {
	if (e.success) {
		if (Ti.Network.remoteDeviceUUID == undefined) {
			Alloy.Globals.loginUser(Titanium.Platform.id);
		}
		Alloy.Globals.FB_USERNAME = e.data.username;
		if (callback != null) {
	  	callback(e);
		}
  } else if (e.error) {
		log(e.error);
  } else if (e.cancelled) {
		// cancel
  }
  //#### remove listener after finish
  // if (Alloy.Globals.listener != null) {
	  // Alloy.Globals.facebook.removeEventListener('click', Alloy.Globals.listener);
  // }
};

Alloy.Globals.fbLoginCallback = null;

Alloy.Globals.facebookLogin = function(callback) {
	Alloy.Globals.facebook.authorize();
	Alloy.Globals.fbLoginCallback = callback;
	if (!Alloy.Globals.fbLoginListener) {
		Alloy.Globals.fbLoginListener = true;
		Alloy.Globals.listener = Alloy.Globals.facebook.addEventListener('login', function(e) {
	  	Alloy.Globals.listeners(e, Alloy.Globals.fbLoginCallback);
	  	Alloy.Globals.fbLoginCallback = null;
		});
	}
};

Alloy.Globals.facebookGetUsername = function(callback) {
	if (Alloy.Globals.facebook.loggedIn != 0) {
		Alloy.Globals.facebook.requestWithGraphPath('/' + Alloy.Globals.facebook.getUid(), {}, 'GET', function(user) {
      callback(JSON.parse(user.result).username);
		});
	}
};

//########## PUSH NOTIFICATIOn
var Cloud = require('ti.cloud');
var deviceToken;
// Alloy.Globals.facebookGetUsername(function(fbUsername) {
	// Alloy.Globals.loginUser(fbUsername);
// });
//### user registeration on cloud
Alloy.Globals.registerUser = function(username) {
	Cloud.Users.create({
  	username: username,
	  password: Alloy.Globals.DEFAULT_PASSWORD,
	  password_confirmation: Alloy.Globals.DEFAULT_PASSWORD,
	}, function (e) {
		if (e.success) {
    	log("Alloy.Globals.registerUser: Created");
	  	Alloy.Globals.loginUser(username, function() {
	  		Alloy.Globals.subscribePush(Alloy.Globals.DEFAULT_PUSH_CHANNEL);
	  	});
	  } else {
	  	log('Alloy.Globals.registerUser:');
	  	log(e.message);
    }
	});
};

Alloy.Globals.loginUser = function(username, callback) {
  Cloud.Users.login({
    login: Titanium.Platform.id,
    password: Alloy.Globals.DEFAULT_PASSWORD
  }, function (e) {
		log("login:" + username);
  	if (e.success) {
  		var user = e.users[0];
			log("Alloy.Globals.loginUser: successfully");
 	   	Alloy.Globals.getDeviceToken(callback);
    } else {
      log("Error :");
      log(e.message);
      if (e.code == 401) {
      	Alloy.Globals.registerUser(Titanium.Platform.id);
      }
    }
  });
};

Alloy.Globals.getDeviceToken = function(callback){
  Titanium.Network.registerForPushNotifications({
    types: [
      Titanium.Network.NOTIFICATION_TYPE_BADGE,
      Titanium.Network.NOTIFICATION_TYPE_ALERT,
      Titanium.Network.NOTIFICATION_TYPE_SOUND
    ],
	  success:function(e) {
	    log(e.deviceToken);
			if (callback) {
				callback();
			}
	  },
	  error:function(e) {
	    log("ErrorDeviceToken: ");
	    log(e.message);
	  },
	  callback:function(e) {
	    log("Alloy.Globals.getDeviceToken:"+JSON.stringify(e.data));
	    log('new message from push');
	  }
  });
};

Alloy.Globals.subscribePush = function(channel) {
	Cloud.PushNotifications.subscribe({
    channel: channel,
    device_token: Ti.Network.remoteDeviceUUID
	}, function (e) {
    if (e.success) {
      log('Success :'+((e.error && e.message) || JSON.stringify(e)));
    } else {
      log('ErrorSubscribe:' + ((e.error && e.message) || JSON.stringify(e)));
    }
	});
};

Alloy.Globals.unsubscribePush = function(channel) {
	Cloud.PushNotifications.unsubscribe({
    channel: channel,
    device_token: Ti.Network.remoteDeviceUUID
	}, function (e) {
    if (e.success) {
      log('Success :'+((e.error && e.message) || JSON.stringify(e)));
    } else {
      log('ErrorUnSubscribe:' + ((e.error && e.message) || JSON.stringify(e)));
    }
	});
};

//############### END PUSH NOTIFICATIOn
var loadingIcon = Titanium.UI.createActivityIndicator({
	style:Ti.Platform.name == 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.DARK
});
var loadingView = Titanium.UI.createView({
	backgroundColor: 'rgba(0,0,0,0.5)',
	backgroundImage: 'NONE',
	width: Titanium.UI.FILL,
	height: Titanium.UI.FILL,
	id: "loadingView",
	top: 0,
	zIndex: 9999
});
loadingView.add(loadingIcon);

function log(para) {
	Ti.API.info(JSON.stringify(para));
};

function showRequestResult(e) {
}

Alloy.Globals.fbPost = function(itemTitle, imageLink) {
	var data = {
		link: Alloy.Globals.FBPOST_LINK,
		name: itemTitle + " - Full Truyện App",
		message: 'Đang đọc truyện "' + itemTitle + '" trên điện thoại bằng Full Truyện',
		caption: "Phần mềm đọc truyện miễn phí trên mobile và tablet",
		picture: imageLink,
		description: "Hãy tải phần mềm để có thể đọc truyện mọi lúc mọi nơi, update liên tục, thông báo mỗi khi có chapter mới và rất nhiều tính năng khác. FREEEEEEE!!!!!",
	};
  Alloy.Globals.facebook.reauthorize(['publish_stream'], 'me', function(e){
      if (e.success) {
          // If successful, proceed with a publish call
          // Alloy.Globals.facebook.dialog("feed", data, showRequestResult);
          Alloy.Globals.facebook.requestWithGraphPath('me/feed', data, 'POST', showRequestResult);
      } else {
        if (e.error) {
        	log("Alloy.Globals.facebook.reauthorize:");
          log(e.error);
        }
      }
  });
};

Alloy.Globals.openLoading = function(window) {
	loadingIcon.show();
	Alloy.Globals.currentLoadingView = loadingView;
	window.add(loadingView);
};

Alloy.Globals.closeLoading = function(window) {
	if (Alloy.Globals.currentLoadingView !=null) {
		window.remove(Alloy.Globals.currentLoadingView);
		Alloy.Globals.currentLoadingView = null;
	}
};

Alloy.Globals.isNew = function(checkDate) {
	var today = new Date();
	if (today.getTime() - checkDate.getTime() <= Alloy.Globals.NEW_TIME_MILLISECONDS) {
		return true;
	} else {
		return false;
	}
};

Alloy.Globals.getDeviceType = function() {
	var isTablet = Alloy.Globals.isTablet();
	var device;
	if (isTablet) {
		return 1;
	} else {
		return 0;
	}
};

Alloy.Globals.getOSType = function() {
	return Titanium.Platform.name;
};

Alloy.Globals.backButton = function(window) {
	var backbutton = Titanium.UI.createButton({
		backgroundImage:'/common/back.png',
		width:50,
		height:30
	});
	backbutton.addEventListener('click', function() {
		window.close({animated:true});
	});
	return backbutton;
};

Alloy.Globals.getAjax = function(url, query, callback) {
	var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
	    if (callback) {
	      callback(this.responseText);
	    }
    },
    onerror: function(e) {
			Ti.API.debug(e.error);
			if (Titanium.Network.networkType == Titanium.Network.NETWORK_NONE){
				alert("Không có internet!");
				return;
			} else {
				callback(JSON.stringify({error: true}));
			}
    },
    timeout: 10000
	});
	var fullUrl = Alloy.Globals.SERVER + url;
	if (query) {
    if (isHash(query)) {
      var isFirstParameter = true;
      for (var key in query) {
        fullUrl += (isFirstParameter ? '?' : '&');
        isFirstParameter = false;

        fullUrl += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]);
      }
    } else if (query.length > 0) {
      fullUrl += '?' + query;
    }
  }
  
  // fullUrl += '&timestamp=' + Date.now();
	xhr.open("GET", fullUrl);
	xhr.send();
};

Alloy.Globals.dynamicSort = function(property, type) {
  return function (a,b) {
    return (a[property] < b[property]) ? (-1 * type) : (a[property] > b[property]) ? (1 * type) : 0;
  };
};

Alloy.Globals.dynamicSortNumber = function(property, type) {
  return function (a,b) {
    return (parseFloat(a[property]) < parseFloat(b[property])) ? (-1 * type) : (parseFloat(a[property]) > parseFloat(b[property])) ? (1 * type) : 0;
  };
};

Alloy.Globals.dynamicSortDate = function(property, type) {
  return function (a,b) {
	  a = new Date(a[property]);
  	b = new Date(b[property]);
    return (a < b) ? (-1 * type) : (a > b) ? (1 * type) : 0;
  };
};

Alloy.Globals.dynamicLoad = function(tableView, data) {
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style: Ti.Platform.name == 'iPhone OS' ? Ti.UI.iPhone.ActivityIndicatorStyle.DARK : Ti.UI.ActivityIndicatorStyle.DARK,
	});
	var loadingView = Titanium.UI.createView();
	loadingView.add(loadingIcon);
	var loadingRow = Ti.UI.createTableViewRow({
		height: 40,
	});
	loadingRow.add(loadingView);
	var lastRowIndex = tableView.data[0].rowCount;
	var updating = false;
	
	function beginUpdate() {
		updating = true;
		tableView.appendRow(loadingRow);
		loadingIcon.show();
		setTimeout(endUpdate, 500);
	};
	// function selectItem(item) {
		// item.addEventListener('click', function(e) {
			// var Window = require('ui/common/Reading');
			// new Window(item);
		// });
	// };
	function endUpdate() {
		updating = false;
		loadingIcon.hide();
		tableView.deleteRow(lastRowIndex - 1, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		var nextRowIndex = lastRowIndex - 1 + Alloy.Globals.MAX_DISPLAY_ROW;
		if (nextRowIndex > data.length) {
			nextRowIndex = data.length;
		}
		for (var i = lastRowIndex - 1; i < nextRowIndex; i++) {
			var row = Ti.UI.createTableViewRow({
		    backgroundImage: '/common/bookshelfBackground.png',
				height: 40,
				chapterId: data[i]._id,
				id: tableView.id,
			});
			var labelChapter = Ti.UI.createLabel({
				text: 'Chapter ' + data[i].chapter,
				color: '#fff',
				textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
				font: { fontWeight: 'bold', fontSize: 17, fontFamily: 'Chalkboard SE' }
			});
			var labelTitle = Ti.UI.createLabel({
				text: data[i].title,
				left: 105 * Alloy.Globals.RATIO
			});
			row.add(labelChapter);
			row.add(labelTitle);
			selectItem(row);
			tableView.appendRow(row, { animationStyle:Titanium.UI.iPhone.RowAnimationStyle.NONE });
		}
		lastRowIndex += Alloy.Globals.MAX_DISPLAY_ROW;
    if (Alloy.Globals.getOSType() == "iPhone OS") {
  		tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
  	}
	};
	var lastDistance = 0;
	tableView.addEventListener('scroll',function(e) {
		lastRowIndex = tableView.data[0].rowCount;
		var offset = e.contentOffset.y;
		var height = e.size.height;
		var total = offset + height;
		var theEnd = e.contentSize.height;
		var distance = theEnd - total;
	
		if (distance < lastDistance) {
			var nearEnd = theEnd * 1;
			if (!updating && (total >= nearEnd) && lastRowIndex < data.length && tableView.data[0].rows[0].chapterId == data[0]._id 
			&& (tableView.data[0].rows[1] && tableView.data[0].rows[1].chapterId == data[1]._id)
			&& tableView.data[0].rows[lastRowIndex - 1].chapterId != data[data.length -1]._id && lastRowIndex >= Alloy.Globals.MAX_DISPLAY_ROW) {
				beginUpdate();
			}
		}
		lastDistance = distance;
	});
};

Alloy.Globals.checkUnlockFunction = function(type, user, callback) {
	Alloy.Globals.getAjax('/checkUnlockFunction', {
		userId: user.id,
		username: user.username,
		fullName: user.name,
		type: type,
	},
	function(response) {
		var data = JSON.parse(response).data;
		callback(data);
	});
};

Alloy.Globals.sendUnlockRequest = function(type, userId, pTime) {
	Alloy.Globals.getAjax('/unlockFunction', {
		userId: user.id,
		type: type,
		time: pTime
	},
	function(response) {
	});
};

Alloy.Globals.addFavorite = function(itemId, itemType, user, title, imageLink, callback) {
	Alloy.Globals.getAjax('/addFavorite', {
		userId: user.id,
		username: user.username,
		fullName: user.name,
		itemId: itemId,
		itemType: itemType,
		// deviceToken: Ti.Network.remoteDeviceUUID
	},
	function(response) {
		log("DeviceTOKEN:" + Ti.Network.remoteDeviceUUID);
		if (Ti.Network.remoteDeviceUUID != undefined) {
			Alloy.Globals.subscribePush(itemId);
		} else {
			Alloy.Globals.loginUser(Titanium.Platform.id, function() {
				Alloy.Globals.subscribePush(itemId);
			});
		}
		var data = JSON.parse(response).data;
		Alloy.Globals.fbPost(title, imageLink);
		if (data == 'success') {
			// Alloy.Globals.subscribePush(itemId);
			callback();
		}
	});
};

Alloy.Globals.removeUTF8 = function(str) {
  str = str.toLowerCase();  
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");  
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");  
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");  
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");  
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");  
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");  
  str = str.replace(/đ/g,"d");  
  str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-"); 
  str= str.replace(/-+-/g,"-");
  str= str.replace(/^\-+|\-+$/g,"");
  return str;  
};

Alloy.Globals.getAdvPublisherId = function() {
	return Alloy.Globals.admobPublisher[Titanium.Platform.osname];
	// switch(Titanium.Platform.osname) {
		// case 'android':
			// return 'a1524cf9df9881d';
			// break;
		// case 'iphone':
			// return 'a15242fc9991b03';
			// break;
		// case 'ipad':
			// return 'a15242fe704686c';
			// break;
	// }
};

Alloy.Globals.getAdvHeight = function() {
	switch(Titanium.Platform.osname) {
	case 'android':
		return 75;
		break;
	case 'iphone':
		return 50;
		break;
	case 'ipad':
		if (Alloy.Globals.advPublisher == 0) {
			return 66;
		} else {
			return 90;
		}
		break;
	}
};

Alloy.Globals.adv = function(type, callback) {
	alert(Titanium.Locale.currentLocale);
	callback(Alloy.Globals.createInmobiBannerAdd());
	return;
	if (Alloy.Globals.advPublisher == 0) {
	  var advImage = Ti.UI.iOS.createAdView({
		 width: 'auto',
	   height: 'auto'
	  });
	  advImage.addEventListener("error", function(e) {
	    if (e.code != 2) {
	            // use another adv
	    }
	  });
	  callback(advImage);
	} else {
		var	advImage = Admob.createView({
	    width: Ti.Platform.displayCaps.platformWidth,
	    height: Alloy.Globals.getAdvHeight(),
	    publisherId: Alloy.Globals.getAdvPublisherId(), // You can get your own at http: //www.admob.com/
	    testing: false,
	    dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
	    gender: 'male',
	    keywords: ''
	 	});
		Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
		Ti.Geolocation.distanceFilter = 0;
		Ti.Geolocation.purpose = 'To show you local ads, of course!';
		Ti.Geolocation.getCurrentPosition(function reportPosition(e) {
			var advImage;
	    if (!e.success || e.error) {
	  		advImage = Admob.createView({
			    width: Ti.Platform.displayCaps.platformWidth,
			    height: Alloy.Globals.getAdvHeight(),
			    publisherId: Alloy.Globals.getAdvPublisherId(), // You can get your own at http: //www.admob.com/
			    testing: false,
			    dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
			    gender: 'male',
			    keywords: ''
			 	});
	    }
	    else {
				advImage = Admob.createView({
			    width: Ti.Platform.displayCaps.platformWidth,
			    height: Alloy.Globals.getAdvHeight(),
			    publisherId: Alloy.Globals.getAdvPublisherId(), // You can get your own at http: //www.admob.com/
			    testing: false,
			    dateOfBirth: new Date(1988, 5, 20, 12, 1, 1),
			    gender: 'male',
			    keywords: '',
			    location: e.coords
			 	});
	    }
	    callback(advImage);
		});
	}
};

function isHash(obj) {
  return obj.constructor == Object;
};

Alloy.Globals.loadImage = function(imageView, url, newName) {
	// newName = newName + "." + Alloy.Globals.getFileExtFromUrl(url);
	var xhr = Titanium.Network.createHTTPClient({
		onload: function() {
			imageView.image = this.responseData;
		},
    onerror: function(e) {
			Ti.API.info('error loading ' + url);
			imageView.image = "/common/default_image.jpg";
    },
		timeout: 10000
	});
	xhr.open('GET', url);
	// on iOS, you can use the file property to save a downloaded file
	// though you must set it after calling open()
	xhr.send();
};

Alloy.Globals.getFileExtFromUrl = function(urlString) {
	var detectKey = urlString.lastIndexOf(".");
	return urlString.substr(detectKey + 1, urlString.length);
};

Alloy.Globals.getNewestChapter = function(chapters) {
	var newest = 0;
	for (var i = 0; i < chapters.length; i++) {
		if (parseFloat(chapters[i].chapter) > newest) {
			newest = parseFloat(chapters[i].chapter);
		}
	}
	return newest;
};

Alloy.Globals.checkAudioExist = function(audioName) {
  var file = Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder, audioName);
  return file.exists();
};

Alloy.Globals.removeAudioFile = function(audioName) {
  var file = Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder, audioName);
  if (file.exists()) {
  	file.deleteFile();
  }
};

Alloy.Globals.isDownloadingAudio = false;
Alloy.Globals.downloadingAudioName = null;
Alloy.Globals.downloadAudioRequest;
Alloy.Globals.STORY_AUDIO_CONTROLLER;
Alloy.Globals.MAX_DOWNLOADED_FILE = 10;

Alloy.Globals.isMaxDownloadFile = function() {
	return Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder).getDirectoryListing().length > Alloy.Globals.MAX_DOWNLOADED_FILE;
};

Alloy.Globals.downloadAudio = function(fileName, downloadLink, progressBar) {
  var folder = Titanium.Filesystem.getFile(Alloy.Globals.localAudioFolder);
  if (!folder.exists()){
      folder.createDirectory(); 
  }
	if (Alloy.Globals.isMaxDownloadFile()) {
		alert("Đã tải quá " + Alloy.Globals.MAX_DOWNLOADED_FILE + " truyện. Xoá bớt để tải tiếp!");
		return false;
	}
	Alloy.Globals.isDownloadingAudio = true;
	Alloy.Globals.downloadingAudioName = fileName;
  log(folder.getDirectoryListing());
	Alloy.Globals.downloadAudioRequest = Titanium.Network.createHTTPClient({
    onload: function() {
      var f = Ti.Filesystem.getFile(Alloy.Globals.localAudioFolder, fileName);
      f.write(this.responseData); // write to the file
      Alloy.Globals.isDownloadingAudio = false;
    	Alloy.Globals.downloadingAudioName = null;
  		Alloy.Globals.STORY_AUDIO_CONTROLLER.finishDownload(fileName);
  		Ti.App.fireEvent('audioDownloaded', {fileName: fileName});
    },
    timeout: 10000
	});
	Alloy.Globals.downloadAudioRequest.ondatastream = function(e) {
    Alloy.Globals.STORY_AUDIO_CONTROLLER.updateDownloadProgress(e.progress);
    // Ti.API.info('Progess - ' + fileName + ': ' + (e.progress * 100));
	};
	Alloy.Globals.downloadAudioRequest.open('GET', downloadLink);
	Alloy.Globals.downloadAudioRequest.send();
	return true;
};

Alloy.Globals.cancelDownloadAudio = function() {
  Alloy.Globals.isDownloadingAudio = false;
	Alloy.Globals.downloadingAudioName = null;
	if (Alloy.Globals.downloadAudioRequest != null) {
		Alloy.Globals.downloadAudioRequest.abort();
	}
	Alloy.Globals.STORY_AUDIO_CONTROLLER.hideDownloadProgress();
};

Alloy.Globals.convertTime = function(timer) {
	var tempVal;
	if (timer <= 0) {
		return "00:00:00";
	}
		
	var timeString = "";
	if (timer > 3600) {
		tempVal = Math.floor(timer / 3600);
		if (tempVal < 10) {
			timeString += "0" + tempVal + ":";
		} else {
			timeString += tempVal + ":";
		}
		timer -= parseInt(Math.floor(timer / 3600) * 3600);
	} else {
		timeString += "00:";
	}
	
	if (timer >= 60) {
		tempVal = Math.floor(timer / 60);
		if (tempVal < 10) {
			timeString += "0" + tempVal + ":";
		} else {
			timeString += tempVal + ":";
		}
		timer -= parseInt(Math.floor(timer / 60) * 60);
	} else {
		timeString += "00:";
	}
	
	if (timer < 10) {
		timeString += "0" + timer;
	} else {
		timeString += timer;
	}
		
	return timeString;
};