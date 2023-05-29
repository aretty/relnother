function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function openPop(id){
	$("#"+id).addClass("on").addClass("animate__animated").addClass("animate__fadeInUpBig");
}

$(function(){
	setScreenSize();
	window.addEventListener('resize', setScreenSize);
});