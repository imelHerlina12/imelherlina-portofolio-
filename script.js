/* =========================================
   EDIT YOUR PERSONAL DETAILS HERE
========================================= */

const CONFIG = {
  name: "Imel Herlina",

  bio:
    "Im a fullstack developer who prioritized " +
    "comfortable, tidiness, and alignment with needs. " +
    "I like to create something dan change idea to be a" +
    "digital work which is useful, while also learning throughout " +
    "wasch step of the process.",

  /*
    Sample values from your requested design.
    Replace with your actual experience before publishing.
  */
  stats: {
    projects: "20+",
    experience: "2 years+",
    clients: "20+"
  },

  focusSkills: "HTML, CSS, JavaScript",

  locationLabel: "Indonesia",
  locationQuery: "Palumbonsari, Karawang",

  email: "imelsyafitri12@gmail.com",

  /*
    After adding your PDF to the folder,
    change this to: cvFile: "cv.pdf"
  */
  cvFile: "",

  cvDownloadName: "Imel-CV.pdf",

  /*
    Add your own music.mp3 file.
  */
  musicFile: "music.mp3",
  musicVolume: 0.35,

  /*
    Decorative intro duration.
    This is not actual asset download progress.
  */
  openingDuration: 1800
};

/* =========================================
   ELEMENTS
========================================= */

const loadingScreen = document.getElementById("loadingScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const portfolioSite = document.getElementById("portfolioSite");
const enterButton = document.getElementById("enterButton");

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const musicText = document.getElementById("musicText");

const notification = document.getElementById("notification");

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let notificationTimer;
let entered = false;
let revealObserver;

/* =========================================
   NOTIFICATION
========================================= */

function notify(message) {
  clearTimeout(notificationTimer);

  notification.textContent = message;
  notification.classList.add("visible");

  notificationTimer = setTimeout(() => {
    notification.classList.remove("visible");
  }, 4500);
}

/* =========================================
   PROFILE AND EMAIL TEXT
========================================= */

function setupProfile() {
  document.querySelectorAll("[data-name]").forEach(element => {
    element.textContent = CONFIG.name;
  });

  /*
    Email is displayed as plain text only.
    No mailto link, Gmail redirect, or form.
  */
  document.querySelectorAll("[data-email]").forEach(element => {
    element.textContent = CONFIG.email;
  });

  document.getElementById("bio").textContent =
    CONFIG.bio;

  document.getElementById("projectStat").textContent =
    CONFIG.stats.projects;

  document.getElementById("experienceStat").textContent =
    CONFIG.stats.experience;

  document.getElementById("clientStat").textContent =
    CONFIG.stats.clients;

  document.getElementById("aboutExperience").textContent =
    CONFIG.stats.experience;

  document.getElementById("focusSkills").textContent =
    CONFIG.focusSkills;

  document.getElementById("year").textContent =
    new Date().getFullYear();

  document.title = CONFIG.name + " | Developer Portfolio";
}

/* =========================================
   CV DOWNLOAD
========================================= */

function setupCV() {
  const button = document.getElementById("cvButton");

  if (CONFIG.cvFile.trim()) {
    button.href = CONFIG.cvFile;
    button.download = CONFIG.cvDownloadName;
  } else {
    button.addEventListener("click", event => {
      event.preventDefault();

      notify(
        "My CV is being updated, Please contact me by email."
      );
    });
  }
}

/* =========================================
   LOCATION
========================================= */

function setupLocation() {
  document.querySelectorAll("[data-location]").forEach(element => {
    element.textContent = CONFIG.locationLabel;
  });

  const query = encodeURIComponent(CONFIG.locationQuery);

  document.getElementById("locationMap").src =
    "https://www.google.com/maps?q=" +
    query +
    "&output=embed";

  document.getElementById("mapLink").href =
    "https://www.google.com/maps/search/?api=1&query=" +
    query;
}

/* =========================================
   BACKGROUND MUSIC
========================================= */

function syncMusicButton() {
  const playing = !music.paused && !music.ended;
  const label = playing ? "Pause music" : "Play music";

  musicText.textContent = label;

  musicButton.setAttribute(
    "aria-label",
    label
  );

  musicButton.setAttribute(
    "aria-pressed",
    String(playing)
  );
}

async function playMusic(showError = false) {
  if (!CONFIG.musicFile.trim()) {
    if (showError) {
      notify("Background music is not available yet.");
    }

    return;
  }

  try {
    await music.play();
  } catch (error) {
    if (showError) {
      notify(
        music.error
          ? "The music could not be loaded."
          : "Please select Play music to start the audio."
      );
    }
  }

  syncMusicButton();
}

function setupMusic() {
  music.volume = Math.max(
    0,
    Math.min(1, CONFIG.musicVolume)
  );

  ["play", "pause", "ended", "error"].forEach(event => {
    music.addEventListener(event, syncMusicButton);
  });

  if (CONFIG.musicFile.trim()) {
    music.src = CONFIG.musicFile;
  }

  musicButton.addEventListener("click", () => {
    if (music.paused) {
      playMusic(true);
    } else {
      music.pause();
    }
  });
}

/* =========================================
   SOFT SCROLL REVEAL
========================================= */

function setupReveal() {
  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    return;
  }

  const elements = document.querySelectorAll(".reveal");

  document.documentElement.classList.add("motion-ready");

  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08
  });

  elements.forEach(element => {
    const siblings = Array.from(
      element.parentElement.children
    ).filter(child => {
      return child.classList.contains("reveal");
    });

    const index = Math.max(
      0,
      siblings.indexOf(element)
    );

    element.style.setProperty(
      "--reveal-delay",
      Math.min(index * 100, 300) + "ms"
    );

    revealObserver.observe(element);
  });
}

