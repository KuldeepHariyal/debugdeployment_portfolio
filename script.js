//smooth scroll
const navigation = document.querySelector(".navigation");
const navigationHeight = navigation.offsetHeight;
document.documentElement.style.setProperty("--scroll-padding", navigationHeight + "px");


//nav-btn for mobile
const mobileNav = document.querySelector(".mobile-nav-btn");
const navHeader = document.querySelector(".navigation");

const toggleNavbar = () => {
  navHeader.classList.toggle("active");
};

mobileNav.addEventListener("click", toggleNavbar);

document.addEventListener("DOMContentLoaded", function () {
  const circularProgressBars = document.querySelectorAll(".circular-progress");
  const progressValues = document.querySelectorAll(".progress-value");
  const skillSection = document.querySelector(".skills");
  let valuesInitialized = false;

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2, // Change this threshold value as needed
  };

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !valuesInitialized) {
        updateProgressValues();
        valuesInitialized = true;
      }
    });
  }

// Function to update progress values with animation after a delay
function updateProgressValuesWithDelay() {
  setTimeout(() => {
      updateProgressValues();
  }, 2000); // Delay of 2 seconds (2000 milliseconds)
}

// Function to update progress values with animation
function updateProgressValues() {
  progressValues.forEach((progress, index) => {
      const value = parseInt(progress.dataset.value); // Get the actual value from the dataset
      progress.innerHTML = '0%'; // Start with 0%
      setTimeout(() => {
          animateValue(progress, 0, value, 2000); // Animate the progress value after the delay
          animateCircularProgressBar(circularProgressBars[index], value); // Update circular progress bar
      }, 2000); // Delay of 2 seconds (2000 milliseconds) before starting the animation
  });
}

// Function to animate the progress value
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  let currentValue = start; // Initialize currentValue to start value
  const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      currentValue = Math.floor(progress * (end - start) + start); // Update currentValue
      element.textContent = currentValue + "%"; // Update element with currentValue + percentage sign
      if (progress < 1) {
          window.requestAnimationFrame(step);
      } else {
          currentValue = end; // Ensure currentValue is set to end value
          element.textContent = currentValue + "%"; // Update element with end value + percentage sign
      }
  };
  window.requestAnimationFrame(step);
}

  function animateCircularProgressBar(progressBar, value) {
    const animationDuration = 2000; // Duration of the animation in milliseconds
    const start = performance.now();

    function step(timestamp) {
      const progress = Math.min((timestamp - start) / animationDuration, 1);
      const gradient = `conic-gradient(#9d4edd ${
        progress * value * 3.6
      }deg, #e6e2e9 0deg)`;
      progressBar.style.background = gradient;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        progressBar.querySelector(".progress-value").innerText = value +"%"; // Set the final value
      }
    }

    window.requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(skillSection); // Observe the skills section
});

//auto-typing in header container
var typingEffect = new Typed(".multi-text", {
  strings: ["Programmer", "Web Developer", "Web Designer"],
  loop: true,
  typeSpeed: 100,
  backSpeed: 80,
  startDelay: 1000,
  backDelay: 1500,
});
// form javascript

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

// JavaScript to trigger the animations when sections come into view
const sections = document.querySelectorAll("section");

const options = {
  rootMargin: "0px",
  threshold: 0.2
};

const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});


