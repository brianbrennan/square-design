function run(){
	var width = s(".piece").css("width");

	s('.piece').css('height', width[1]);

	var margin = s('.piece').css('margin-right');

	s('.piece').css('margin-bottom',margin[0]);
	s('.wrapper').css('padding-right',margin[0]).css('padding-left',margin[0]);
}

window.onload = function(){
	run();
};


window.onresize = function(event) {
	run();
};