/* =========================================
   BUTTON ENTRANCE
========================================= */

function animateButtons() {
  const buttons = document.querySelectorAll(`
    .header-inner a,
    .header-inner button,
    .hero-actions .button,
    .role-badge
  `);

  buttons.forEach((button, index) => {
    button.style.setProperty(
      "--button-delay",
      Math.min(index * 75, 700) + "ms"
    );
  });

  portfolioSite.classList.add("entering");

  setTimeout(() => {
    portfolioSite.classList.remove("entering");

    buttons.forEach(button => {
      button.style.removeProperty("--button-delay");
    });
  }, 1700);
}

/* =========================================
   ENTER PORTFOLIO
========================================= */

function enterPortfolio() {
  if (entered) {
    return;
  }

  entered = true;

  /*
    Start audio directly from the user's click.
    Missing audio does not block entry.
  */
  playMusic(false);

  loadingScreen.hidden = true;
  welcomeScreen.hidden = true;
  portfolioSite.hidden = false;

  document.body.classList.remove("opening-active");

  const oldScrollBehavior =
    document.documentElement.style.scrollBehavior;

  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);

  document.documentElement.style.scrollBehavior =
    oldScrollBehavior;

  setupReveal();
  animateButtons();

  const mainTitle = document.querySelector(".hero h1");

  mainTitle.setAttribute("tabindex", "-1");
  mainTitle.focus({ preventScroll: true });
}

/* =========================================
   LOADING AND WELCOME
========================================= */

function setupOpening() {
  portfolioSite.hidden = true;
  loadingScreen.hidden = false;
  welcomeScreen.hidden = true;

  document.body.classList.add("opening-active");

  setTimeout(() => {
    loadingScreen.hidden = true;
    welcomeScreen.hidden = false;

    document.getElementById("welcomeTitle").focus();
  }, reducedMotion.matches ? 250 : CONFIG.openingDuration);

  enterButton.addEventListener(
    "click",
    enterPortfolio
  );
}

/* =========================================
   START
========================================= */

setupProfile();
setupCV();
setupLocation();
setupMusic();
setupOpening();