// ==========================================
// EMERGIX - AI-Powered Emergency Response Platform
// Main JavaScript Logic - Fully Functional
// ==========================================

// Global variables for tracking and simulation
let trackingInterval = null;
let ambulanceLocation = { distance: 1.8, speed: 45 };
let updateCounter = 0;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Determine ambulance type and hospital based on patient conditions (AI Triage Logic)
 */
function performAITriage(age, conscious, breathing, bleeding) {
  let ambulanceType = "BLS"; // Basic Life Support
  let hospitalType = "General Hospital";
  let severity = "Low";
  let priority = 1;

  const ageNum = parseInt(age);

  // Priority scoring system
  if (conscious === "no") priority += 2;
  if (breathing === "severe") priority += 2;
  if (breathing === "mild") priority += 1;
  if (bleeding === "yes") priority += 2;
  if (ageNum > 60) priority += 1;

  // Determine ambulance type and hospital based on priority
  if (priority >= 5) {
    ambulanceType = "ALS"; // Advanced Life Support
    hospitalType = "Trauma & Cardiac Center";
    severity = "Critical";
  } else if (priority >= 3) {
    ambulanceType = "ALS";
    hospitalType = "Emergency Hospital";
    severity = "High";
  } else if (priority >= 2) {
    ambulanceType = "BLS";
    hospitalType = "General Hospital";
    severity = "Medium";
  }

  return {
    ambulanceType,
    hospitalType,
    severity,
    priority,
    eta: priority >= 5 ? 6 : priority >= 3 ? 8 : 12
  };
}

/**
 * Get mock hospital details based on hospital type
 */
function getHospitalDetails(hospitalType) {
  const hospitals = {
    "Trauma & Cardiac Center": {
      name: "City Trauma & Cardiac Center",
      specialization: "Emergency & Cardiac Care",
      distance: "3.2 km",
      beds: "Available",
      status: "✔ Ready"
    },
    "Emergency Hospital": {
      name: "Downtown Emergency Hospital",
      specialization: "General Emergency Care",
      distance: "2.8 km",
      beds: "Available",
      status: "✔ Ready"
    },
    "General Hospital": {
      name: "Community General Hospital",
      specialization: "General Care",
      distance: "4.5 km",
      beds: "Available",
      status: "✔ Ready"
    }
  };

  return hospitals[hospitalType] || hospitals["General Hospital"];
}

/**
 * Format time for display
 */
function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

/**
 * Save data to localStorage
 */
function saveEmergencyData(data) {
  localStorage.setItem("emergixData", JSON.stringify(data));
}

/**
 * Retrieve data from localStorage
 */
function getEmergencyData() {
  const data = localStorage.getItem("emergixData");
  return data ? JSON.parse(data) : null;
}

/**
 * Show notification (toast-style)
 */
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
    color: white;
    border-radius: 4px;
    z-index: 9999;
    animation: slideIn 0.3s ease-in-out;
    font-weight: bold;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==========================================
// PAGE-SPECIFIC LOGIC
// ==========================================

/**
 * Emergency Form Handler
 */
function initEmergencyForm() {
  const form = document.getElementById("emergencyForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const age = document.getElementById("age").value;
    const conscious = document.getElementById("conscious").value;
    const breathing = document.getElementById("breathing").value;
    const bleeding = document.getElementById("bleeding").value;
    const description = document.getElementById("description").value;

    // Validate form
    if (!age || !conscious || !breathing || !bleeding) {
      showNotification("Please fill in all required fields", "error");
      return;
    }

    // Perform AI triage
    const triageResult = performAITriage(age, conscious, breathing, bleeding);

    // Get hospital details
    const hospitalDetails = getHospitalDetails(triageResult.hospitalType);

    // Save complete emergency data
    const emergencyData = {
      timestamp: new Date().toISOString(),
      patient: {
        age,
        conscious,
        breathing,
        bleeding,
        description
      },
      triage: triageResult,
      hospital: hospitalDetails,
      ambulance: {
        type: triageResult.ambulanceType,
        eta: triageResult.eta + " minutes",
        status: "En route",
        distance: "1.8 km",
        speed: "45 km/h"
      }
    };

    saveEmergencyData(emergencyData);

    showNotification("🚑 Emergency request submitted! Redirecting to results...", "success");

    // Redirect after a brief delay
    setTimeout(() => {
      window.location.href = "result.html";
    }, 500);
  });
}

