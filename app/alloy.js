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
Alloy.Globals.SERVER = 'http://54.251.14.29:3000';
Alloy.Globals.MAX_DISPLAY_ROW = 30;
Alloy.Globals.NEW_TIME_MILLISECONDS = 259200000;
Alloy.Globals.RATIO = 1;
Alloy.Globals.CURRENT_TAB = null;
Alloy.Globals.TAB_GROUP = null;
Alloy.Globals.currentLoadingView = null;
Alloy.Globals.FBPOST_LINK = 'https://www.facebook.com/pages/Truy%E1%BB%87n-tranh-Truy%E1%BB%87n-ng%E1%BA%AFn-Truy%E1%BB%87n-c%C6%B0%E1%BB%9Di/518980604798172';
Alloy.Globals.facebook = require('facebook');
Alloy.Globals.facebook.appid = "517068261714145";
Alloy.Globals.facebook.permissions = ['read_stream'];
// Alloy.Globals.facebook.permissions = ['publish_stream', 'read_stream'];
Alloy.Globals.facebook.forceDialogAuth = false;
Alloy.Globals.DEFAULT_PASSWORD = "truyenAlloy";
Alloy.Globals.DEFAULT_PUSH_CHANNEL = "news"; 
Alloy.Globals.listener = null;
Alloy.Globals.FB_USERNAME = null;

Alloy.Globals.listener = function(e, callback) {
	if (e.success) {
		if (Ti.Network.remoteDeviceUUID == undefined) {
			Alloy.Globals.loginUser(e.data.username);
		}
		Alloy.Globals.FB_USERNAME = e.data.username;
  	callback(e);
  } else if (e.error) {
  	log('Alloy.Globals.listener:');
		log(e.error);
  } else if (e.cancelled) {
		// cancel
  }
  //#### remove listener after finish
  Alloy.Globals.facebook.removeEventListener('click', Alloy.Globals.listener);
};

Alloy.Globals.facebookLogin = function(callback) {
	Alloy.Globals.facebook.authorize();
	Alloy.Globals.facebook.addEventListener('login', function(e) {
	  Alloy.Globals.listener(e, callback);
	});
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
Alloy.Globals.facebookGetUsername(function(fbUsername) {
	Alloy.Globals.loginUser(fbUsername);
});

//### user registeration on cloud
Alloy.Globals.registerUser = function(username) {
	Cloud.Users.create({
  	username: username,
	  password: Alloy.Globals.DEFAULT_PASSWORD,
	  password_confirmation: Alloy.Globals.DEFAULT_PASSWORD,
	}, function (e) {
		if (e.success) {
    	log("Alloy.Globals.registerUser: Created");
	  	Alloy.Globals.loginUser(username);
	  } else {
	  	log('Alloy.Globals.registerUser:');
	  	log(e.message);
    }
	});
};

Alloy.Globals.loginUser = function(username, callback) {
  Cloud.Users.login({
    login: username,
    password: Alloy.Globals.DEFAULT_PASSWORD
  }, function (e) {
		log("login:" + username);
  	if (e.success) {
  		var user = e.users[0];
			log("Alloy.Globals.loginUser: successfully");
 	   	Alloy.Globals.getDeviceToken(callback);
    } else {
      log("Error :");
      alert(e.message);
      if (e.code == 401) {
      	Alloy.Globals.registerUser(username);
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
	    alert(e.message);
	  },
	  callback:function(e) {
	    log("Alloy.Globals.getDeviceToken:"+JSON.stringify(e.data));
	    alert('new message from push');
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
	log(Ti.Network.remoteDeviceUUID);
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
	style:Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
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
	Ti.API.debug(JSON.stringify(para));
};

function showRequestResult(e) {
	log(e);
}

Alloy.Globals.fbPost = function(itemTitle, imageLink) {
	// log(imageLink);
	// var data = {
		// link: Alloy.Globals.FBPOST_LINK,
		// name: "TruyệnAlloy",
		// message: "Đang đọc truyện " + itemTitle + " trên điện thoại bằng TruyệnAlloy",
		// caption: "Phần mềm đọc truyện hay nhất trên mobile và tablet",
		// picture: imageLink,
		// description: "Hãy tải phần mềm để có thể đọc truyện mọi lúc mọi nơi, update liên tục, thông báo mỗi khi có chapter mới và rất nhiều tính năng khác. FREEEEEEE!!!!!",
	// };
  // Alloy.Globals.facebook.reauthorize(['publish_stream'], 'me', function(e){
      // if (e.success) {
          // // If successful, proceed with a publish call
          // // Alloy.Globals.facebook.dialog("feed", data, showRequestResult);
          // Alloy.Globals.facebook.requestWithGraphPath('me/feed', data, 'POST', showRequestResult);
      // } else {
        // if (e.error) {
        	// log("Alloy.Globals.facebook.reauthorize:");
          // log(e.error);
        // }
      // }
  // });
};

Alloy.Globals.openLoading = function(window) {
	loadingIcon.show();
	Alloy.Globals.currentLoadingView = loadingView;
	window.add(loadingView);
};

Alloy.Globals.closeLoading = function(window) {
	window.remove(Alloy.Globals.currentLoadingView);
	Alloy.Globals.currentLoadingView = null;
};

Alloy.Globals.isNew = function(checkDate) {
	var today = new Date();
	if (today.getTime() - checkDate.getTime() <= Alloy.Globals.NEW_TIME_MILLISECONDS) {
		return true;
	} else {
		return false;
	}
};

Alloy.Globals.isTablet = function() {
	var osname = Ti.Platform.osname;
	if (osname.search(/iphone/i) > -1) {
		return false;
	} else {
		return true;
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
  
  fullUrl += '&timestamp=' + Date.now();
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

Alloy.Globals.dynamicLoad = function(tableView, data) {
	var loadingIcon = Titanium.UI.createActivityIndicator({
		style:Ti.UI.iPhone.ActivityIndicatorStyle.DARK,
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
		tableView.scrollToIndex(lastRowIndex - Alloy.Globals.MAX_DISPLAY_ROW,{animated:true,position:Ti.UI.iPhone.TableViewScrollPosition.BOTTOM});
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
			Alloy.Globals.loginUser(user.username, function() {
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

Alloy.Globals.adv = function(type, callback) {
	// var advImage = Ti.UI.createImageView({
		// width: '100%',
		// height: 40,
		// image: Alloy.Globals.SERVER + '/images/adv/adv1.jpg',
	// });
	var advImage = Ti.UI.iOS.createAdView({
	 width: 'auto',
	 height: 50
	});
	callback(advImage);
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
