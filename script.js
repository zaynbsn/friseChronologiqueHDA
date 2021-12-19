gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

/* Main navigation */
let panelsSection = document.querySelector("#panels"),
	panelsContainer = document.querySelector("#panels-container"),
	tween;
document.querySelectorAll(".anchor").forEach(anchor => {
	anchor.addEventListener("click", function(e) {
		e.preventDefault();
		let targetElem = document.querySelector(e.target.getAttribute("href")),
			y = targetElem;
		if (targetElem && panelsContainer.isSameNode(targetElem.parentElement)) {
			let totalScroll = tween.scrollTrigger.end - tween.scrollTrigger.start,
				totalMovement = (panels.length - 1) * targetElem.offsetWidth;
			y = Math.round(tween.scrollTrigger.start + (targetElem.offsetLeft / totalMovement) * totalScroll);
		}
		gsap.to(window, {
			scrollTo: {
				y: y,
				autoKill: false
			},
			duration: 1
		});
	});
});

/* Panels */
const panels = gsap.utils.toArray("#panels-container .panel");
tween = gsap.to(panels, {
	xPercent: -100 * ( panels.length - 1 ),
	ease: "none",
	scrollTrigger: {
		trigger: "#panels-container",
		pin: true,
		start: "top top",
		scrub: 1,
		snap: {
			snapTo: 1 / (panels.length - 1),
			inertia: false,
			duration: {min: 2, max: 2}
		},
		end: () =>  "+=" + (panelsContainer.offsetWidth - innerWidth)
	}
});


// images.forEach(image => {
	// 	image.addEventListener("click", () =>{
		// 		image.classList.add("imageMiddle")
		// 		console.log("itworks")
		// 	})
		// 	images.forEach(image => image.addEventListener("mouseout", () =>{
			// 		image.classList.remove("imageMiddle")
			// 		console.log("itworks")
			// 	})
			// 	)
			// })
const closePopin = document.getElementsByClassName("close")
const popinOverlay = document.getElementsByClassName("overlay")
const popup = document.querySelector(".popup")
const popinImg = document.getElementsByClassName("popinImg")
const popinContent = (image) => {
	popinOverlay[0].classList.add("overlayUp")
	popinImg[0].innerHTML = image.dataset.img
	
	window.addEventListener("keyup", escapeToClosePopin)
	
	closePopin[0].addEventListener("click", () => {
		popinOverlay[0].classList.remove("overlayUp")
		// editCategory.innerHTML = ""
	})
}

const images = document.querySelectorAll(".images")
images.forEach(image => {
	image.addEventListener("click", () =>{
		popinContent(image)
	})
})


const escapeToClosePopin = (e) => {
    if (e.key === "Escape"){
        popinOverlay[0].classList.remove("overlayUp")
        // editCategory.innerHTML = ""
        window.removeEventListener("keyup", escapeToClosePopin)
    }
}