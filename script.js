let breatheIn = document.getElementById("breatheIn");
let breatheInText = document.getElementById("breatheInText");
breatheInText.innerHTML = breatheIn.value + "s";

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
  	{ value: 6, duration: (breatheIn.value * 1000), delay: 500, endDelay: 1100 },
  	{ value: 1, duration: 2000, delay: 500, endDelay: 500 }
  ],
  loop: true,
  easing: 'linear'
});

let breatheInAnimation = animation.animations[0].tweens[0];
let breatheOutAnimation = animation.animations[0].tweens[1];

breatheIn.oninput = function() {
	breatheInText.innerHTML = this.value + "s";
	document.getElementById("anim").style.animationDuration = this.value + "s";
	breatheInAnimation.duration = (this.value * 1000);
	breatheInAnimation.end = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay);
	breatheOutAnimation.start = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay);
	animation.duration = (this.value * 1000 + breatheInAnimation.delay + breatheInAnimation.endDelay + breatheOutAnimation.duration + breatheOutAnimation.delay + breatheOutAnimation.endDelay);
}