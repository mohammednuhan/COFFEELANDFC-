// Student Management & Registration
function registerStudent(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.querySelector('input[type="text"]').value;
  const age = form.querySelector('input[type="number"]').value;
  const email = form.querySelector('input[type="email"]').value;
  const location = form.querySelector("#location-select").value;

  const studentData = {
    name: name,
    age: age,
    email: email,
    location: location,
  };

  fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert(
        `Application submitted successfully for ${name}! We will contact you soon.`,
      );
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Failed to connect to the server. Please ensure the backend is running.",
      );
    });
}

function simulatePayment(plan) {
  const prices = {
    Monthly: "₹1,500",
    Quarterly: "₹4,000",
    Annual: "₹14,000",
  };

  if (
    confirm(
      `Do you want to proceed with the ${plan} plan for ${prices[plan]}? \n\nThis will take you to our secure payment gateway.`,
    )
  ) {
    if (confirm("Simulating Payment Process... Click OK to complete.")) {
      alert(
        `Success! You have joined Coffeeland FC on the ${plan} plan. \n\nWelcome to the academy! Check your email for orientation details.`,
      );
    }
  }
}



// Basic Animations on Scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("animate-on-scroll");
  observer.observe(section);
});

// Mobile Menu Navigation Logic
document.addEventListener("DOMContentLoaded", () => {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileBtn && navLinks) {
    // Toggle menu on button click
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("open-menu");
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        mobileBtn.classList.remove("open-menu");
        navLinks.classList.remove("active");
      });
    });

    // Close menu if user clicks outside of it
    document.addEventListener("click", (event) => {
      if (
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !mobileBtn.contains(event.target)
      ) {
        mobileBtn.classList.remove("open-menu");
        navLinks.classList.remove("active");
      }
    });
  }
});
