function sizing(){
	var width = s(".piece").css("width")[0];

	width = (Number(width.substr(0, width.length - 4))) * 9 / 16  + 45;

	width = String(width) + "px";

	s('.piece').css('height', width);

	var margin = s('.piece').css('margin-right');

	s('.piece').css('margin-bottom',margin[0]);
	s('.wrapper').css('padding-right',margin[0]).css('padding-left',margin[0]);

	var imgHeight = s('.image').css('width')[0];

	imgHeight = (Number(imgHeight.substr(0,imgHeight.length - 4))) * 9 / 16;

	imgHeight = String(imgHeight) + "px";

	s('.piece > .image').css('height', imgHeight);
}