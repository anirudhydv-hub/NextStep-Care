// ==========================================
// CUSTOM NATIVE LANGUAGE TRANSLATOR
// ==========================================
const translations = {
    en: {
        "nav_brand": "NextStep Care",
        "logout": "Logout",
        "back": "Back",
        "tab_dashboard": "Dashboard",
        "tab_diet": "Diet & Care",
        "tab_plans": "Plans",
        "tab_profile": "Profile Check",
        "btn_update_health": "Update Health",
        "btn_diet_plan": "Diet Plan",
        "btn_emergency": "Emergency",
        "med_reminders": "Medicine Reminders",
        "vitals_dash": "Vitals Dashboard",
        "heart_rate": "Heart Rate",
        "blood_pressure": "Blood Pressure",
        "blood_sugar": "Blood Sugar",
        "hemoglobin": "Hemoglobin",
        "trends": "30-Day Trends",
        "overview": "Overview",
        "patients": "Patients",
        "add_patient": "Add Patient",
        "analytics": "Analytics"
    },
    hi: {
        "nav_brand": "नेक्स्टस्टेप केयर",
        "logout": "लॉग आउट",
        "back": "वापस",
        "tab_dashboard": "डैशबोर्ड",
        "tab_diet": "आहार और देखभाल",
        "tab_plans": "योजनाएं",
        "tab_profile": "प्रोफ़ाइल जांच",
        "btn_update_health": "स्वास्थ्य अपडेट",
        "btn_diet_plan": "आहार योजना",
        "btn_emergency": "आपातकालीन",
        "med_reminders": "दवा अनुस्मारक",
        "vitals_dash": "विटल्स डैशबोर्ड",
        "heart_rate": "हृदय गति",
        "blood_pressure": "रक्तचाप",
        "blood_sugar": "रक्त शर्करा",
        "hemoglobin": "हीमोग्लोबिन",
        "trends": "30-दिन के रुझान",
        "overview": "अवलोकन",
        "patients": "मरीज़",
        "add_patient": "मरीज़ जोड़ें",
        "analytics": "एनालिटिक्स"
    }
};

let currentLang = localStorage.getItem('appLang') || 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    localStorage.setItem('appLang', currentLang);
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            if (element.children.length > 0 && element.querySelector('i')) {
                const iconHTML = element.querySelector('i').outerHTML;
                element.innerHTML = `${iconHTML} ${translations[currentLang][key]}`;
            } else {
                element.textContent = translations[currentLang][key];
            }
        }
    });

    const toggleBtn = document.getElementById('langToggleBtn');
    if (toggleBtn) {
        toggleBtn.textContent = currentLang === 'en' ? 'EN' : 'HI';
    }
}

