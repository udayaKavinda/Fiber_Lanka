document.addEventListener("DOMContentLoaded", function () {
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && header) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("open")) {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      var button = contactForm.querySelector('button[type="submit"]');
      var status = document.querySelector("#form-status");
      button.disabled = true;
      button.textContent = "Sending...";
      status.hidden = false;
      status.textContent = "Sending your enquiry...";
      var controller = new AbortController();
      var timeout = setTimeout(function () { controller.abort(); }, 30000);
      try {
        var response = await fetch(contactForm.action, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(contactForm),
          signal: controller.signal
        });
        var result = await response.json();
        if (!response.ok || result.success !== true) throw new Error("Submission failed");
        status.textContent = "Thank you! Your enquiry has been sent to our team.";
        contactForm.reset();
      } catch (error) {
        status.textContent = "We could not confirm that your enquiry was sent. Your details are still here. Please try again or email info@aunfiberlanka.com directly.";
      } finally {
        clearTimeout(timeout);
        button.disabled = false;
        button.textContent = "Send Message";
      }
    });
  }

  var yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
