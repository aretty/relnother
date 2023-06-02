"use strict"

function setScreenSize() {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const isMobile = () => {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

function openPop(id){
	if($("#"+id).hasClass("animate__fadeOutDownBig")){
		$("#"+id).removeClass("animate__fadeOutDownBig");
	}
	$("#"+id).addClass("on").addClass("animate__animated").addClass("animate__fadeInUpBig");
	
}

function closePop(id){
	$("#"+id).removeClass("animate__fadeInUpBig").addClass("animate__fadeOutDownBig");
	setTimeout(function() {
		$("#"+id).removeClass("on");
	}, 500);
}

$(function(){
	setScreenSize();
	window.addEventListener('resize', setScreenSize);
});