// ==========================================
// 1. DATABASE INIT
// ==========================================
let appData = {
    users: [
        { id: 1, name: 'Dr. Aman', email: 'amxy1@gmail.com', password: '123', type: 'doctor', specialization: 'Cardiologist', doctorId: 'DOC001' },
        { id: 3, name: 'Ayush Sharma', email: 'ayush0101@gmail.com', password: '123', type: 'patient', patientId: 'PAT001' }
    ],
    patients: [
        {
            id: 'PAT001', name: 'Ayush Sharma', age: 45, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'cardiac', currentBP: '130/85', bloodSugar: 110, hemoglobin: 13.5,
            medicines: [{ name: 'Aspirin', dosage: '75mg', time: '08:00', taken: false }, { name: 'Atorvastatin', dosage: '40mg', time: '20:00', taken: false }],
            nextAppointment: '2026-05-15', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 145, systolic: 150, diastolic: 95, hr: 80, symptoms: '' },
                { date: 'Day 2', sugar: 135, systolic: 142, diastolic: 90, hr: 78, symptoms: '' },
                { date: 'Day 3', sugar: 120, systolic: 135, diastolic: 88, hr: 75, symptoms: '' },
                { date: 'Day 4', sugar: 110, systolic: 130, diastolic: 85, hr: 72, symptoms: 'Mild headache, Tiredness' }
            ]
        },
        {
            id: 'PAT002', name: 'Astha Singh', age: 28, gender: 'female', doctorId: 'DOC001',
            primaryDisease: 'c-section', currentBP: '118/76', bloodSugar: 95, hemoglobin: 10.2,
            medicines: [{ name: 'Iron Supplement', dosage: '1 tablet', time: '09:00', taken: true }],
            nextAppointment: '2026-05-20', healthStatus: 'moderate',
            historicalVitals: [
                { date: 'Day 1', sugar: 100, systolic: 125, diastolic: 80, hr: 85, symptoms: '' },
                { date: 'Day 2', sugar: 98, systolic: 122, diastolic: 78, hr: 82, symptoms: '' },
                { date: 'Day 3', sugar: 95, systolic: 120, diastolic: 78, hr: 80, symptoms: '' },
                { date: 'Day 4', sugar: 95, systolic: 118, diastolic: 76, hr: 78, symptoms: 'Lower abdomen pain' }
            ]
        },
        {
            id: 'PAT003', name: 'Rajesh Kumar', age: 55, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'diabetes', currentBP: '140/90', bloodSugar: 185, hemoglobin: 14.1,
            medicines: [{ name: 'Metformin', dosage: '500mg', time: '08:00', taken: false }, { name: 'Insulin', dosage: '10 units', time: '21:00', taken: false }],
            nextAppointment: '2026-05-10', healthStatus: 'critical',
            historicalVitals: [
                { date: 'Day 1', sugar: 210, systolic: 145, diastolic: 95, hr: 88, symptoms: '' },
                { date: 'Day 2', sugar: 195, systolic: 142, diastolic: 92, hr: 85, symptoms: '' },
                { date: 'Day 3', sugar: 188, systolic: 140, diastolic: 90, hr: 82, symptoms: '' },
                { date: 'Day 4', sugar: 185, systolic: 140, diastolic: 90, hr: 80, symptoms: 'Frequent thirst, Blurred vision' }
            ]
        },
        {
            id: 'PAT004', name: 'Meera Devi', age: 62, gender: 'female', doctorId: 'DOC001',
            primaryDisease: 'hypertension', currentBP: '125/80', bloodSugar: 105, hemoglobin: 11.5,
            medicines: [{ name: 'Amlodipine', dosage: '5mg', time: '09:00', taken: false }],
            nextAppointment: '2026-05-22', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 108, systolic: 155, diastolic: 98, hr: 70, symptoms: '' },
                { date: 'Day 2', sugar: 105, systolic: 145, diastolic: 90, hr: 72, symptoms: '' },
                { date: 'Day 3', sugar: 105, systolic: 135, diastolic: 85, hr: 70, symptoms: '' },
                { date: 'Day 4', sugar: 105, systolic: 125, diastolic: 80, hr: 68, symptoms: '' }
            ]
        },
        {
            id: 'PAT005', name: 'Vikram Malhotra', age: 40, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'knee replacement', currentBP: '120/80', bloodSugar: 90, hemoglobin: 15.0,
            medicines: [{ name: 'Ibuprofen', dosage: '400mg', time: '08:00', taken: false }],
            nextAppointment: '2026-06-01', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 95, systolic: 125, diastolic: 82, hr: 74, symptoms: '' },
                { date: 'Day 2', sugar: 95, systolic: 122, diastolic: 80, hr: 72, symptoms: '' },
                { date: 'Day 3', sugar: 92, systolic: 120, diastolic: 80, hr: 72, symptoms: '' },
                { date: 'Day 4', sugar: 90, systolic: 120, diastolic: 80, hr: 70, symptoms: 'Joint stiffness in morning' }
            ]
        },
        {
            id: 'PAT006', name: 'Sanjay Verma', age: 34, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'asthma', currentBP: '115/75', bloodSugar: 98, hemoglobin: 14.2,
            medicines: [{ name: 'Salbutamol', dosage: '2 puffs', time: '08:00', taken: false }],
            nextAppointment: '2026-05-25', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 99, systolic: 118, diastolic: 76, hr: 82, symptoms: '' },
                { date: 'Day 2', sugar: 98, systolic: 116, diastolic: 75, hr: 80, symptoms: '' },
                { date: 'Day 3', sugar: 98, systolic: 115, diastolic: 75, hr: 78, symptoms: '' },
                { date: 'Day 4', sugar: 98, systolic: 115, diastolic: 75, hr: 76, symptoms: 'Shortness of breath' }
            ]
        },
        {
            id: 'PAT007', name: 'Priya Patel', age: 42, gender: 'female', doctorId: 'DOC001',
            primaryDisease: 'thyroid', currentBP: '122/78', bloodSugar: 102, hemoglobin: 12.8,
            medicines: [{ name: 'Levothyroxine', dosage: '50mcg', time: '06:00', taken: true }],
            nextAppointment: '2026-06-10', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 105, systolic: 120, diastolic: 80, hr: 68, symptoms: '' },
                { date: 'Day 2', sugar: 102, systolic: 120, diastolic: 78, hr: 70, symptoms: '' },
                { date: 'Day 3', sugar: 102, systolic: 122, diastolic: 78, hr: 72, symptoms: '' },
                { date: 'Day 4', sugar: 102, systolic: 122, diastolic: 78, hr: 72, symptoms: '' }
            ]
        },
        {
            id: 'PAT008', name: 'Anil Desai', age: 68, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'chronic kidney disease', currentBP: '150/95', bloodSugar: 140, hemoglobin: 9.5,
            medicines: [{ name: 'Furosemide', dosage: '40mg', time: '08:00', taken: false }],
            nextAppointment: '2026-05-05', healthStatus: 'critical',
            historicalVitals: [
                { date: 'Day 1', sugar: 150, systolic: 160, diastolic: 100, hr: 90, symptoms: '' },
                { date: 'Day 2', sugar: 148, systolic: 155, diastolic: 98, hr: 88, symptoms: '' },
                { date: 'Day 3', sugar: 145, systolic: 152, diastolic: 96, hr: 85, symptoms: '' },
                { date: 'Day 4', sugar: 140, systolic: 150, diastolic: 95, hr: 85, symptoms: 'Swelling in ankles' }
            ]
        },
        {
            id: 'PAT009', name: 'Neha Gupta', age: 25, gender: 'female', doctorId: 'DOC001',
            primaryDisease: 'post-appendectomy', currentBP: '110/70', bloodSugar: 88, hemoglobin: 11.2,
            medicines: [{ name: 'Paracetamol', dosage: '500mg', time: '08:00', taken: false }],
            nextAppointment: '2026-05-12', healthStatus: 'moderate',
            historicalVitals: [
                { date: 'Day 1', sugar: 90, systolic: 115, diastolic: 75, hr: 76, symptoms: '' },
                { date: 'Day 2', sugar: 88, systolic: 112, diastolic: 72, hr: 74, symptoms: '' },
                { date: 'Day 3', sugar: 88, systolic: 110, diastolic: 70, hr: 72, symptoms: '' },
                { date: 'Day 4', sugar: 88, systolic: 110, diastolic: 70, hr: 70, symptoms: '' }
            ]
        },
        {
            id: 'PAT010', name: 'Ravi Kishan', age: 39, gender: 'male', doctorId: 'DOC001',
            primaryDisease: 'migraine', currentBP: '128/82', bloodSugar: 95, hemoglobin: 15.5,
            medicines: [{ name: 'Propranolol', dosage: '40mg', time: '08:00', taken: false }],
            nextAppointment: '2026-06-15', healthStatus: 'stable',
            historicalVitals: [
                { date: 'Day 1', sugar: 96, systolic: 130, diastolic: 85, hr: 65, symptoms: '' },
                { date: 'Day 2', sugar: 95, systolic: 128, diastolic: 82, hr: 68, symptoms: '' },
                { date: 'Day 3', sugar: 95, systolic: 128, diastolic: 82, hr: 66, symptoms: '' },
                { date: 'Day 4', sugar: 95, systolic: 128, diastolic: 82, hr: 65, symptoms: 'Nausea, Sensitivity to light' }
            ]
        }
    ]
};
// ==========================================
// 2. CORE FUNCTIONS (Load, Save, Auth)
// ==========================================
function loadData() {
    const saved = localStorage.getItem('postHospitalCare');
    if (saved) appData = { ...appData, ...JSON.parse(saved) };
}

