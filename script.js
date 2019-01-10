let slider = document.getElementById("timer");
let output = document.getElementById("time");
output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
	// duration = this.value + "s";
	document.getElementById("anim").style.animationDuration = this.value + "s";
	console.log(duration);
}