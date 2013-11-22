function Controller() {
    function sendSupport() {
        if (textArea.value.length > 20) {
            sendButton.enabled = false;
            Alloy.Globals.getAjax("/support", {
                content: textArea.value,
                email: emailText.value
            }, function() {
                alert("Yêu cầu của bạn đã được gửi đi!");
                sendButton.enabled = true;
                textArea.value = "";
                emailText.value = "";
            });
        } else alert("Nội dung quá ngắn!");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "support";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.supportWindow = Ti.UI.createWindow({
        backgroundImage: "/common/shellBg.png",
        barImage: "/common/top.png",
        id: "supportWindow",
        title: "Yêu Cầu Truyện"
    });
    $.__views.supportWindow && $.addTopLevelView($.__views.supportWindow);
    $.__views.wrapperView = Ti.UI.createScrollView({
        width: "100%",
        height: "100%",
        backgroundColor: "#eabf8b",
        backgroundImage: "/common/shellBg.png",
        layout: "vertical",
        id: "wrapperView"
    });
    $.__views.supportWindow.add($.__views.wrapperView);
    $.__views.textLabel = Ti.UI.createLabel(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            text: "Để yêu cầu truyện, bạn nên cung cấp đầy đủ thông tin về truyện: tên truyện, tác giả, quốc gia, link truyện(nếu có) ...",
            color: "#fff",
            font: {
                fontSize: 15,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            text: "Để yêu cầu truyện, bạn nên cung cấp đầy đủ thông tin về truyện: tên truyện, tác giả, quốc gia, link truyện(nếu có) ...",
            color: "#fff",
            font: {
                fontSize: 28,
                fontStyle: "italic"
            },
            textAlign: Titanium.UI.TEXT_ALIGNMENT_LEFT
        });
        _.extend(o, {
            id: "textLabel"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.textLabel);
    $.__views.emailText = Ti.UI.createTextField(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            width: "95%",
            hintText: "Email",
            keyboardType: Ti.UI.KEYBOARD_EMAIL,
            top: 10,
            font: {
                fontSize: 18
            }
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            width: "95%",
            hintText: "Email",
            keyboardType: Ti.UI.KEYBOARD_EMAIL,
            top: 10,
            font: {
                fontSize: 25
            }
        });
        _.extend(o, {
            id: "emailText"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.emailText);
    $.__views.contentTextArea = Ti.UI.createTextArea(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            borderWidth: 2,
            borderColor: "#bbb",
            borderRadius: 5,
            color: "#000",
            font: {
                fontSize: 18
            },
            keyboardType: Ti.UI.KEYBOARD_DEFAULT,
            returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
            textAlign: "left",
            hintText: "Nội dung...",
            width: "95%",
            height: 170,
            top: 10,
            suppressReturn: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            borderWidth: 2,
            borderColor: "#bbb",
            borderRadius: 5,
            color: "#000",
            font: {
                fontSize: 32
            },
            keyboardType: Ti.UI.KEYBOARD_DEFAULT,
            returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
            textAlign: "left",
            hintText: "Nội dung...",
            width: "95%",
            height: 350,
            top: 30,
            suppressReturn: false
        });
        _.extend(o, {
            id: "contentTextArea"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.contentTextArea);
    $.__views.sendButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "Send",
            width: 70,
            height: 30,
            top: 10,
            font: {
                fontSize: 14,
                fontWeight: "bold"
            },
            backgroundColor: "33CC33",
            borderWidth: 1,
            borderColor: "#2EB82E",
            borderRadius: 5
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "Send",
            width: 140,
            height: 60,
            top: 15,
            font: {
                fontSize: 25,
                fontWeight: "bold"
            },
            backgroundColor: "33CC33",
            borderWidth: 1,
            borderColor: "#2EB82E",
            borderRadius: 5
        });
        _.extend(o, {
            id: "sendButton"
        });
        return o;
    }());
    $.__views.wrapperView.add($.__views.sendButton);
    sendSupport ? $.__views.sendButton.addEventListener("click", sendSupport) : __defers["$.__views.sendButton!click!sendSupport"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var textArea = $.contentTextArea;
    var emailText = $.emailText;
    var sendButton = $.sendButton;
    exports.openMainWindow = function() {
        $.supportWindow.leftNavButton = Alloy.Globals.backButton($.supportWindow);
        $.wrapperView.addEventListener("singletap", function() {
            textArea.blur();
        });
        Alloy.Globals.CURRENT_TAB.open($.supportWindow);
    };
    __defers["$.__views.sendButton!click!sendSupport"] && $.__views.sendButton.addEventListener("click", sendSupport);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;