/**
 * Result Page Handler - Display emergency response details
 */
function initResultPage() {
  const emergencyData = getEmergencyData();

  if (!emergencyData) {
    showNotification("No emergency data found", "error");
    return;
  }

  // Update page with emergency data
  updateResultPageContent(emergencyData);
}

/**
 * Update result page dynamically with emergency data
 */
function updateResultPageContent(data) {
  // Note: The HTML structure is static in result.html
  // This function ensures data consistency and could be extended
  // to dynamically update elements if you want to make it more dynamic

  console.log("Emergency Data Loaded:", data);

  // You can add dynamic DOM updates here if needed
  // For now, the static HTML displays the results
}

/**
 * Hospital ER Dashboard Handler
 */
function initHospitalDashboard() {
  const button = document.getElementById("erReadyBtn");

  if (!button) return;

  const emergencyData = getEmergencyData();

  if (emergencyData) {
    console.log("Hospital received patient alert:", emergencyData);

    // Add click handler to "Mark ER Ready" button
    button.addEventListener("click", function () {
      showNotification("✅ Emergency Room marked as READY for incoming patient", "success");

      // Update button state
      button.textContent = "✅ ER Ready";
      button.style.opacity = "0.7";
      button.disabled = true;

      // Log action
      console.log("ER Status Updated:", {
        status: "Ready",
        timestamp: getCurrentTime(),
        patient: emergencyData.patient
      });
    });
  }
}

/**
 * Live Tracking Page Handler - Simulates real-time ambulance tracking
 */
function initLiveTracking() {
  const trackingContainer = document.querySelector(".form-section");

  if (!trackingContainer) return;

  const emergencyData = getEmergencyData();

  if (!emergencyData) return;

  // Start simulated live tracking updates
  startTrackingSimulation();

  // Add refresh button
  const refreshBtn = document.createElement("button");
  refreshBtn.className = "btn-hospital";
  refreshBtn.textContent = "🔄 Refresh Tracking";
  refreshBtn.style.marginTop = "20px";
  refreshBtn.addEventListener("click", updateTrackingInfo);

  // Find the container and add the refresh button
  const buttonContainer = trackingContainer.querySelector('a:last-of-type');
  if (buttonContainer) {
    buttonContainer.insertAdjacentElement('afterend', refreshBtn);
  }
}

/**
 * Simulate real-time ambulance tracking
 */
function startTrackingSimulation() {
  if (trackingInterval) clearInterval(trackingInterval);

  trackingInterval = setInterval(() => {
    updateTrackingInfo();
    updateCounter++;

    // Stop simulation after ambulance arrives (simulated)
    if (updateCounter >= 40) {
      clearInterval(trackingInterval);
      showNotification("🚑 Ambulance has arrived at hospital!", "success");
    }
  }, 5000); // Update every 5 seconds
}

/**
 * Update tracking information display
 */
