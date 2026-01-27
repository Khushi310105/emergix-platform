# EMERGIX Platform - Testing Guide

## How to Test the Platform Locally

### Step 1: Open the Platform
1. Navigate to: `c:\Users\Khushi\OneDrive\Desktop\EMERGIX1\emergix-platform\frontend`
2. Open `index.html` in your browser (or use a local web server)
3. You should see the EMERGIX home page

### Step 2: Test Emergency Request Flow

**Scenario 1: Critical Emergency**
1. Click "🚨 Emergency Help" button
2. Fill the form with:
   - Age: 75
   - Conscious: No
   - Breathing: Severe
   - Bleeding: Yes
   - Description: "Fell from stairs, unconscious"
3. Click "🚑 Find Ambulance & Hospital"
4. You'll see a success notification and redirect to result.html
5. Observe: ALS Ambulance + Trauma & Cardiac Center assigned

**Scenario 2: Mild Emergency**
1. Go back to emergency.html (click "Emergency" in navbar)
2. Fill the form with:
   - Age: 35
   - Conscious: Yes
   - Breathing: No
   - Bleeding: No
   - Description: "Minor car accident"
3. You'll see: BLS Ambulance + General Hospital assigned

### Step 3: Test Hospital Dashboard
1. From result.html, click "🏥 View Hospital ER Dashboard"
2. You'll see hospital receiving the patient alert
3. Click "✅ Mark ER Ready" button
4. Observe: Button changes to show ER is ready and gets disabled

### Step 4: Test Live Tracking
1. From result.html, click "🔗 Share Live Tracking Link"
2. Watch ambulance distance decrease from 1.8 km
3. ETA updates in real-time (every 5 seconds)
4. Status updates appear with timestamps
5. After ~40 updates (3-4 minutes), you'll see arrival notification

### Step 5: Test Elderly Care Service
1. From home (index.html), click "👵 Elderly Care Services"
2. Scroll down to "📋 Book a Caregiver" form
3. Fill with:
   - Patient Name: "John Doe"
   - Care Duration: "1 Month"
   - Service: "Full-time Assistance"
4. Click "📋 Request Care Service"
5. Observe: Success notification with reference ID (e.g., CARE-ABC123XYZ)

### Step 6: Check Browser Console
1. Press F12 to open Developer Tools
2. Go to "Console" tab
3. You'll see logs like:
   - "🚑 EMERGIX Platform Initialized"
   - "Loading Emergency Form..."
   - "Emergency Data Loaded"
   - Triage results
   - Tracking updates with timestamps

### Step 7: Test Data Persistence
1. Submit an emergency request
2. Refresh the page (Ctrl+F5)
3. The page still works and has access to the saved emergency data
4. Navigate between pages - data persists across all pages

---

## Testing Checklist

- [ ] Emergency form validates required fields
- [ ] AI triage correctly assigns ambulance type
- [ ] Data saves to localStorage
- [ ] Result page displays after submission
- [ ] Hospital dashboard shows patient alert
- [ ] ER Ready button works and disables
- [ ] Live tracking updates every 5 seconds
- [ ] Tracking distance decreases properly
- [ ] Elderly care form accepts submissions
- [ ] Notifications appear and auto-dismiss
- [ ] Console shows debugging information
- [ ] All navigation links work
- [ ] Page detection works correctly

---

## Expected Console Output Example

```
🚑 EMERGIX Platform Initialized - 02:15:30 PM
Loading Emergency Form...
Emergency Data Loaded:
{
  timestamp: "2026-01-27T14:15:45.123Z",
  patient: { age: 72, conscious: "no", ... },
  triage: { ambulanceType: "ALS", priority: 5, ... },
  ...
}
[02:15:35 PM] Ambulance Update - Distance: 1.5 km, ETA: 5 min
[02:15:40 PM] Ambulance Update - Distance: 1.2 km, ETA: 3 min
```

---

## Browser Storage Check

To verify data is being saved:
1. Press F12 → Application tab
2. Click "Local Storage"
3. Select your domain
4. You'll see:
   - Key: `emergixData` → Contains complete emergency info
   - Key: `careRequest` → Contains elderly care request

---

## Troubleshooting

**Issue: Emergency form not submitting**
- Solution: Check browser console (F12) for errors, ensure all fields are filled

**Issue: No redirect to result.html**
- Solution: Verify paths are correct, check file naming in emergency.html link

**Issue: Tracking not updating**
- Solution: Check if browser supports setInterval, try refreshing the page

**Issue: Notifications not showing**
- Solution: Check browser's notification permissions, try F12 refresh

**Issue: Data not persisting**
- Solution: Check if localStorage is enabled, try different browser

---

## Performance Notes

- All features use vanilla JavaScript (no heavy libraries)
- Tracking updates every 5 seconds (adjustable)
- Notifications auto-dismiss after 3 seconds
- Data stored locally (no server calls in demo)
- Minimal memory footprint

---

## Next Steps for Production

1. Connect to real hospital database API
2. Integrate actual ambulance GPS tracking
3. Add user authentication
4. Implement payment gateway
5. Add SMS/Email notification service
6. Create admin dashboard
7. Set up real-time database (Firebase/MongoDB)
8. Implement security measures (HTTPS, encryption)

---

**Happy Testing! 🚑**
