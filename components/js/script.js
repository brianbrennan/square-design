
window.onload = function(){
	sizing();

	var submitButton = document.getElementsByClassName('submit-button');

	submitButton[0].onclick = function(){
		showSubmit();
	};

	var submitOverlay = document.getElementsByClassName('submit-overlay');

	submitOverlay[0].onclick = function(){
		hideSubmit();
	};

	var submitForm = document.getElementsByClassName('submit-panel');

	submitForm[0].onclick = function(){
		event.stopPropagation();
	}
};


window.onresize = function(event) {
	sizing();
};