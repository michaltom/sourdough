if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('./sw.js')
		.then((registration) => {
			console.log(registration);
		})
		.catch((error) => console.error(error));
}

const sliderPops = document.querySelectorAll('.scale-container');
const ingFlour = document.querySelector('[data-ing--flour]');
const ingWater = document.querySelector('[data-ing--water]');
const ingStarter = document.querySelector('[data-ing--starter]');
const ingSalt = document.querySelector('[data-ing--salt]');
const breadNumber = document.querySelector('[data-bread-number-input]');
const scaleBreadWeight = document.querySelector('[data-bw]');
const scaleBreadhydratatin = document.querySelector('[data-bh]');
const scaleBreadInoculation = document.querySelector('[data-i]');
const salt = { value: 2 };

sliderPops.forEach((pop) => {
	const scale = pop.querySelector('[data-scale]');
	const sliderPop = pop.querySelector('[data-slider-pop]');
	const sliderChar = pop.querySelector('[data-slider-pop--char]');

	scale.addEventListener('input', () => {
		setPop(scale, sliderPop, sliderChar);
		setup();
	});
	setPop(scale, sliderPop, sliderChar);
	setup();
});

breadNumber.oninput = (e) => {
	console.log(e.data);
	if (e.data === undefined) return;
	e.data == e.data.match(/[1-9]/) ? (breadNumber.value = e.data) : (breadNumber.value = 1);
	setup();
};
breadNumber.addEventListener('change', () => {
	setup();
});

function setPop(scale, pop, char) {
	const popChar = char.innerHTML;
	const val = scale.value;
	const min = scale.min;
	const max = scale.max;
	const newVal = Number((val - min) * 100 / (max - min));
	pop.innerHTML = val + popChar;

	pop.style.left = `calc(${newVal}% + (${7 - newVal * 0.45}px))`;
}

function flourCalc(bw, bh, i, out, bn) {
	const bredWeight = bw.value;
	const bredHydratation = bh.value * 0.01;
	const inoculation = i.value * 0.01;
	let temp = bredWeight / (1 + bredHydratation + inoculation) * 1000;
	out.innerHTML = Math.round(temp) * bn.value;
}

function ingCalc(fl, bh, out) {
	out.innerHTML = Math.round(fl.innerHTML * (bh.value * 0.01));
}

function setup() {
	flourCalc(scaleBreadWeight, scaleBreadhydratatin, scaleBreadInoculation, ingFlour, breadNumber);
	ingCalc(ingFlour, scaleBreadhydratatin, ingWater);
	ingCalc(ingFlour, scaleBreadInoculation, ingStarter);
	ingCalc(ingFlour, salt, ingSalt);
	// ingSalt.innerHTML = scaleBreadWeight.value * 10;
}