function saveData() {
    localStorage.setItem('postHospitalCare', JSON.stringify(appData));
}

document.addEventListener('DOMContentLoaded', function() {
    loadData();
    applyTranslations();
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
    const registerForm = document.getElementById('registerForm');
    if (registerForm) registerForm.addEventListener('submit', handleRegister);

    if (window.location.pathname.includes('patient-dashboard.html')) {
        setupPatientDashboard();
        const healthForm = document.getElementById('healthUpdateForm');
        if(healthForm) healthForm.addEventListener('submit', handleHealthUpdate);
    }

    if (window.location.pathname.includes('doctor-dashboard.html')) {
        initDoctorDashboard();
        setupNavigation();
    }
    
    if (window.location.pathname.includes('patient-profile.html')) {
        initPatientProfile();
    }
});

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('userType').value;
    const user = appData.users.find(u => u.email === email && u.password === password && u.type === userType);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = userType === 'doctor' ? 'doctor-dashboard.html' : 'patient-dashboard.html';
    } else {
        alert('Invalid credentials!');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const userData = {
        id: Date.now(), name: document.getElementById('name').value, email: document.getElementById('email').value,
        password: document.getElementById('password').value, type: document.getElementById('userType').value
    };
    appData.users.push(userData);
    saveData();
    alert('Registration successful! Please login.');
    window.location.href = 'login.html';
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// ==========================================
// 3. DOCTOR DASHBOARD LOGIC
// ==========================================
function initDoctorDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.type === 'doctor') {
        const nameEl = document.getElementById('doctorName');
        if(nameEl) nameEl.textContent = currentUser.name;
        
        const doctorPatients = appData.patients.filter(p => p.doctorId === currentUser.doctorId || !p.doctorId);
        
        const actPat = document.getElementById('activePatients');
        if(actPat) actPat.textContent = doctorPatients.length;
        
        const critPat = document.getElementById('criticalPatients');
        if(critPat) critPat.textContent = doctorPatients.filter(p => p.healthStatus === 'critical').length;
        
        displayPatientsTable(doctorPatients);
        
        const selector = document.getElementById('chartPatientSelector');
        if (selector && doctorPatients.length > 0) {
            selector.innerHTML = '';
            doctorPatients.forEach(p => {
                selector.innerHTML += `<option value="${p.id}">${p.name} (${p.id})</option>`;
            });
            setTimeout(() => renderSplitCharts(doctorPatients[0], 'doctor'), 500); 
        }
    }
}

