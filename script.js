        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        const closeMenu = document.querySelector('.close-menu');
        
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        overlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
// Countdown timer for end of Ramadan
// Setting target date to March 30, 2025 at 23:59
const countdownDate = new Date("March 30, 2025 23:59:00").getTime();

const countdownTimer = setInterval(function() {
    const now = new Date().getTime();
    const distance = countdownDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');
    
    if (distance < 0) {
        clearInterval(countdownTimer);
        document.querySelector(".countdown").innerHTML = "Selamat Hari Raya Idul Fitri!";
    }
}, 1000);

// Animate elements when they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.visibility = 'visible';
            if (entry.target.classList.contains('slide-in-left') || 
                entry.target.classList.contains('slide-in-right') || 
                entry.target.classList.contains('fade-in') || 
                entry.target.classList.contains('zoom-in')) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0) scale(1)';
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in, .zoom-in').forEach(el => {
    el.style.opacity = 0;
    el.style.visibility = 'hidden';
    observer.observe(el);
});

// Counter animation for stats
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let value = Math.floor(progress * (end - start) + start);
        
        // Format with commas and plus sign
        obj.innerHTML = value.toLocaleString() + '+';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stats and animate them when in view
const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Parse the initial values
            if (entry.target.id === 'users-count') {
                animateValue(entry.target, 0, 10000, 2000);
            } else if (entry.target.id === 'groups-count') {
                animateValue(entry.target, 0, 500, 2000);
            } else if (entry.target.id === 'projects-count') {
                animateValue(entry.target, 0, 1500, 2000);
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('#users-count, #groups-count, #projects-count').forEach(el => {
    statsObserver.observe(el);
});

// Prayer time API integration
function getPrayerTimes() {
    // Example coordinates for Jakarta, Indonesia
    const latitude = -6.2088;
    const longitude = 106.8456;
    const date = new Date().toISOString().slice(0, 10);
    
    
    // For demo purposes, we'll use static times
    const prayerTimes = {
        fajr: "04:32",
        sunrise: "05:48",
        dhuhr: "12:05",
        asr: "15:25",
        maghrib: "18:18",
        isha: "19:32"
    };
    
    // Display the next prayer time
    displayNextPrayer(prayerTimes);
}

function displayNextPrayer(times) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;
    
    // Convert prayer times to minutes since midnight
    const prayers = [
        { name: "Fajr", time: convertToMinutes(times.fajr) },
        { name: "Sunrise", time: convertToMinutes(times.sunrise) },
        { name: "Dhuhr", time: convertToMinutes(times.dhuhr) },
        { name: "Asr", time: convertToMinutes(times.asr) },
        { name: "Maghrib", time: convertToMinutes(times.maghrib) },
        { name: "Isha", time: convertToMinutes(times.isha) }
    ];
    
    // Find the next prayer
    let nextPrayer = prayers[0];
    for (const prayer of prayers) {
        if (prayer.time > currentTime) {
            nextPrayer = prayer;
            break;
        }
    }
    
    // If all prayers have passed for today, next is fajr tomorrow
    if (nextPrayer.time < currentTime) {
        nextPrayer = { name: "Fajr (Tomorrow)", time: prayers[0].time };
    }
    
    // Calculate time remaining
    let timeRemaining;
    if (nextPrayer.time < currentTime) {
        // Next prayer is tomorrow
        timeRemaining = (24 * 60 - currentTime) + nextPrayer.time;
    } else {
        timeRemaining = nextPrayer.time - currentTime;
    }
    
    const hoursRemaining = Math.floor(timeRemaining / 60);
    const minutesRemaining = timeRemaining % 60;
    
    // Create or update prayer time element
    const prayerInfoContainer = document.createElement('div');
    prayerInfoContainer.classList.add('prayer-info');
    prayerInfoContainer.innerHTML = `
        <div class="next-prayer">
            <h4>Waktu Sholat Berikutnya</h4>
            <div class="prayer-name">${nextPrayer.name}</div>
            <div class="prayer-time">${formatTime(nextPrayer.time)}</div>
            <div class="prayer-countdown">${hoursRemaining}h ${minutesRemaining}m</div>
        </div>
    `;
    
    // Add to page if it doesn't exist yet
    if (!document.querySelector('.prayer-info')) {
        const heroContainer = document.querySelector('.hero-container');
        heroContainer.appendChild(prayerInfoContainer);
    } else {
        document.querySelector('.prayer-info').replaceWith(prayerInfoContainer);
    }
}