function updateTrackingInfo() {
  // Simulate ambulance movement
  ambulanceLocation.distance -= 0.3;
  if (ambulanceLocation.distance < 0) ambulanceLocation.distance = 0;

  const etaMinutes = Math.max(0, Math.ceil(ambulanceLocation.distance / ambulanceLocation.speed * 60));

  // Update DOM with new tracking info
  const etaElement = document.querySelector('div:nth-child(3) p');
  if (etaElement && etaElement.textContent.includes("ETA")) {
    etaElement.textContent = `${etaMinutes} minutes`;
  }

  const distanceElement = document.querySelector('div:nth-child(1) p');
  if (distanceElement && distanceElement.textContent.includes("km away")) {
    distanceElement.textContent = `${ambulanceLocation.distance.toFixed(1)} km away`;
  }

  // Add new status update
  const statusList = document.querySelector('ul');
  if (statusList && updateCounter % 4 === 0) {
    const newStatus = document.createElement("li");
    newStatus.style.cssText = `
      padding: 12px;
      margin-bottom: 10px;
      background: #f0f4f8;
      border-radius: 8px;
      border-left: 4px solid #ffc107;
    `;
    newStatus.innerHTML = `
      ➡ <strong>En route update</strong> - ${getCurrentTime()}
    `;
    statusList.insertAdjacentElement('afterend', newStatus);
  }

  console.log(`[${getCurrentTime()}] Ambulance Update - Distance: ${ambulanceLocation.distance.toFixed(1)} km, ETA: ${etaMinutes} min`);
}

/**
 * Elderly Care Form Handler
 */
function initElderlyCareForm() {
  const form = document.querySelector(".form-section form");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const duration = document.getElementById("duration").value;
    const service = document.getElementById("service").value;

    if (!name || !duration || !service) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // Create care request object
    const careRequest = {
      patientName: name,
      duration: duration,
      service: service,
      requestTime: getCurrentTime(),
      status: "Submitted",
      referenceId: "CARE-" + Math.random().toString(36).substr(2, 9).toUpperCase()
    };

    // Save to localStorage
    localStorage.setItem("careRequest", JSON.stringify(careRequest));

    showNotification(`✅ Care service request submitted! Reference: ${careRequest.referenceId}`, "success");

    // Reset form
    form.reset();

    console.log("Care Request Submitted:", careRequest);
  });
}

/**
 * Initialize Hospital Status Updates
 */
function initHospitalStatusUpdates() {
  const emergencyData = getEmergencyData();

  if (!emergencyData) return;

  // Simulate real-time ER preparation status
  const statusItems = [
    "Trauma bed reserved",
    "Cardiac team alerted",
    "Emergency equipment ready",
    "Respiratory specialist on standby"
  ];

  const statusList = document.querySelector("ul");
  if (statusList) {
    statusItems.forEach((item, index) => {
      setTimeout(() => {
        const li = statusList.querySelectorAll("li")[index];
        if (li) {
          li.style.opacity = "0.5";
          li.style.transition = "opacity 0.3s";
          setTimeout(() => {
            li.style.opacity = "1";
          }, 100);
        }
      }, index * 500);
    });
  }
}

// ==========================================
// PAGE INITIALIZATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
  // Determine current page and initialize appropriate handlers
  const currentPage = window.location.pathname;

  console.log("🚑 EMERGIX Platform Initialized - " + getCurrentTime());

  if (currentPage.includes("emergency.html")) {
    console.log("Loading Emergency Form...");
    initEmergencyForm();
  } else if (currentPage.includes("result.html")) {
    console.log("Loading Results Page...");
    initResultPage();
  } else if (currentPage.includes("hospital.html")) {
    console.log("Loading Hospital Dashboard...");
    initHospitalDashboard();
    initHospitalStatusUpdates();
  } else if (currentPage.includes("tracking.html")) {
    console.log("Loading Live Tracking...");
    initLiveTracking();
  } else if (currentPage.includes("elderly-care.html")) {
    console.log("Loading Elderly Care Form...");
    initElderlyCareForm();
  } else if (currentPage.includes("index.html") || currentPage === "/") {
    console.log("Home page loaded");
  }

  // Add global error handling
  window.addEventListener("error", function (e) {
    console.error("Application Error:", e.error);
  });
});

// ==========================================
// CLEANUP ON PAGE UNLOAD
// ==========================================

window.addEventListener("beforeunload", function () {
  if (trackingInterval) {
    clearInterval(trackingInterval);
  }
});
