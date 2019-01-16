let breatheIn = document.getElementById("breatheIn");
let breatheInText = document.getElementById("breatheInText");
breatheInText.innerHTML = breatheIn.value + "s";

let breatheInPause = document.getElementById("breatheInPause");
let breatheInPauseText = document.getElementById("breatheInPauseText");
breatheInPauseText.innerHTML = breatheInPause.value  + "s";

let breatheOut = document.getElementById("breatheOut");
let breatheOutText = document.getElementById("breatheOutText");
breatheOutText.innerHTML = breatheOut.value + "s";

let breatheOutPause = document.getElementById("breatheOutPause");
let breatheOutPauseText = document.getElementById("breatheOutPauseText");
breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";

let size = document.getElementById("size");
let sizeText = document.getElementById("sizeText");
sizeText.innerHTML = (size.value * 4) + "px";

//	Initializes anime.js
let animation = anime({
  targets: '#anim',
  scale: [
  	{ value: 4, duration: (breatheIn.value * 1000), delay: (breatheOutPause.value * 1000)},
  	{ value: 1, duration: (breatheOut.value * 1000), delay: (breatheInPause.value * 1000)}
  ],
  loop: true,
  easing: 'linear'
});

function setSliderValues(){
	breatheInText.innerHTML = breatheIn.value + "s";
	breatheInPauseText.innerHTML = breatheInPause.value + "s";
	breatheOutText.innerHTML = breatheOut.value + "s";
	breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";	
}

function setAnimationValues(){
	let breatheInAnimation = animation.animations[0].tweens[0];
	let breatheOutAnimation = animation.animations[0].tweens[1];

	breatheInAnimation.delay = (breatheOutPause.value * 1000);
	breatheInAnimation.duration = (breatheIn.value * 1000);
	breatheInAnimation.end = ((breatheIn.value * 1000) + (breatheOutPause.value * 1000));

	breatheOutAnimation.start = ((breatheIn.value * 1000) + (breatheOutPause.value * 1000));
	breatheOutAnimation.duration = (breatheOut.value * 1000);
	breatheOutAnimation.delay = (breatheInPause.value * 1000);
	breatheOutAnimation.end = ((breatheOut.value * 1000) + (breatheInPause.value * 1000) + (breatheIn.value * 1000) + (breatheOutPause.value * 1000));

	animation.duration = ((breatheIn.value * 1000) + (breatheInPause.value * 1000) + (breatheOut.value * 1000) + (breatheOutPause.value * 1000));
}

function setAnimationSize(){
	sizeText.innerHTML = (size.value * 4) + "px";
	document.getElementById("anim").style.width = size.value + "px";
	document.getElementById("anim").style.height = size.value + "px";
}

let sliders = document.querySelector(".sliders");
sliders.addEventListener("input", setValues, false);

function setValues(e){
	if(e.target !== e.currentTarget) {
		setSliderValues();
		setAnimationValues();
		setAnimationSize();
	}
}