function convertToMinutes(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

// Daily inspiration
const inspirations = [
    "Ramadan adalah bulan kesabaran, dan balasan kesabaran adalah surga. - HR. Muslim",
    "Barangsiapa berpuasa di bulan Ramadhan karena iman dan mengharap pahala, maka diampuni dosa-dosanya yang telah lalu. - HR. Bukhari dan Muslim",
    "Bulan Ramadhan adalah bulan yang diberkahi, penuh rahmat dan ampunan.",
    "Jangan biarkan halangan menghalangimu dari pahala. Jika tidak bisa berpuasa, bersedekahlah.",
    "Puasa bukan hanya menahan lapar dan haus, tapi juga menahan lidah dari perkataan yang tidak baik.",
    "Gunakan Ramadhan sebagai momentum untuk membangun kebiasaan baik yang akan bertahan sepanjang tahun."
];

function setDailyInspiration() {
    // Get a random inspiration
    const randomIndex = Math.floor(Math.random() * inspirations.length);
    const inspirationText = inspirations[randomIndex];
    
    // Create or update inspiration element
    const inspirationContainer = document.createElement('div');
    inspirationContainer.classList.add('daily-inspiration', 'fade-in');
    inspirationContainer.innerHTML = `
        <div class="inspiration-icon"><i class="fas fa-lightbulb"></i></div>
        <blockquote>${inspirationText}</blockquote>
    `;
    
    // Add to page after hero section if it doesn't exist yet
    if (!document.querySelector('.daily-inspiration')) {
        const featuresSection = document.querySelector('.features');
        featuresSection.insertBefore(inspirationContainer, featuresSection.firstChild);
    } else {
        document.querySelector('.daily-inspiration').replaceWith(inspirationContainer);
    }
}

// AI Personalization Quiz
function initializeQuiz() {
    const quizButton = document.querySelector('.personalization .btn-primary');
    
    quizButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create modal for quiz
        const quizModal = document.createElement('div');
        quizModal.classList.add('quiz-modal');
        quizModal.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h3>Personalisasi Perjalanan Ramadan-mu</h3>
                    <span class="close-quiz"><i class="fas fa-times"></i></span>
                </div>
                <div class="quiz-content">
                    <div class="quiz-step active" data-step="1">
                        <h4>Apa tujuan utama kamu di Ramadan ini?</h4>
                        <div class="quiz-options">
                            <label class="quiz-option">
                                <input type="radio" name="goal" value="ibadah">
                                <span class="option-content">
                                    <i class="fas fa-pray"></i>
                                    <span>Meningkatkan Ibadah</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="goal" value="quran">
                                <span class="option-content">
                                    <i class="fas fa-book"></i>
                                    <span>Fokus pada Tilawah</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="goal" value="charity">
                                <span class="option-content">
                                    <i class="fas fa-hand-holding-heart"></i>
                                    <span>Memperbanyak Sedekah</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="goal" value="learning">
                                <span class="option-content">
                                    <i class="fas fa-graduation-cap"></i>
                                    <span>Belajar Agama</span>
                                </span>
                            </label>
                        </div>
                        <button class="btn btn-primary next-step">Lanjut</button>
                    </div>
                    
                    <div class="quiz-step" data-step="2">
                        <h4>Seberapa sibuk aktivitas harianmu?</h4>
                        <div class="quiz-slider">
                            <input type="range" min="1" max="5" value="3" class="slider" id="busyness">
                            <div class="slider-labels">
                                <span>Sangat Longgar</span>
                                <span>Cukup Sibuk</span>
                                <span>Sangat Sibuk</span>
                            </div>
                        </div>
                        <button class="btn btn-outline prev-step">Kembali</button>
                        <button class="btn btn-primary next-step">Lanjut</button>
                    </div>
                    
                    <div class="quiz-step" data-step="3">
                        <h4>Apa tantangan terbesarmu di Ramadan?</h4>
                        <div class="quiz-options">
                            <label class="quiz-option">
                                <input type="radio" name="challenge" value="consistency">
                                <span class="option-content">
                                    <i class="fas fa-calendar-check"></i>
                                    <span>Menjaga Konsistensi</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="challenge" value="energy">
                                <span class="option-content">
                                    <i class="fas fa-battery-half"></i>
                                    <span>Mudah Lelah</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="challenge" value="time">
                                <span class="option-content">
                                    <i class="fas fa-clock"></i>
                                    <span>Keterbatasan Waktu</span>
                                </span>
                            </label>
                            <label class="quiz-option">
                                <input type="radio" name="challenge" value="focus">
                                <span class="option-content">
                                    <i class="fas fa-bullseye"></i>
                                    <span>Sulit Fokus</span>
                                </span>
                            </label>
                        </div>
                        <button class="btn btn-outline prev-step">Kembali</button>
                        <button class="btn btn-primary submit-quiz">Buat Rencana Ramadan Saya</button>
                    </div>
                    
                    <div class="quiz-step" data-step="result">
                        <div class="loading-animation">
                            <div class="spinner"></div>
                            <p>AI sedang merancang perjalanan Ramadan khusus untukmu...</p>
                        </div>
                        <div class="result-content" style="display: none;">
                            <h4>Perjalanan Ramadan Kustommu Siap!</h4>
                            <p>Berdasarkan preferensimu, kami telah menyiapkan rencana yang sesuai dengan kebutuhanmu.</p>
                            <div class="plan-preview">
                                <div class="plan-header">
                                    <i class="fas fa-star"></i>
                                    <h5 id="plan-title">Rencana Tilawah dan Konsistensi</h5>
                                </div>
                                <ul class="plan-features">
                                    <li>Target Tilawah harian yang disesuaikan</li>
                                    <li>Saran waktu terbaik untuk ibadah</li>
                                    <li>Grup komunitas untuk tantangan bersama</li>
                                    <li>Pengingat personal sesuai jadwalmu</li>
                                </ul>
                            </div>
                            <a href="#" class="btn btn-primary">Lihat Detail Rencana</a>
                            <a href="#" class="btn btn-outline">Daftar dan Mulai</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="quiz-overlay"></div>
        `;
        
        document.body.appendChild(quizModal);
        document.body.style.overflow = 'hidden';
        
        // Quiz navigation
        const closeQuiz = quizModal.querySelector('.close-quiz');
        const quizOverlay = quizModal.querySelector('.quiz-overlay');
        const nextButtons = quizModal.querySelectorAll('.next-step');
        const prevButtons = quizModal.querySelectorAll('.prev-step');
        const submitButton = quizModal.querySelector('.submit-quiz');
        
        closeQuiz.addEventListener('click', function() {
            document.body.removeChild(quizModal);
            document.body.style.overflow = 'auto';
        });
        
        quizOverlay.addEventListener('click', function() {
            document.body.removeChild(quizModal);
            document.body.style.overflow = 'auto';
        });
        
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = this.closest('.quiz-step');
                const nextStep = quizModal.querySelector(`.quiz-step[data-step="${parseInt(currentStep.dataset.step) + 1}"]`);
                
                currentStep.classList.remove('active');
                nextStep.classList.add('active');
            });
        });
        
        prevButtons.forEach(button => {
            button.addEventListener('click', function() {
                const currentStep = this.closest('.quiz-step');
                const prevStep = quizModal.querySelector(`.quiz-step[data-step="${parseInt(currentStep.dataset.step) - 1}"]`);
                
                currentStep.classList.remove('active');
                prevStep.classList.add('active');
            });
        });
        
        submitButton.addEventListener('click', function() {
            const currentStep = this.closest('.quiz-step');
            const resultStep = quizModal.querySelector('.quiz-step[data-step="result"]');
            
            currentStep.classList.remove('active');
            resultStep.classList.add('active');
            
            // Simulate AI processing
            setTimeout(() => {
                resultStep.querySelector('.loading-animation').style.display = 'none';
                resultStep.querySelector('.result-content').style.display = 'block';
                
                // Personalize plan based on selections
                const goal = quizModal.querySelector('input[name="goal"]:checked').value;
                const challenge = quizModal.querySelector('input[name="challenge"]:checked').value;
                
                let planTitle = "";
                if (goal === "quran") {
                    planTitle = challenge === "consistency" ? "Rencana Tilawah dan Konsistensi" : 
                                challenge === "energy" ? "Rencana Tilawah Hemat Energi" :
                                challenge === "time" ? "Rencana Tilawah Efisien" : "Rencana Tilawah Fokus";
                } else if (goal === "ibadah") {
                    planTitle = challenge === "consistency" ? "Rencana Ibadah Konsisten" : 
                                challenge === "energy" ? "Rencana Ibadah Seimbang" :
                                challenge === "time" ? "Rencana Ibadah Efisien" : "Rencana Ibadah Khusyuk";
                } else if (goal === "charity") {
                    planTitle = "Rencana Sedekah Kreatif";
                } else {
                    planTitle = "Rencana Belajar Progresif";
                }
                
                document.getElementById('plan-title').textContent = planTitle;
            }, 3000);
        });
    });
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get prayer times
    getPrayerTimes();
    
    // Set daily inspiration
    setDailyInspiration();
    
    // Initialize AI quiz
    initializeQuiz();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});