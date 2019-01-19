let settings = {
	values: ["3", "0", "5", "0", "50", false],	//	"breatheIn", "breatheInPause", "breatheOut", "breatheOutPause", "size", "nightMode"
};

loadFromLocalStorage();

let breatheIn = document.getElementById("breatheIn");
let breatheInText = document.getElementById("breatheInText");
breatheIn.value = settings.values[0];
breatheInText.innerHTML = breatheIn.value + "s";

let breatheInPause = document.getElementById("breatheInPause");
let breatheInPauseText = document.getElementById("breatheInPauseText");
breatheInPause.value = settings.values[1];
breatheInPauseText.innerHTML = breatheInPause.value  + "s";

let breatheOut = document.getElementById("breatheOut");
let breatheOutText = document.getElementById("breatheOutText");
breatheOut.value = settings.values[2];
breatheOutText.innerHTML = breatheOut.value + "s";

let breatheOutPause = document.getElementById("breatheOutPause");
let breatheOutPauseText = document.getElementById("breatheOutPauseText");
breatheOutPause.value = settings.values[3];
breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";

let size = document.getElementById("size");
let sizeText = document.getElementById("sizeText");
size.value = settings.values[4];
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

function saveSettings(){
	settings.values = [breatheIn.value, breatheInPause.value, breatheOut.value, breatheOutPause.value, size.value, nightModeCheckbox.checked];
	saveToLocalStorage();
}

function setSliderValues(){
	breatheInText.innerHTML = breatheIn.value + "s";
	breatheInPauseText.innerHTML = breatheInPause.value + "s";
	breatheOutText.innerHTML = breatheOut.value + "s";
	breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";	
}

function setAnimationValues(){
	let breatheInAnimation = animation.animations[0].tweens[0];
	let breatheOutAnimation = animation.animations[0].tweens[1];

	breatheInAnimation.duration = (breatheIn.value * 1000);
	breatheInAnimation.delay = (breatheOutPause.value * 1000);
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
		saveSettings();
	}
}

let sidebar = document.querySelector('.sidebar');
let sidebarToggle = document.querySelector('.sidebarToggle');
let actualSlider = document.getElementsByClassName('actualSlider');
let animClass = document.querySelector('.animClass');

sidebarToggle.addEventListener('click', function(){
	sidebarToggle.classList.toggle('is-closed');
	sidebar.classList.toggle('is-closed');
});

let nightModeCheckbox = document.querySelector('.nightModeCheckbox');

nightModeCheckbox.addEventListener('change', function(){
	setNightMode();
	saveSettings();
});

function setNightMode(){
	if(nightModeCheckbox.checked){
		document.querySelector('.container').classList.toggle('containerNightMode');
		sidebar.classList.toggle('sidebarNightMode');
		sidebarToggle.classList.toggle('sidebarToggleNightMode');
		animClass.style.removeProperty('background-color');
		animClass.classList.toggle('animNightMode');
		for(let i = 0; i<actualSlider.length; i++){
			actualSlider[i].classList.toggle('actualSliderNightMode');
		}
	}
	else{
		document.querySelector('.container').classList.toggle('containerNightMode');
		sidebar.classList.toggle('sidebarNightMode');
		sidebarToggle.classList.toggle('sidebarToggleNightMode');
		animClass.classList.toggle('animNightMode');
		for(let i = 0; i<actualSlider.length; i++){
			actualSlider[i].classList.toggle('actualSliderNightMode');
		}
	}
}

function saveToLocalStorage(){
	let str = JSON.stringify(settings.values);
	localStorage.setItem("settings", str);
}

function loadFromLocalStorage(){
	let str = localStorage.getItem("settings");
	settings.values = JSON.parse(str);
	if(!settings.values){
		settings.values = ["3", "0", "5", "0", "50", false];
	}
}

function nightMode(){
	if(settings.values[5] === true){
		nightModeCheckbox.checked = true;
		setNightMode();
	}
	else{
		nightModeCheckbox.checked = false;
	}
}

nightMode();