function updateDoctorCharts() {
    const selectedPatientId = document.getElementById('chartPatientSelector').value;
    const patient = appData.patients.find(p => p.id === selectedPatientId);
    if (patient) {
        renderSplitCharts(patient, 'doctor');
    }
}

function displayPatientsTable(patients) {
    const tbody = document.getElementById('patientsTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    patients.forEach(patient => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td><strong>${patient.name}</strong></td>
            <td>${patient.id}</td>
            <td style="text-transform: capitalize;">${patient.primaryDisease}</td>
            <td>${patient.currentBP}</td>
            <td>${patient.bloodSugar}</td>
            <td><span class="status ${patient.healthStatus}" style="padding: 5px 10px; border-radius: 12px; font-weight: bold; font-size: 0.8rem;">${patient.healthStatus.toUpperCase()}</span></td>
            <td><a href="patient-profile.html?id=${patient.id}" class="view-btn">View Profile</a></td>
        `;
    });
}

function filterPatients() {
    const diseaseFilter = document.getElementById('diseaseFilter').value;
    const searchTerm = document.getElementById('searchPatient').value.toLowerCase();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let patients = appData.patients.filter(p => p.doctorId === currentUser.doctorId || !p.doctorId);
    
    if (diseaseFilter) patients = patients.filter(p => p.primaryDisease === diseaseFilter);
    if (searchTerm) patients = patients.filter(p => p.name.toLowerCase().includes(searchTerm));
    displayPatientsTable(patients);
}

function setupNavigation() {
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                document.querySelector('.sidebar a.active').classList.remove('active');
                this.classList.add('active');
                
                document.querySelectorAll('.content-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                const target = this.getAttribute('href');
                const section = document.querySelector(target);
                if (section) section.style.display = 'block';
                
                if(target === '#analytics-section') {
                    renderSplitCharts(appData.patients[0], 'doctor');
                }
            }
        });
    });
}

// ==========================================
// 4. DOCTOR'S VIEW OF SINGLE PATIENT
// ==========================================
function initPatientProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) document.getElementById('doctorNameHeader').textContent = currentUser.name;

    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
    if (!patientId) return window.location.href = "doctor-dashboard.html";

    const patient = appData.patients.find(p => p.id === patientId);
    if (!patient) return;

    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('patientId').textContent = patient.id;
    document.getElementById('patientAge').textContent = patient.age;
    document.getElementById('patientDisease').textContent = patient.primaryDisease.toUpperCase();
    
    const statusBadge = document.getElementById('healthStatus');
    statusBadge.textContent = patient.healthStatus.toUpperCase();
    
    if (patient.healthStatus === 'stable') { statusBadge.style.background = '#dcfce7'; statusBadge.style.color = '#166534'; }
    else if (patient.healthStatus === 'moderate') { statusBadge.style.background = '#fef08a'; statusBadge.style.color = '#854d0e'; }
    else { statusBadge.style.background = '#fee2e2'; statusBadge.style.color = '#991b1b'; }

    const lastVitals = patient.historicalVitals[patient.historicalVitals.length - 1];
    
    const patHR = document.getElementById('patHR');
    if(patHR) patHR.textContent = lastVitals ? (lastVitals.hr || 75) : '--';

    document.getElementById('patBP').textContent = patient.currentBP;
    document.getElementById('patSugar').textContent = patient.bloodSugar;
    document.getElementById('patHemo').textContent = patient.hemoglobin; 
    document.getElementById('patAppt').textContent = new Date(patient.nextAppointment).toLocaleDateString();

    const sympContainer = document.getElementById('patSymptomsContainer');
    if (sympContainer) {
        sympContainer.innerHTML = '';
        if (lastVitals && lastVitals.symptoms && lastVitals.symptoms.trim() !== '') {
            const symps = lastVitals.symptoms.split(','); 
            symps.forEach(s => {
                if(s.trim()) {
                    sympContainer.innerHTML += `<span style="background: #fee2e2; color: #dc2626; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; border: 1px solid #fca5a5;"><i class="fas fa-exclamation-circle" style="margin-right: 4px;"></i> ${s.trim()}</span>`;
                }
            });
        } else {
            sympContainer.innerHTML = '<span style="color: #64748b; font-size: 0.9rem; font-style: italic;">No recent symptoms reported.</span>';
        }
    }

    const medContainer = document.getElementById('medicineListContainer');
    medContainer.innerHTML = '';
    patient.medicines.forEach(med => {
        medContainer.innerHTML += `
            <div style="padding: 20px; display: flex; flex-direction: column; gap: 8px;">
                <h4 style="color: #1e3c72; margin-bottom: 2px;">${med.name}</h4>
                <p style="margin: 0; color: #475569; font-size: 0.95rem;"><strong>Dosage:</strong> ${med.dosage}</p>
                <span style="background: #dcfce7; color: #166534; padding: 5px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; width: fit-content; margin-top: 5px;"><i class="far fa-clock"></i> ${med.time}</span>
            </div>
        `;
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
            if(targetId === 'charts') {
                renderSplitCharts(patient, 'doctorSingle');
            }
        });
    });
}

// ==========================================
// 5. PATIENT DASHBOARD LOGIC
// ==========================================
const diseasePlans = {
    'cardiac': { diet: '<strong>Focus on heart health:</strong><br>• <strong>Vegetables:</strong> Spinach, broccoli.<br>• <strong>Fruits:</strong> Berries, oranges.', activity: '30 minutes of brisk walking daily. Avoid heavy lifting.' },
    'diabetes': { diet: '<strong>Focus on blood sugar control:</strong><br>• <strong>Vegetables:</strong> Bitter gourd, leafy greens.<br>• <strong>Fruits:</strong> Guava, green apples.', activity: 'Post-meal light walking. Moderate aerobic exercise.' },
    'hypertension': { diet: '<strong>Focus on BP reduction:</strong><br>• <strong>Vegetables:</strong> Beetroot, sweet potatoes.<br>• <strong>Fruits:</strong> Bananas, pomegranate.', activity: 'Yoga, meditation, and 40 minutes of cardio.' },
    'c-section': { diet: '<strong>Focus on healing and recovery:</strong><br>• <strong>Vegetables:</strong> Spinach, lentils.<br>• <strong>Fruits:</strong> Sweet lime, oranges.', activity: 'Short, slow walks. No heavy lifting.' },
    'default': { diet: '<strong>Focus on general wellness:</strong><br>• <strong>Vegetables:</strong> Mixed seasonal vegetables.<br>• <strong>Fruits:</strong> Seasonal fruits.', activity: 'Light daily stretching and 20 minute walks.' }
};

function setupPatientDashboard() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || currentUser.type !== 'patient') return;

    document.getElementById('currentDateHeader').textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

    const patient = appData.patients.find(p => p.id === currentUser.patientId);
    if (!patient) return;
    
    document.getElementById('patientName').textContent = patient.name;
    document.getElementById('dashBP').textContent = patient.currentBP || '--';
    document.getElementById('dashSugar').textContent = patient.bloodSugar || '--';
    
    const lastVitals = patient.historicalVitals[patient.historicalVitals.length - 1];
    document.getElementById('dashHR').textContent = lastVitals ? (lastVitals.hr || 75) + ' bpm' : '--';
    
    const dashHemo = document.getElementById('dashHemo');
    if(dashHemo) dashHemo.textContent = (lastVitals && lastVitals.hemo ? lastVitals.hemo : patient.hemoglobin || '--') + ' g/dL';

    const plan = diseasePlans[patient.primaryDisease.toLowerCase()] || diseasePlans['default'];
    document.getElementById('dietPlanContent').innerHTML = plan.diet; 
    document.getElementById('activityPlanContent').textContent = plan.activity;

    renderMedicines(patient);
    setTimeout(() => renderSplitCharts(patient, 'patient'), 500);
}

function renderMedicines(patient) {
    const medList = document.getElementById('medicineList');
    medList.innerHTML = '';
    let takenCount = 0; let missedMed = null;
    patient.medicines.forEach((med, index) => {
        const isTaken = med.taken || false; 
        if (isTaken) takenCount++; else missedMed = med.name; 
        medList.innerHTML += `
            <div class="med-card ${isTaken ? 'taken' : ''}" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; margin-bottom: 10px;">
                <div>
                    <h4 style="color: #1e3c72; margin-bottom: 4px; font-size: 1.1rem;">${med.name} ${med.dosage}</h4>
                    <span style="font-size: 0.85rem; color: #475569; font-weight: 600;"><i class="far fa-clock"></i> Scheduled: ${med.time}</span>
                </div>
                <button class="btn-take ${isTaken ? 'taken' : ''}" onclick="toggleMedicine('${patient.id}', ${index})" style="background: ${isTaken ? '#dcfce7' : 'white'}; color: ${isTaken ? '#166534' : '#1e293b'}; border: 1px solid ${isTaken ? '#166534' : '#cbd5e1'}; padding: 8px 15px; border-radius: 10px; font-weight: bold; cursor: pointer;">
                    ${isTaken ? '<i class="fas fa-check"></i> Taken' : 'Mark Taken'}
                </button>
            </div>
        `;
    });
    const total = patient.medicines.length;
    document.getElementById('medProgressText').textContent = `${takenCount}/${total} taken`;
    document.getElementById('medProgressBar').style.width = total === 0 ? '0%' : `${(takenCount/total)*100}%`;
    const alertBox = document.getElementById('missedDosageAlert');
    if (takenCount < total && missedMed) {
        alertBox.style.display = 'flex';
        document.getElementById('missedMedicineName').textContent = `${missedMed} was not marked as taken.`;
    } else { alertBox.style.display = 'none'; }
}

function toggleMedicine(patientId, medIndex) {
    const patient = appData.patients.find(p => p.id === patientId);
    patient.medicines[medIndex].taken = !patient.medicines[medIndex].taken;
    saveData(); renderMedicines(patient);
}

function triggerEmergency() {
    const confirmSOS = confirm("🚨 URGENT: Do you need to call an ambulance and alert your doctor immediately?");
    if(confirmSOS) alert("Ambulance dispatched. Doctor has been notified via priority alert.");
}

function handleHealthUpdate(e) {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const patient = appData.patients.find(p => p.id === currentUser.patientId);
    
    const bp = document.getElementById('bp').value;
    const hr = parseInt(document.getElementById('hr').value);
    const sugar = parseInt(document.getElementById('sugar').value);
    const hemo = parseFloat(document.getElementById('hemoInput').value); 
    const symptomsInput = document.getElementById('symptoms');
    const symptoms = symptomsInput ? symptomsInput.value : '';

    patient.currentBP = bp;
    patient.bloodSugar = sugar;
    patient.hemoglobin = hemo; 
    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    patient.historicalVitals.push({
        date: today, sugar: sugar, hr: hr, systolic: parseInt(bp.split('/')[0]), diastolic: parseInt(bp.split('/')[1]), symptoms: symptoms, hemo: hemo 
    });

    saveData(); 
    document.getElementById('logVitalsModal').style.display = 'none';
    setupPatientDashboard(); 
    alert("Vitals logged successfully. Your doctor can now see your updates and symptoms.");
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.secondary-nav a').forEach(el => el.classList.remove('active'));
    document.getElementById('tab-' + tabId).style.display = 'block';
    event.currentTarget.classList.add('active');
}

// ==========================================
// 6. SHARED CHART ENGINE
// ==========================================
function renderSplitCharts(patient, context = 'patient') {
    if(!patient || !patient.historicalVitals) return;
    const dates = patient.historicalVitals.map(v => v.date);
    const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { border: { display: false } } } };

    const ctxHR = document.getElementById('chartHR');
    if (ctxHR) {
        if(window['chartHRInstance']) window['chartHRInstance'].destroy();
        window['chartHRInstance'] = new Chart(ctxHR, {
            type: 'line',
            data: { labels: dates, datasets: [{ data: patient.historicalVitals.map(v => v.hr || 75), borderColor: '#0ea5e9', backgroundColor: 'rgba(14, 165, 233, 0.1)', fill: true, tension: 0.4 }] },
            options: chartOptions
        });
    }

    const ctxBP = document.getElementById('chartBP');
    if (ctxBP) {
        if(window['chartBPInstance']) window['chartBPInstance'].destroy();
        window['chartBPInstance'] = new Chart(ctxBP, {
            type: 'line',
            data: { labels: dates, datasets: [
                { data: patient.historicalVitals.map(v => v.systolic), borderColor: '#e11d48', tension: 0.4 },
                { data: patient.historicalVitals.map(v => v.diastolic), borderColor: '#d97706', borderDash: [5,5], tension: 0.4 }
            ]},
            options: chartOptions
        });
    }

    const ctxSugar = document.getElementById('chartSugar');
    if (ctxSugar) {
        if(window['chartSugarInstance']) window['chartSugarInstance'].destroy();
        window['chartSugarInstance'] = new Chart(ctxSugar, {
            type: 'line',
            data: { labels: dates, datasets: [{ data: patient.historicalVitals.map(v => v.sugar), borderColor: '#f97316', backgroundColor: 'rgba(249, 115, 22, 0.1)', fill: true, tension: 0.4 }] },
            options: chartOptions
        });
    }

    const ctxHemo = document.getElementById('chartHemo');
    if (ctxHemo) {
        if(window['chartHemoInstance']) window['chartHemoInstance'].destroy();
        window['chartHemoInstance'] = new Chart(ctxHemo, {
            type: 'line',
            data: { 
                labels: dates, 
                datasets: [{ 
                    data: patient.historicalVitals.map(v => v.hemo || patient.hemoglobin),
                    borderColor: '#8b5cf6', 
                    backgroundColor: 'rgba(139, 92, 246, 0.1)', 
                    fill: true, 
                    tension: 0.4 
                }] 
            },
            options: chartOptions
        });
    }
}

// ==========================================
// 7. ADVANCED NEW FEATURES LOGIC
// ==========================================
function scheduleTelemedicine() {
    const dateTime = document.getElementById('telemedDateTime').value;
    if (!dateTime) return alert("Please select a date and time for the consultation.");
    let toast = document.getElementById('toastNotification');
    if (!toast) {
        toast = document.createElement('div'); toast.id = 'toastNotification';
        toast.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: #10b981; color: white; padding: 15px 25px; border-radius: 12px; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); font-weight: 600; z-index: 1001; display: flex; align-items: center; gap: 12px;";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-video"></i> <span>Telemedicine link sent to patient for ${new Date(dateTime).toLocaleString()}</span>`;
    toast.style.display = 'flex'; setTimeout(() => { toast.style.display = 'none'; }, 4000);
    document.getElementById('telemedDateTime').value = '';
}

function addNewMedicine() {
    const name = document.getElementById('newMedName').value; const dosage = document.getElementById('newMedDosage').value; const time = document.getElementById('newMedTime').value;
    if(!name || !dosage || !time) return alert("Please fill all medicine fields.");
    const urlParams = new URLSearchParams(window.location.search); const patientId = urlParams.get('id');
    const patient = appData.patients.find(p => p.id === patientId);
    if(patient) {
        patient.medicines.push({ name, dosage, time, taken: false });
        saveData(); alert("Prescription added successfully!");
        document.getElementById('newMedName').value = ''; document.getElementById('newMedDosage').value = ''; document.getElementById('newMedTime').value = '';
        initPatientProfile(); 
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) return;
    const docProfile = document.getElementById('doctorProfileDetails');
    if(docProfile && currentUser.type === 'doctor') {
        docProfile.innerHTML = `<div><p style="color:#64748b; font-size:0.9rem;">Full Name</p><h3 style="color:#1e3c72;">${currentUser.name}</h3></div><div><p style="color:#64748b; font-size:0.9rem;">Email Address</p><h3 style="color:#1e3c72;">${currentUser.email}</h3></div><div><p style="color:#64748b; font-size:0.9rem;">Doctor ID</p><h3 style="color:#1e3c72;">${currentUser.doctorId}</h3></div><div><p style="color:#64748b; font-size:0.9rem;">Specialization</p><h3 style="color:#1e3c72;">${currentUser.specialization || 'General'}</h3></div>`;
    }
    const patProfile = document.getElementById('patientProfileDetails');
    if(patProfile && currentUser.type === 'patient') {
        const patientData = appData.patients.find(p => p.id === currentUser.patientId);
        if(patientData) {
            patProfile.innerHTML = `<div class="detail-card"><p style="color:#64748b;">Full Name</p><h3>${patientData.name}</h3></div><div class="detail-card"><p style="color:#64748b;">Patient ID</p><h3>${patientData.id}</h3></div><div class="detail-card"><p style="color:#64748b;">Age & Gender</p><h3>${patientData.age} Yrs, ${patientData.gender}</h3></div><div class="detail-card"><p style="color:#64748b;">Primary Diagnosis</p><h3 style="text-transform: capitalize;">${patientData.primaryDisease}</h3></div>`;
        }
    }
});

