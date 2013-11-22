var textArea = $.contentTextArea;
var emailText = $.emailText;
var sendButton = $.sendButton;

exports.openMainWindow = function() {
	$.supportWindow.leftNavButton = Alloy.Globals.backButton($.supportWindow);
	$.wrapperView.addEventListener('singletap', function(e) {
		textArea.blur();
	});
	Alloy.Globals.CURRENT_TAB.open($.supportWindow);
};

function sendSupport() {
	if (textArea.value.length > 20) {
		sendButton.enabled = false;
		Alloy.Globals.getAjax('/support', {
			content: textArea.value,
			email: emailText.value
		},
		function(response) {
			alert('Yêu cầu của bạn đã được gửi đi!');
			sendButton.enabled = true;
			textArea.value = '';
			emailText.value = '';
		});
	} else {
		alert('Nội dung quá ngắn!');
	}	
};
