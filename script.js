document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking a nav link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Property Showcase Slider
  const track = document.querySelector(".showcase-track")
  const slides = document.querySelectorAll(".showcase-slide")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (track && slides.length > 0) {
    let currentIndex = 0
    const slideWidth = slides[0].getBoundingClientRect().width
    const totalSlides = slides.length

    // Set initial position
    track.style.transform = `translateX(0)`

    // Handle responsive slide width
    function updateSlideWidth() {
      const newSlideWidth = slides[0].getBoundingClientRect().width
      track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`
    }

    window.addEventListener("resize", updateSlideWidth)

    // Next button click
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalSlides
        const newSlideWidth = slides[0].getBoundingClientRect().width
        track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`
      })
    }

    // Previous button click
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
        const newSlideWidth = slides[0].getBoundingClientRect().width
        track.style.transform = `translateX(-${currentIndex * newSlideWidth}px)`
      })
    }

    // Auto slide
    setInterval(() => {
      if (nextBtn) {
        nextBtn.click()
      }
    }, 5000)
  }

  // Property Filtering
  const filterBtns = document.querySelectorAll(".filter-btn")
  const propertyItems = document.querySelectorAll(".property-item")

  if (filterBtns.length > 0 && propertyItems.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        const filter = this.getAttribute("data-filter")

        // Show/hide properties based on filter
        propertyItems.forEach((item) => {
          if (filter === "all") {
            item.style.display = "block"
          } else {
            const categories = item.getAttribute("data-category").split(" ")
            if (categories.includes(filter)) {
              item.style.display = "block"
            } else {
              item.style.display = "none"
            }
          }
        })
      })
    })
  }

  // Form Validation with enhanced user feedback
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    // Add focus and blur event listeners for form fields
    const formInputs = contactForm.querySelectorAll("input, select, textarea")

    formInputs.forEach((input) => {
      // Add focus class to parent when input is focused
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused")
      })

      // Remove focus class when input loses focus
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused")

        // Add filled class if the input has a value
        if (input.value.trim() !== "") {
          input.parentElement.classList.add("filled")
        } else {
          input.parentElement.classList.remove("filled")
        }
      })
    })

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic validation
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const message = document.getElementById("message").value

      if (!name || !email || !message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.")
        return
      }

      // If validation passes, you would normally submit the form
      // For this demo, we'll just show a success message
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()

      // Remove all filled classes
      formInputs.forEach((input) => {
        input.parentElement.classList.remove("filled")
      })
    })
  }

  // Property Search Form
  const propertySearchForm = document.getElementById("propertySearchForm")

  if (propertySearchForm) {
    // Add focus and blur event listeners for search form fields
    const searchInputs = propertySearchForm.querySelectorAll("input, select")

    searchInputs.forEach((input) => {
      // Add focus class to parent when input is focused
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused")
      })

      // Remove focus class when input loses focus
      input.addEventListener("blur", () => {
        input.parentElement.classList.remove("focused")
      })
    })

    propertySearchForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const location = document.getElementById("location").value
      const propertyType = document.getElementById("propertyType").value
      const bedrooms = document.getElementById("bedrooms").value
      const bathrooms = document.getElementById("bathrooms").value
      const minPrice = document.getElementById("minPrice").value
      const maxPrice = document.getElementById("maxPrice").value

      alert(`Searching for properties with the following criteria:
        Location: ${location || "Any"}
        Property Type: ${propertyType || "Any"}
        Bedrooms: ${bedrooms || "Any"}
        Bathrooms: ${bathrooms || "Any"}
        Price Range: ${minPrice ? "$" + minPrice : "No Min"} - ${maxPrice ? "$" + maxPrice : "No Max"}
      `)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Animation on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".selling-point, .property-item, .stat, .partner")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Set initial styles for animation
  const elementsToAnimate = document.querySelectorAll(".selling-point, .property-item, .stat, .partner")
  elementsToAnimate.forEach((element) => {
    element.style.opacity = "0"
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
  })

  // Run animation on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run once on page load
  animateOnScroll()
})
