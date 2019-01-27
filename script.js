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
  	{ value: 4, duration: (breatheIn.value * 1000), delay: (breatheOutPause.value * 1000) },
  	{ value: 1, duration: (breatheOut.value * 1000), delay: (breatheInPause.value * 1000) }
  ],
  loop: true,
  easing: 'linear'
});

function saveSettings() {
	settings.values = [breatheIn.value, breatheInPause.value, breatheOut.value, breatheOutPause.value, size.value, nightModeCheckbox.checked];
	saveToLocalStorage();
}

function setSliderValues() {
	breatheInText.innerHTML = breatheIn.value + "s";
	breatheInPauseText.innerHTML = breatheInPause.value + "s";
	breatheOutText.innerHTML = breatheOut.value + "s";
	breatheOutPauseText.innerHTML = breatheOutPause.value  + "s";	
}

function setAnimationValues() {
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

function setAnimationSize() {
	sizeText.innerHTML = (size.value * 4) + "px";
	document.getElementById("anim").style.width = size.value + "px";
	document.getElementById("anim").style.height = size.value + "px";
}

let sliders = document.querySelector(".sliders");
sliders.addEventListener("input", setValues, false);

function setValues(e) {
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

sidebarToggle.addEventListener('click', function() {
	sidebarToggle.classList.toggle('is-closed');
	sidebar.classList.toggle('is-closed');
});

let nightModeCheckbox = document.querySelector('.nightModeCheckbox');
let checkmark = document.getElementsByClassName('checkmark');

nightModeCheckbox.addEventListener('change', function() {
	setNightMode();
	saveSettings();
});

function setNightMode() {
	if(nightModeCheckbox.checked) {
		document.querySelector('.container').classList.toggle('containerNightMode');
		sidebar.classList.toggle('sidebarNightMode');
		sidebarToggle.classList.toggle('sidebarToggleNightMode');
		animClass.style.removeProperty('background-color');
		animClass.classList.toggle('animNightMode');
		for(let i = 0; i<actualSlider.length; i++) {
			actualSlider[i].classList.toggle('actualSliderNightMode');
		}
		for(let i = 0; i<checkmark.length; i++) {
			checkmark[i].classList.toggle('checkmarkNightMode');
		}
	} else {
		document.querySelector('.container').classList.toggle('containerNightMode');
		sidebar.classList.toggle('sidebarNightMode');
		sidebarToggle.classList.toggle('sidebarToggleNightMode');
		animClass.classList.toggle('animNightMode');
		for(let i = 0; i<actualSlider.length; i++) {
			actualSlider[i].classList.toggle('actualSliderNightMode');
		}
		for(let i = 0; i<checkmark.length; i++) {
			checkmark[i].classList.toggle('checkmarkNightMode');
		}
	}
}

function saveToLocalStorage() {
	let str = JSON.stringify(settings.values);
	localStorage.setItem("settings", str);
}

function loadFromLocalStorage() {
	let str = localStorage.getItem("settings");
	settings.values = JSON.parse(str);
	if(!settings.values){
		settings.values = ["3", "0", "5", "0", "50", false];
	}
}

function nightMode() {
	if(settings.values[5] === true) {
		nightModeCheckbox.checked = true;
		setNightMode();
	} else {
		nightModeCheckbox.checked = false;
	}
}

nightMode();

let fullscreenCheckbox = document.querySelector('.fullscreenCheckbox');

fullscreenCheckbox.addEventListener('change', function() {
	if(fullscreenCheckbox.checked) {
		openFullscreen();
	} else {
		closeFullscreen();
	}
});

var elem = document.documentElement;

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

function backgroundColor() {
	let bgColor = document.getElementById("customBackground");
	document.querySelector('.container').style.backgroundColor = bgColor.value;
}

function animColor() {
	let animColor = document.getElementById("customAnim");
	animClass.style.backgroundColor = customAnim.value;
}

const dropdownArrowSounds = document.querySelector(".soundListArrow");
const dropdownArrowColors = document.querySelector(".colorSettingsArrow");
const colorSettingList = document.querySelector(".colorSettingList")


dropdownArrowSounds.addEventListener('click', function() {
	dropdownSounds();
});

dropdownArrowColors.addEventListener('click', function() {
	dropdownColors();
});

function dropdownSounds() {
	let soundList = document.querySelector('.soundList');
	soundList.classList.toggle('soundListDisplay');
	dropdownArrowSounds.classList.toggle('fa-angle-up');
}

function dropdownColors() {
	colorSettingList.classList.toggle('colorSettingsListDisplay');
	dropdownArrowColors.classList.toggle('fa-angle-up');
}