function toggleChat() { const box = document.getElementById('chatBox'); box.style.display = box.style.display === 'none' ? 'flex' : 'none'; }
function sendChatMessage() {
    const input = document.getElementById('chatInput'); const msg = input.value.trim(); if(!msg) return;
    const chatBox = document.getElementById('chatMessages');
    chatBox.innerHTML += `<div style="background: #0284c7; color: white; padding: 10px 15px; border-radius: 15px 15px 0 15px; max-width: 80%; font-size: 0.9rem; align-self: flex-end;">${msg}</div>`;
    input.value = ''; chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => {
        let reply = "Please remember I am an AI assistant, not a doctor. Based on general guidelines, staying hydrated and taking your prescribed medications on time is highly recommended. Always consult your doctor for medical advice!";
        if(msg.toLowerCase().includes("headache")) reply = "For a headache, resting in a quiet, dark room and staying hydrated can help. If it persists, please use the SOS button to contact your doctor.";
        if(msg.toLowerCase().includes("diet")) reply = "You can view your personalized diet recommendations under the 'Diet & Care' tab on your dashboard!";
        chatBox.innerHTML += `<div style="background: #e2e8f0; color: #1e293b; padding: 10px 15px; border-radius: 15px 15px 15px 0; max-width: 80%; font-size: 0.9rem; align-self: flex-start;">${reply}</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}
document.addEventListener('DOMContentLoaded', () => { const chatInput = document.getElementById('chatInput'); if(chatInput) { chatInput.addEventListener('keypress', function (e) { if (e.key === 'Enter') sendChatMessage(); }); } });
