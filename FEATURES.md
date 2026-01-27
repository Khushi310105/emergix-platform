# EMERGIX Platform - JavaScript Features Guide

## Overview
EMERGIX is an AI-powered emergency response platform with fully functional JavaScript that handles emergency triage, ambulance dispatch, hospital coordination, and elderly care services.

---

## ✨ Key Features Implemented

### 1. **Emergency Form Handler** (`emergency.html`)
- **Patient Assessment**: Collects age, consciousness level, breathing difficulty, and bleeding status
- **AI Triage Logic**: Automatically determines ambulance type (BLS/ALS) based on symptoms
- **Form Validation**: Ensures all required fields are filled before submission
- **Data Persistence**: Saves all emergency data to browser's localStorage for multi-page access
- **Notification System**: Shows user-friendly alerts for form validation and submission status

### 2. **AI Triage System**
The platform uses an intelligent priority scoring system:
```
Priority Calculation:
- Unconscious patient: +2 points
- Severe breathing difficulty: +2 points  
- Mild breathing difficulty: +1 point
- Heavy bleeding: +2 points
- Age > 60: +1 point

Response Level:
- Priority >= 5: Critical → ALS Ambulance + Trauma & Cardiac Center
- Priority >= 3: High → ALS Ambulance + Emergency Hospital
- Priority >= 2: Medium → BLS Ambulance + General Hospital
- Priority < 2: Low → Standard response
```

### 3. **Hospital ER Dashboard** (`hospital.html`)
- **Real-time Patient Alerts**: Displays incoming patient information
- **ER Readiness System**: Hospital staff can mark ER as ready for incoming patient
- **Automatic Team Alerts**: Shows which hospital departments are activated
- **Resource Preparation Checklist**: Lists equipment and staffing readiness
- **Status Persistence**: Maintains ER status across page refreshes

### 4. **Live Ambulance Tracking** (`tracking.html`)
- **Real-time Simulation**: Simulates ambulance movement with realistic data
- **Distance Updates**: Shows ambulance distance decreasing as it approaches
- **ETA Calculation**: Dynamically calculates estimated time of arrival
- **Status Timeline**: Displays timestamped ambulance events
- **Auto-refresh**: Updates tracking information every 5 seconds
- **Arrival Detection**: Notifies when ambulance reaches hospital

### 5. **Elderly Care Management** (`elderly-care.html`)
- **Care Request Form**: Collects patient name, care duration, and service type
- **Service Categories**:
  - Recovery Care
  - Medication Support
  - Full-time Assistance
  - Combined Services
- **Duration Options**: 1 week to long-term care
- **Reference Number Generation**: Provides unique tracking ID for each request
- **Confirmation Notifications**: Acknowledges and logs all care requests

### 6. **Data Management**
- **localStorage Integration**: All emergency and care data persists across page navigation
- **Data Structure**: Comprehensive emergency objects store:
  - Patient symptoms and medical history
  - Triage results and severity assessment
  - Hospital recommendations
  - Ambulance assignment
  - Timestamps for audit trails

### 7. **User Notifications**
- **Toast-style Alerts**: Non-intrusive notifications for user actions
- **Color-coded Messages**:
  - Green: Success notifications
  - Red: Error messages
  - Blue: Information alerts
- **Auto-dismiss**: Notifications automatically disappear after 3 seconds

### 8. **Real-time Simulation Features**
- **Ambulance Movement**: Realistic ambulance tracking with distance/speed calculations
- **Status Updates**: Timestamped events showing ambulance progression
- **Dynamic DOM Updates**: Information updates without page refresh
- **Live ETA**: Calculates remaining time based on distance and speed

---

## 🔧 Technical Implementation

### Core Functions

#### `performAITriage(age, conscious, breathing, bleeding)`
Returns triage assessment with ambulance type, hospital recommendation, severity level, and ETA.

#### `getHospitalDetails(hospitalType)`
Returns comprehensive hospital information including name, specialization, distance, and bed status.

#### `initEmergencyForm()`
Handles emergency form submission, validation, and navigation to results page.

#### `initLiveTracking()`
Starts real-time ambulance tracking simulation with periodic updates.

#### `initHospitalDashboard()`
Sets up hospital staff interface for marking ER readiness and monitoring incoming patients.

#### `initElderlyCareForm()`
Manages elderly care service request submissions and generates reference numbers.

---

## 📊 Data Flow

```
1. User visits emergency.html
   ↓
2. Fills out emergency form with patient details
   ↓
3. JavaScript performs AI Triage analysis
   ↓
4. Data saved to localStorage
   ↓
5. User redirected to result.html
   ↓
6. Hospital receives alert on hospital.html
   ↓
7. Patient tracked in real-time on tracking.html
   ↓
8. Post-discharge care arranged via elderly-care.html
```

---

## 🎯 Usage Examples

### Emergency Request Example:
1. User selects "Emergency Help" from home page
2. Enters: Age 72, Unconscious, Severe breathing, No bleeding
3. System calculates: Priority = 5 (Critical)
4. Assigns: ALS Ambulance + Trauma & Cardiac Center
5. ETA: 6 minutes
6. Hospital receives alert automatically

### Live Tracking Example:
1. After emergency is reported, user sees tracking page
2. Ambulance updates appear every 5 seconds
3. Distance: 1.8 km → 1.5 km → 1.2 km (decreasing)
4. ETA updates: 6 min → 5 min → 4 min → Arrival!

### Elderly Care Example:
1. After discharge, user books post-emergency care
2. Enters: Patient name, 1-month duration, Full-time assistance
3. System generates: Reference ID (CARE-ABC123XYZ)
4. Care coordinator contacts patient within 24 hours

---

## 🛡️ Error Handling

- **Form Validation**: Prevents submission of incomplete forms
- **Data Validation**: Ensures numeric values for age
- **Page Detection**: Automatically detects which page is loaded and activates relevant features
- **Graceful Degradation**: Works even if localStorage is unavailable (non-critical features)
- **Console Logging**: Comprehensive debugging information logged to browser console

---

## 📱 Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Uses standard ES6 JavaScript (no external dependencies)
- LocalStorage supported for data persistence
- DOM manipulation with vanilla JavaScript

---

## 🚀 Future Enhancements

- Integration with real hospital databases
- GPS-based actual ambulance tracking
- SMS/email notifications
- Multi-language support
- Accessibility improvements (ARIA labels, keyboard navigation)
- Mobile app version
- Payment integration for care services

---

## 📝 Notes

- All timestamps use the user's local time zone
- Tracking simulation uses realistic ambulance speed (45 km/h average)
- Priority scores can be adjusted based on medical expertise
- Hospital location data is simulated (can be replaced with real data)

---

**Last Updated:** January 2026  
**Platform Version:** 1.0 (Fully Functional)
