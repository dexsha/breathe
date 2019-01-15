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
sizeText.innerHTML = size.value;

size.oninput = function() {
	sizeText.innerHTML = this.value;
	document.getElementById("anim").style.width = this.value + "px";
	document.getElementById("anim").style.height = this.value + "px";
}

let animation = anime({
  targets: '#anim',
  scale: [
  	{ value: 3, duration: (breatheIn.value * 1000), delay: (breatheOutPause.value * 1000)},
  	{ value: 1, duration: (breatheOut.value * 1000), delay: (breatheInPause.value * 1000)}
  ],
  loop: true,
  easing: 'linear'
});

let breatheInAnimation = animation.animations[0].tweens[0];
let breatheOutAnimation = animation.animations[0].tweens[1];

// breatheIn.oninput = function() {
// 	breatheInText.innerHTML = this.value + "s";
// 	document.getElementById("anim").style.animationDuration = this.value + "s";
// 	breatheInAnimation.duration = (this.value * 1000);
// 	breatheInAnimation.end = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay);
// 	breatheOutAnimation.start = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay);
// 	animation.duration = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay + breatheOutAnimation.duration + breatheOutAnimation.delay + breatheOutAnimation.endDelay);
// }

function breathe() {
	breatheInText.innerHTML = breatheIn.value + "s";
	breatheInPauseText.innerHTML = breatheInPause.value + "s";
	breatheOutText.innerHTML = breatheOut.value + "s";
	breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";
	breatheInAnimation.delay = breatheOutPause.value * 1000;
	breatheInAnimation.duration = (breatheIn.value * 1000);
	breatheInAnimation.end = (breatheIn.value * 1000 + breatheOutPause.value * 1000);
	breatheOutAnimation.start = ((breatheIn.value * 1000) + (breatheOutPause.value * 1000));
	breatheOutAnimation.duration = (breatheOut.value * 1000);
	breatheOutAnimation.delay = (breatheInPause.value * 1000);
	breatheOutAnimation.end = ((breatheOut.value * 1000) + (breatheInPause.value * 1000) + (breatheIn.value * 1000) + (breatheOutPause.value * 1000));
	animation.duration = (breatheIn.value * 1000 + breatheInPause.value * 1000 + (breatheOut.value * 1000) + (breatheInPause.value * 1000));
}

let sliders = document.querySelector(".sliders");
sliders.addEventListener("input", doSomething, false);

// function doSomething(e) {
// 	if(e.target !== e.currentTarget) {
// 		let clickedSlider = e.target.id;
// 		console.log(breatheIn.value);
// 	}
// }

function doSomething(e) {
	if(e.target !== e.currentTarget) {
		breathe();
	}
}