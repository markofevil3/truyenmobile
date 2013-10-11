function Controller() {
    function closeWindow() {
        var smallDown = Titanium.UI.create2DMatrix();
        smallDown = smallDown.scale(0);
        $.storyReadingWindow.close({
            transform: smallDown,
            duration: 300
        });
    }
    function changeTextSize(e) {
        var ratio = Alloy.Globals.isTablet() ? 1.8 : 1;
        $.contentLabel.font = "0" == e.source.dataType ? {
            fontSize: 18 * ratio
        } : {
            fontSize: 22 * ratio
        };
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "storyReading";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.storyReadingWindow = Ti.UI.createWindow({
        backgroundColor: "#f3f3f3",
        id: "storyReadingWindow"
    });
    $.__views.storyReadingWindow && $.addTopLevelView($.__views.storyReadingWindow);
    $.__views.topBar = Ti.UI.createView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: 40,
            backgroundColor: "#fff",
            top: 0
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: 70,
            backgroundColor: "#fff",
            top: 0
        });
        _.extend(o, {
            id: "topBar"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.topBar);
    $.__views.textSmallButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 30,
            height: 30,
            right: 115,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 13
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 50,
            height: 50,
            right: 175,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textSmallButton",
            dataType: "0"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textSmallButton);
    changeTextSize ? $.__views.textSmallButton.addEventListener("click", changeTextSize) : __defers["$.__views.textSmallButton!click!changeTextSize"] = true;
    $.__views.textBigButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: 30,
            height: 30,
            right: 75,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 19
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 3
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: 50,
            height: 50,
            right: 115,
            title: "A",
            color: "#fff",
            font: {
                fontWeight: "bold",
                fontSize: 38
            },
            backgroundColor: "#222",
            backgroundImage: "NONE",
            selectedColor: "#333",
            borderRadius: 6
        });
        _.extend(o, {
            id: "textBigButton",
            dataType: "1"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.textBigButton);
    changeTextSize ? $.__views.textBigButton.addEventListener("click", changeTextSize) : __defers["$.__views.textBigButton!click!changeTextSize"] = true;
    $.__views.closeButton = Ti.UI.createButton(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            title: "close",
            width: 60,
            height: 30,
            right: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            font: {
                fontWeight: "bold",
                fontSize: 14
            },
            selectedColor: "#333",
            color: "#CCCCCC"
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            title: "close",
            width: 100,
            height: 50,
            right: 5,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#ffffff",
            backgroundColor: "#222",
            backgroundImage: "NONE",
            font: {
                fontWeight: "bold",
                fontSize: 26
            },
            selectedColor: "#fff",
            color: "#cb0a00"
        });
        _.extend(o, {
            id: "closeButton"
        });
        return o;
    }());
    $.__views.topBar.add($.__views.closeButton);
    closeWindow ? $.__views.closeButton.addEventListener("click", closeWindow) : __defers["$.__views.closeButton!click!closeWindow"] = true;
    $.__views.contentView = Ti.UI.createScrollView(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            width: "100%",
            backgroundColor: "#fff",
            top: 40
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            width: "100%",
            backgroundColor: "#fff",
            top: 70
        });
        _.extend(o, {
            id: "contentView"
        });
        return o;
    }());
    $.__views.storyReadingWindow.add($.__views.contentView);
    $.__views.contentWrapper = Ti.UI.createView({
        width: "96%",
        height: "100%",
        id: "contentWrapper"
    });
    $.__views.contentView.add($.__views.contentWrapper);
    $.__views.contentLabel = Ti.UI.createTextArea(function() {
        var o = {};
        _.extend(o, {});
        Alloy.isHandheld && _.extend(o, {
            width: "100%",
            height: "100%",
            top: 5,
            font: {
                fontSize: 18
            },
            editable: false
        });
        _.extend(o, {});
        Alloy.isTablet && _.extend(o, {
            width: "100%",
            height: "100%",
            top: 5,
            font: {
                fontSize: 36
            },
            editable: false
        });
        _.extend(o, {
            id: "contentLabel"
        });
        return o;
    }());
    $.__views.contentWrapper.add($.__views.contentLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    exports.openMainWindow = function() {
        var data = "  Khi tôi tỉnh dậy, phíabên kia giường thật lạnh lẽo. Tôi duỗi các ngón tay, tìm kiếm hơi ấm của Primnhưng chỉ chạm phải bề mặt thô ráp của tấm ga nệm bằng vải bố. Hẳn con bé đã gặpác mộng và tót sang ngủ với mẹ. Cũng phải thôi. Nó hẳn đã mơ về ngày chiêuquân.\n\n<p>Tôi chống cùi chỏ nhỏmdậy. Phòng ngủ đủ sáng để tôi có thể nhìn thấy họ. Em gái tôi, Prim, đang cuộntròn và rúc vào người mẹ, má hai người áp vào nhau. Trong khi ngủ, mẹ tôi trôngtrẻ hơn, tuy vẫn xanh xao nhưng không tiều tụy lắm. Gương mặt Prim tươi tắn nhưhạt mưa, đáng yêu như chính cái tên của nó, loài hoa anh thảo. Mẹ tôi cũng mộtthời đẹp lắm. Ít ra, người ta đã kể với tôi như thế.</p><p>Ngồi sát đầu gối Primvà canh chừng cho con bé là con mèo xấu nhất quả đất. Mũi bẹt, một bên tai sứtphân nửa, còn mắt thì có màu vàng ủng như quả bí thối. Prim đặt tên cho nó làHũ Bơ và khăng khăng rằng bộ lông vàng xỉn của nó giống hệt màu hoa Hũ Bơ[1] rựcrỡ. Nó ghét tôi lắm. Hoặc ít nhất cũng là dè chừng tôi. Dù chuyện xảy ra cáchđây đã nhiều năm, chắc nó vẫn còn nhớ rằng tôi đã cố dìm nó vào cái xô như thếnào sau khi được Prim mang về nhà. Con mèo con ốm đói, bụng trương lên vì sán,người thì lúc nhúc rận. Điều duy nhất tôi bận tâm là phải tốn thêm một miệng ănnữa. Nhưng Prim nài nỉ dữ quá, còn khóc nữa, vậy nên tôi đành cho nó ở lại. Conmèo xem chừng cũng ngoan. Mẹ tôi bắt hết rận cho nó và Hũ Bơ quả có tài bắt chuộtbẩm sinh. Đôi khi nó còn bắt được cả chuột cống. Thỉnh thoảng, khi tôi dọn mộtbãi chuột chết, tôi cho Hũ Bơ bộ lòng. Nó thôi gầm gừ với tôi.</p>";
        $.contentLabel.value = data;
        "iPhone OS" == Alloy.Globals.getOSType() ? $.storyReadingWindow.open({
            transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
        }) : $.storyReadingWindow.open();
    };
    __defers["$.__views.textSmallButton!click!changeTextSize"] && $.__views.textSmallButton.addEventListener("click", changeTextSize);
    __defers["$.__views.textBigButton!click!changeTextSize"] && $.__views.textBigButton.addEventListener("click", changeTextSize);
    __defers["$.__views.closeButton!click!closeWindow"] && $.__views.closeButton.addEventListener("click", closeWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;