function run(){
	var width = s(".piece").css("width");

	s('.piece').css('height', width[1]);

	var margin = s('.piece').css('margin-right');

	s('.piece').css('margin-bottom',margin[0]);
	s('.pieces').css('padding',margin[0]);

	s('.piece.tall').css('heigth', width[1] * 2);
}

window.onload = function(){
	run();
};


window.onresize = function(event) {
	run();
};