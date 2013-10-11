var args = arguments[0] || {};

exports.openMainWindow = function() {
	var data = "  Khi tôi tỉnh dậy, phíabên kia giường thật lạnh lẽo. Tôi duỗi các ngón tay, tìm kiếm hơi ấm của Primnhưng chỉ chạm phải bề mặt thô ráp của tấm ga nệm bằng vải bố. Hẳn con bé đã gặpác mộng và tót sang ngủ với mẹ. Cũng phải thôi. Nó hẳn đã mơ về ngày chiêuquân.\n\n<p>Tôi chống cùi chỏ nhỏmdậy. Phòng ngủ đủ sáng để tôi có thể nhìn thấy họ. Em gái tôi, Prim, đang cuộntròn và rúc vào người mẹ, má hai người áp vào nhau. Trong khi ngủ, mẹ tôi trôngtrẻ hơn, tuy vẫn xanh xao nhưng không tiều tụy lắm. Gương mặt Prim tươi tắn nhưhạt mưa, đáng yêu như chính cái tên của nó, loài hoa anh thảo. Mẹ tôi cũng mộtthời đẹp lắm. Ít ra, người ta đã kể với tôi như thế.</p><p>Ngồi sát đầu gối Primvà canh chừng cho con bé là con mèo xấu nhất quả đất. Mũi bẹt, một bên tai sứtphân nửa, còn mắt thì có màu vàng ủng như quả bí thối. Prim đặt tên cho nó làHũ Bơ và khăng khăng rằng bộ lông vàng xỉn của nó giống hệt màu hoa Hũ Bơ[1] rựcrỡ. Nó ghét tôi lắm. Hoặc ít nhất cũng là dè chừng tôi. Dù chuyện xảy ra cáchđây đã nhiều năm, chắc nó vẫn còn nhớ rằng tôi đã cố dìm nó vào cái xô như thếnào sau khi được Prim mang về nhà. Con mèo con ốm đói, bụng trương lên vì sán,người thì lúc nhúc rận. Điều duy nhất tôi bận tâm là phải tốn thêm một miệng ănnữa. Nhưng Prim nài nỉ dữ quá, còn khóc nữa, vậy nên tôi đành cho nó ở lại. Conmèo xem chừng cũng ngoan. Mẹ tôi bắt hết rận cho nó và Hũ Bơ quả có tài bắt chuộtbẩm sinh. Đôi khi nó còn bắt được cả chuột cống. Thỉnh thoảng, khi tôi dọn mộtbãi chuột chết, tôi cho Hũ Bơ bộ lòng. Nó thôi gầm gừ với tôi.</p>";
	$.contentLabel.value = data;
  if (Alloy.Globals.getOSType() == "iPhone OS") {
    $.storyReadingWindow.open({ transition: Ti.UI.iPhone.AnimationStyle.CURL_UP });
  } else {
    $.storyReadingWindow.open();
  }
};

function closeWindow() {
	var smallDown = Titanium.UI.create2DMatrix();
	smallDown = smallDown.scale(0);
	$.storyReadingWindow.close({ transform: smallDown, duration:300 });
};

function changeTextSize(e) {
	var ratio = Alloy.Globals.isTablet() ? 1.8 : 1;
	if (e.source.dataType == '0') {
		$.contentLabel.font = { fontSize: 18 * ratio };
	} else {
		$.contentLabel.font = { fontSize: 22 * ratio };
	}
};
