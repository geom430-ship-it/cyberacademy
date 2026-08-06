/* =========================================================================
   CYBERACADEMY PRO - Core Engine
   Auteur : Équipe CyberAcademy
   Features : Web Audio API, Hardcore Mode Timer, XSS Sanitization, SHA-256
   ========================================================================= */

// =========================================================================
// 0. MOTEUR AUDIO (SOUND DESIGN)
// =========================================================================
const AudioEngine = {
    ctx: null,
    enabled: true,
    init: function() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
    },
    toggle: function() {
        this.enabled = !this.enabled;
        document.getElementById('audio-toggle').innerText = this.enabled ? "🔊 Audio : ON" : "🔇 Audio : OFF";
    },
    playKey: function() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.03);
    },
    playSuccess: function() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, this.ctx.currentTime);
        osc.frequency.setValueAtTime(900, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    },
    playError: function() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    }
};

// Initialiser l'audio au premier clic utilisateur (requis par les navigateurs modernes)
document.addEventListener('click', () => { if(AudioEngine.enabled) AudioEngine.init(); }, { once: true });
function toggleAudio() { AudioEngine.toggle(); }

// =========================================================================
// 1. UTILITAIRES DE SÉCURITÉ (XSS & CRYPTO)
// =========================================================================

// Echapper le HTML pour éviter qu'un utilisateur n'injecte du vrai JS dans son terminal
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag]));
}

// Hachage SHA-256 pour les mots de passe
async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// =========================================================================
// 2. BASES DE DONNÉES (COURS ET CTF)
// =========================================================================

const trackDB = {
    "dev": [
        {
            id: 401, title: "Niveau 1 : Les Fondations du Web",
            themes: [
                { id: "d_html", title: "HTML & CSS : La structure", desc: "Comprendre comment une page est construite.", content: "<h2>Le Squelette d'Internet</h2><p>Le HTML n'est pas un langage de programmation, c'est un langage de balisage. Pour un hacker, comprendre le HTML est vital pour trouver des commentaires cachés.</p>", simType: "dev_html", simData: { instruction: "Écrivez la balise HTML pour créer un titre principal (h1) contenant le mot 'Hack'." }, quiz: [{ q: "Quelle balise HTML insère un lien cliquable ?", options: ["<link>", "<a>", "<href>"], ans: "1" }] },
                { id: "d_js", title: "JavaScript : Le Moteur", desc: "Rendre le web interactif.", content: "<h2>La logique côté client</h2><p>Le JavaScript s'exécute directement dans le navigateur. C'est la cible principale des attaques XSS.</p>", simType: "none", quiz: [{ q: "Où s'exécute principalement le JS traditionnel ?", options: ["Sur le serveur DB", "Dans le navigateur de la victime"], ans: "1" }] }
            ],
            exam: [{ q: "Lequel de ces langages gère uniquement le design visuel de la page ?", options: ["HTML", "JavaScript", "CSS"], ans: "2" }]
        }
    ],
    "red": [
        {
            id: 101, title: "Niveau 1 : Reconnaissance",
            themes: [
                { id: "r_linux", title: "Terminal & Navigation", desc: "Mouvement en ligne de commande.", content: "<h2>Système de fichiers Linux</h2><p>Tout est fichier. Utilisez <code>ls -a</code> pour voir les fichiers cachés (ceux qui commencent par un point).</p>", simType: "terminal", simData: { instruction: "Trouvez le fichier caché.", expected: "ls -a", successOutput: "FLAG{red_linux_01}" }, quiz: [{ q: "Quelle commande liste les fichiers cachés ?", options: ["cd", "ls -a", "pwd"], ans: "1" }] },
                { id: "r_nmap", title: "Scan de Ports", desc: "Découvrir les portes ouvertes.", content: "<h2>Nmap</h2><p>Nmap permet de scanner une IP pour voir quels ports (22, 80, 443) sont ouverts.</p>", simType: "none", quiz: [{ q: "Quel port est associé au trafic web non sécurisé HTTP ?", options: ["21", "80", "443"], ans: "1" }] }
            ],
            exam: [{ q: "Quel est le but premier de la Reconnaissance ?", options: ["Détruire le serveur", "Collecter des informations sur la cible"], ans: "1" }]
        }
    ],
    "blue": [
        {
            id: 201, title: "Niveau 1 : Analyse de Logs",
            themes: [
                { id: "b_logs", title: "Traque sur serveur Web", desc: "Lire des logs Apache/Nginx.", content: "<h2>Le journal d'accès</h2><p>Chaque requête HTTP laisse l'IP, l'heure et la payload. C'est l'arme numéro 1 du défenseur.</p>", simType: "logs", simData: { instruction: "Trouvez l'IP qui a lancé l'attaque SQLi (' OR 1=1)." }, quiz: [{ q: "Un log web enregistre-t-il l'IP source ?", options: ["Oui", "Non"], ans: "0" }] }
            ],
            exam: [{ q: "Dans un log Apache, que signifie le code statut 200 ?", options: ["Erreur serveur", "Requête traitée avec succès"], ans: "1" }]
        }
    ],
    "code": [
        {
            id: 301, title: "Niveau 1 : Scripting Python",
            themes: [
                { id: "c_req", title: "Le module Requests", desc: "Requêtes web automatiques.", content: "<h2>Le web en console</h2><p><code>import requests</code> permet à Python de télécharger des pages web automatiquement.</p>", simType: "code", simData: { instruction: "Importez le module requests en Python." }, quiz: [{ q: "Quel module Python gère le HTTP ?", options: ["requests", "os"], ans: "0" }] }
            ],
            exam: [{ q: "Python est un langage...", options: ["Compilé", "Interprété"], ans: "1" }]
        }
    ]
};

const ctfDB = [
    { id: "ctf1", title: "L'Inspecteur", difficulty: "Débutant", category: "Web", points: 100, desc: "Fouillez le code source du faux navigateur pour trouver le flag.", expectedFlag: "FLAG{html_source_ez}", simType: "html", badgeId: "b_web1" },
    { id: "ctf2", title: "Faux Papiers", difficulty: "Intermédiaire", category: "Web", points: 250, desc: "Vous êtes 'guest'. Modifiez votre cookie local pour devenir 'admin'.", expectedFlag: "FLAG{cookie_manipulation_pro}", simType: "cookie", badgeId: "b_web2" },
    { id: "ctf3", title: "Log Hunter", difficulty: "Intermédiaire", category: "Blue Team", points: 300, desc: "Retrouvez l'IP de l'attaquant qui a lancé la requête SQLi dans ces logs.", expectedFlag: "FLAG{blue_team_hunter}", simType: "ctf_logs", badgeId: "b_blue1" },
    { id: "ctf5", title: "Poupées Russes", difficulty: "Débutant", category: "Crypto", points: 150, desc: "Décodez ce message : RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259", expectedFlag: "FLAG{base64_is_not_encryption}", simType: "crypto", badgeId: "b_crypto1" },
    { id: "ctf6", title: "La Boîte Noire", difficulty: "Expert", category: "Reverse", points: 500, desc: "Rétro-ingénieurez le code JavaScript obfusqué pour comprendre le FLAG attendu.", expectedFlag: "FLAG{reverse_js_master}", simType: "reverse", badgeId: "b_rev1" },
    { id: "ctf7", title: "OSINT Fantôme", difficulty: "Expert", category: "OSINT", points: 600, desc: "Utilisez le terminal HUD. Vérifiez votre identité ('whoami'), puis demandez un indice ('search').", expectedFlag: "FLAG{osint_ghost_tracker}", simType: "osint", badgeId: "b_osint1" },
    { id: "ctf8", title: "Syntax Error", difficulty: "Débutant", category: "Code", points: 200, desc: "Ce script Python est cassé. Corrigez l'indentation.", expectedFlag: "FLAG{python_fixed_indent}", simType: "ctf_code", badgeId: "b_code1" }
];

const badgesDef = {
    "b_web1": { icon: "🔍", name: "L'Inspecteur" }, "b_web2": { icon: "🍪", name: "Maître des Cookies" },
    "b_blue1": { icon: "🛡️", name: "Traqueur de Logs" }, "b_crypto1": { icon: "🔐", name: "Cryptographe" }, 
    "b_rev1": { icon: "🧠", name: "Reverse Engineer" }, "b_osint1": { icon: "👁️", name: "Agent OSINT" },
    "b_code1": { icon: "🐍", name: "Charmeur de Python" }
};

// =========================================================================
// 3. ÉTAT ET AUTHENTIFICATION
// =========================================================================

let accounts = {};
let activeUser = null;
let currentTrack = null;
let authMode = 'login';
let state = { completedCourses: [], completedExams: [], completedCTF: [], badges: [] };

async function initApp() {
    try {
        const storedDB = localStorage.getItem('cyberacademy_gold_db');
        if (storedDB) accounts = JSON.parse(storedDB);
        const session = localStorage.getItem('cyberacademy_gold_session');
        if (session && accounts[session]) loginUser(session);
    } catch (e) { accounts = {}; }
}

function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    document.getElementById('auth-msg').style.display = 'none';
}

async function processAuth() {
    AudioEngine.playKey();
    const user = document.getElementById('auth-user').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();
    const msgBox = document.getElementById('auth-msg');
    
    if (!user || !pass) { 
        AudioEngine.playError();
        msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Champs requis."; return; 
    }
    
    const secureHash = await hashPassword(pass); 

    if (authMode === 'register') {
        if (accounts[user]) { 
            AudioEngine.playError();
            msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiant pris."; 
        } else {
            AudioEngine.playSuccess();
            accounts[user] = { passHash: secureHash, completedCourses: [], completedExams: [], completedCTF: [], badges: [] };
            localStorage.setItem('cyberacademy_gold_db', JSON.stringify(accounts));
            msgBox.style.display='block'; msgBox.style.color='var(--accent)'; msgBox.innerText="Opérateur enregistré.";
            setTimeout(() => loginUser(user), 1000);
        }
    } else {
        if (!accounts[user] || accounts[user].passHash !== secureHash) { 
            AudioEngine.playError();
            msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiants invalides."; 
        } else { 
            AudioEngine.playSuccess();
            loginUser(user); 
        }
    }
}

function loginUser(username) {
    activeUser = username;
    localStorage.setItem('cyberacademy_gold_session', username);
    
    state = {
        completedCourses: accounts[username].completedCourses || [],
        completedExams: accounts[username].completedExams || [],
        completedCTF: accounts[username].completedCTF || [],
        badges: accounts[username].badges || []
    };
    
    document.getElementById('main-header').classList.add('visible');
    document.getElementById('sidebar-user').innerText = "@" + username;
    
    updateProfileUI();
    renderCTF();
    switchView('dashboard-view');
    document.getElementById('tracks-selection').style.display = 'grid';
    document.getElementById('track-content').style.display = 'none';
}

function logout() {
    activeUser = null;
    localStorage.removeItem('cyberacademy_gold_session');
    document.getElementById('main-header').classList.remove('visible');
    switchView('auth-view');
}

function saveProgress() {
    if (activeUser && accounts[activeUser]) {
        accounts[activeUser] = { ...accounts[activeUser], ...state };
        localStorage.setItem('cyberacademy_gold_db', JSON.stringify(accounts));
    }
    updateProfileUI();
}

function updateProfileUI() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    document.getElementById('sidebar-points').innerText = pts.toString().padStart(4, '0') + " PTS";
    
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1200) rank = "Opérateur";
    document.getElementById('sidebar-rank').innerText = rank;
    
    const badgeContainer = document.getElementById('badges-container');
    badgeContainer.innerHTML = '';
    state.badges.forEach(bId => { 
        if(badgesDef[bId]) badgeContainer.innerHTML += `<div class="badge-icon" title="${badgesDef[bId].name}">${badgesDef[bId].icon}</div>`; 
    });
}

// =========================================================================
// 4. MOTEUR DE NAVIGATION ET DE COURS
// =========================================================================

function switchView(targetViewId) {
    document.querySelectorAll('.view-section').forEach(el => { el.classList.remove('active-view'); el.style.display = 'none'; });
    const target = document.getElementById(targetViewId);
    if (target) { target.style.display = 'block'; setTimeout(() => target.classList.add('active-view'), 10); }
    window.scrollTo(0, 0);
}
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); document.getElementById('overlay').classList.toggle('active'); }

function openTrack(trackKey) {
    currentTrack = trackKey;
    document.getElementById('tracks-selection').style.display = 'none';
    document.getElementById('track-content').style.display = 'block';
    
    const titles = { "dev": "🌐 Fondations Web", "red": "🔴 Red Team (Offensif)", "blue": "🔵 Blue Team (Défensif)", "code": "💻 Codage Sécurisé" };
    document.getElementById('current-track-title').innerText = titles[trackKey];
    
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    
    trackDB[trackKey].forEach((level, index) => {
        const unlocked = index === 0 || state.completedExams.includes(trackDB[trackKey][index - 1].id);
        const statusBadge = unlocked ? `<span class="status-badge unlocked">🔓 DÉBLOQUÉ</span>` : `<span class="status-badge locked">🔒 VERROUILLÉ</span>`;

        let themesHTML = ''; let allThemesDone = true;
        level.themes.forEach(theme => {
            const isDone = state.completedCourses.includes(theme.id);
            if(!isDone) allThemesDone = false;
            const cardClass = "theme-card " + (isDone ? 'completed' : '') + (!unlocked ? ' disabled' : '');
            themesHTML += `<div class="${cardClass}" onclick="openCourse('${trackKey}', '${theme.id}', ${unlocked})"><div class="theme-title">${theme.title}</div><div class="theme-desc">${theme.desc}</div></div>`;
        });

        let examBtnHTML = '';
        if (unlocked) {
            const examDone = state.completedExams.includes(level.id);
            if (allThemesDone && !examDone) examBtnHTML = `<button class="exam-btn" style="border-color:var(--warning); color:var(--warning);" onclick="prepExam('${trackKey}', ${level.id})">PASSER LA CERTIFICATION</button>`;
            else if (examDone) examBtnHTML = `<button class="exam-btn" style="background:var(--accent); color:#000; border:none;" onclick="showCertificate(${level.id}, '${titles[trackKey]}')">🏆 VOIR LE CERTIFICAT</button>`;
        }
        container.innerHTML += `<div class="level-section"><div class="level-header"><h3>${level.title}</h3>${statusBadge}</div><div class="theme-grid">${themesHTML}</div>${examBtnHTML}</div>`;
    });
}

function backToTracks() {
    currentTrack = null;
    document.getElementById('track-content').style.display = 'none';
    document.getElementById('tracks-selection').style.display = 'grid';
}

function openCourse(trackKey, themeId, isUnlocked) {
    if (!isUnlocked) return;
    AudioEngine.playKey();
    
    let currentCourse = null;
    trackDB[trackKey].forEach(l => l.themes.forEach(t => { if (t.id === themeId) currentCourse = t; }));
    
    document.getElementById('theme-view').dataset.courseId = themeId;
    document.getElementById('lesson-content').innerHTML = currentCourse.content;
    
    const simC = document.getElementById('simulator-container');
    // ... Génération du code du simulateur (identique aux versions précédentes) ...
    // Note : Par souci de place, je condense ici la structure du simC.
    if (currentCourse.simType === "terminal") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">💻 [ TERMINAL ] : ${currentCourse.simData.instruction}</div><input type="text" id="term-input" class="term-input" placeholder="root@academy:~#" autocomplete="off" onkeypress="handleTerm(event, '${btoa(currentCourse.simData.expected)}', '${btoa(currentCourse.simData.successOutput)}')"><div id="term-output" class="term-output">En attente...</div></div>`; }
    else if (currentCourse.simType === "dev_html") { simC.innerHTML = `<div class="sim-box sim-dev"><div class="sim-header">🌐 [ HTML EDITOR ] : ${currentCourse.simData.instruction}</div><textarea id="html-input" class="web-input code-editor" placeholder="<!-- Tapez votre HTML ici -->"></textarea><button class="auth-btn" style="background:#a855f7; margin-top:0;" onclick="checkHTML()">RENDRE LA PAGE</button><div id="html-output" class="term-output" style="margin-top:15px; background:#fff; color:#000; padding:10px;"></div></div>`; }
    else if (currentCourse.simType === "sqli") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">⚙️ [ TARGET ] : ${currentCourse.simData.instruction}</div><input type="text" id="sql-input" class="web-input" placeholder="Mot de passe..."><button class="auth-btn" style="background:var(--danger);" onclick="checkSQL()">Login</button><div id="sql-output" class="term-output"></div></div>`; }
    else if (currentCourse.simType === "logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">🔵 [ LOGS ] : ${currentCourse.simData.instruction}</div><div class="log-viewer">10.0.0.1 - GET / HTTP/1.1<br>192.168.1.50 - GET /login?user=' OR 1=1 --</div><input type="text" id="log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkLogs()">Analyser</button><div id="log-output" class="term-output"></div></div>`; }
    else if (currentCourse.simType === "code") { simC.innerHTML = `<div class="sim-box sim-code"><div class="sim-header">💻 [ PYTHON ] : ${currentCourse.simData.instruction}</div><textarea id="code-input" class="web-input code-editor" placeholder="# Script..."></textarea><button class="auth-btn" style="background:var(--accent);" onclick="checkCode()">RUN</button><div id="code-output" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    let quizHTML = '';
    currentCourse.quiz.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="cq_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        quizHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div>${optionsHTML}</div></div>`;
    });
    document.getElementById('quiz-content').innerHTML = quizHTML;
    document.getElementById('quiz-result').style.display = 'none';
    switchView('theme-view');
}

// Validateurs de simulateurs
function handleTerm(e, expectedHash, outputHash) { 
    if (e.key === 'Enter') { 
        AudioEngine.playKey();
        const val = escapeHTML(e.target.value.trim().toLowerCase()); 
        if (btoa(val) === expectedHash) { AudioEngine.playSuccess(); document.getElementById('term-output').innerHTML = "<span style='color:var(--accent);'>" + atob(outputHash) + "</span>"; }
        else { AudioEngine.playError(); document.getElementById('term-output').innerHTML = `<span style='color:var(--danger);'>bash: ${val}: command not found</span>`; }
    } 
}
function checkHTML() { const val = document.getElementById('html-input').value.trim(); const out = document.getElementById('html-output'); out.innerHTML = val; if (val.includes("<h1>Hack</h1>")) { AudioEngine.playSuccess(); out.innerHTML += "<br><br><span style='color:#a855f7; font-weight:bold;'>[SUCCÈS]</span>"; } else { AudioEngine.playError(); out.innerHTML += "<br><br><span style='color:red;'>[ERREUR]</span>"; } }
function checkSQL() { const val = document.getElementById('sql-input').value; if (val.includes("' OR 1=1")) { AudioEngine.playSuccess(); document.getElementById('sql-output').innerHTML = "<span style='color:var(--accent);'>[BYPASS RÉUSSI] FLAG{red_team_sql}</span>"; } else { AudioEngine.playError(); document.getElementById('sql-output').innerHTML = "Accès refusé."; } }
function checkLogs() { const val = document.getElementById('log-input').value.trim(); if (val === "192.168.1.50") { AudioEngine.playSuccess(); document.getElementById('log-output').innerHTML = "<span style='color:var(--accent);'>[IP CONFIRMÉE] FLAG{blue_log_master}</span>"; } else { AudioEngine.playError(); document.getElementById('log-output').innerHTML = "Aucun flagrant délit."; } }
function checkCode() { const val = document.getElementById('code-input').value.trim(); if (val.includes("import requests")) { AudioEngine.playSuccess(); document.getElementById('code-output').innerHTML = "<span style='color:var(--accent);'>[SCRIPT VALIDE] FLAG{py_req_01}</span>"; } else { AudioEngine.playError(); document.getElementById('code-output').innerHTML = "<span style='color:var(--danger);'>Erreur.</span>"; } }

function submitThemeQCM() {
    const courseId = document.getElementById('theme-view').dataset.courseId;
    let currentCourse = null;
    trackDB[currentTrack].forEach(l => l.themes.forEach(t => { if (t.id === courseId) currentCourse = t; }));

    let allCorrect = true;
    currentCourse.quiz.forEach((q, index) => {
        const inputs = document.getElementsByName('cq_' + index);
        let selectedVal = null;
        for(let i=0; i<inputs.length; i++) { if(inputs[i].checked) selectedVal = inputs[i].value; }
        if (selectedVal !== btoa(q.ans)) allCorrect = false;
    });
    
    const resBox = document.getElementById('quiz-result');
    resBox.style.display = 'block';
    
    if (allCorrect) {
        AudioEngine.playSuccess();
        resBox.className = 'res-success'; resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "[+] Validé !";
        if (!state.completedCourses.includes(courseId)) { state.completedCourses.push(courseId); saveProgress(); openTrack(currentTrack); }
        setTimeout(() => switchView('dashboard-view'), 1000);
    } else {
        AudioEngine.playError();
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Échec. Vérifiez vos réponses.";
    }
}

// =========================================================================
// 5. ZONE CTF
// =========================================================================

function renderCTF() {
    const container = document.getElementById('ctf-container');
    container.innerHTML = '';
    ctfDB.forEach(ctf => {
        const isDone = state.completedCTF.includes(ctf.id);
        const cardClass = "theme-card " + (isDone ? 'completed' : '');
        let catColor = "var(--danger)";
        if(ctf.category === "Blue Team" || ctf.category === "Forensics") catColor = "#3b82f6";
        if(ctf.category === "Code") catColor = "var(--accent)";
        
        container.innerHTML += `<div class="${cardClass}" style="border-left: 4px solid ${catColor};" onclick="openCTF('${ctf.id}')"><div style="color:${catColor}; font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty} | ${ctf.points} PTS</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">${ctf.desc}</div></div>`;
    });
}

function openCTF(ctfId) {
    AudioEngine.playKey();
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    
    document.getElementById('challenge-view').dataset.ctfId = ctfId;
    document.getElementById('challenge-desc').innerHTML = `<h2>${currentCTF.title}</h2><p>${currentCTF.desc}</p>`;
    
    const simC = document.getElementById('challenge-sim-container');
    if(currentCTF.simType === "html") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">💻 Faux Navigateur Web</div><div style="background:#fff; color:#000; padding:20px; text-align:center;"><h1>Admin</h1></div><button onclick="document.getElementById('source-code').style.display='block'" class="btn-back" style="margin-top:10px;">[Clic-droit] > Code source</button><div id="source-code" style="display:none; margin-top:15px; color:#4ade80; font-family:monospace;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;!-- FLAG{html_source_ez} --&gt;<br>&lt;/html&gt;</div></div>`; }
    else if(currentCTF.simType === "crypto") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Intercepté</div><div style="word-break:break-all; color:var(--warning); font-family:monospace;">RkxBR3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259</div></div>`; }
    else if(currentCTF.simType === "cookie") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Accès Sécurisé</div><div id="cookie-status" style="color:var(--danger); margin-bottom:15px;">Statut : ACCÈS REFUSÉ (Rôle : guest)</div><h4 style="color:#fff;">[ Éditeur de Cookies ]</h4><input type="text" id="cookie-editor" class="web-input" value="session_id=9928; role=guest;"><button class="auth-btn" onclick="checkCookieCTF()">Recharger la page</button></div>`; }
    else if(currentCTF.simType === "ctf_logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">Log Server (14:00 - 14:05)</div><div class="log-viewer">14:01 - 10.0.0.1 - GET /index.html<br>14:02 - 172.16.0.4 - GET /login.php?admin=1</div><input type="text" id="ctf-log-input" class="web-input" placeholder="IP Attaquant..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkCTFLog()">Valider</button><div id="ctf-log-out" class="term-output"></div></div>`; }
    else if(currentCTF.simType === "reverse") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Code JS Obfusqué</div><div style="color:#4ade80; font-family:monospace; margin-bottom:15px; word-break:break-all;">function check(p){ return p === 'F' + 'L' + 'A' + 'G' + '{' + 'r' + 'e' + 'v' + 'e' + 'r' + 's' + 'e' + '_' + 'j' + 's' + '_' + 'm' + 'a' + 's' + 't' + 'e' + 'r' + '}'; }</div></div>`; }
    else if(currentCTF.simType === "osint") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">Terminal OSINT</div><p style="color:var(--text-muted); font-size:0.9rem;">Utilisez le HUD. Tapez 'whoami', puis 'search'.</p></div>`; }
    else if(currentCTF.simType === "ctf_code") { simC.innerHTML = `<div class="sim-box sim-code"><div class="sim-header">Debugger Python</div><textarea id="ctf-code-input" class="web-input code-editor">def print_flag():\nprint("FLAG{python_fixed_indent}")\n\nprint_flag()</textarea><button class="auth-btn" style="background:var(--accent); margin-top:0;" onclick="checkCTFCode()">Exécuter</button><div id="ctf-code-out" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    document.getElementById('flag-input').value = '';
    document.getElementById('flag-result').style.display = 'none';
    switchView('challenge-view');
}

function checkCookieCTF() { const val = document.getElementById('cookie-editor').value; if (val.includes("role=admin")) { AudioEngine.playSuccess(); document.getElementById('cookie-status').innerHTML = "<span style='color:var(--accent); font-weight:bold;'>Bienvenue Admin. FLAG{cookie_manipulation_pro}</span>"; } else { AudioEngine.playError(); document.getElementById('cookie-status').innerHTML = "ACCÈS REFUSÉ"; } }
function checkCTFLog() { const val = document.getElementById('ctf-log-input').value.trim(); if(val === "172.16.0.4") { AudioEngine.playSuccess(); document.getElementById('ctf-log-out').innerHTML = "<span style='color:var(--accent);'>Correct. FLAG{blue_team_hunter}</span>"; } else { AudioEngine.playError(); document.getElementById('ctf-log-out').innerHTML = "Incorrect."; } }
function checkCTFCode() { const val = document.getElementById('ctf-code-input').value; if(val.includes("    print(\"FLAG{") || val.includes("\tprint(\"FLAG{")) { AudioEngine.playSuccess(); document.getElementById('ctf-code-out').innerHTML = "<span style='color:var(--accent);'>Succès ! FLAG{python_fixed_indent}</span>"; } else { AudioEngine.playError(); document.getElementById('ctf-code-out').innerHTML = "<span style='color:var(--danger);'>IndentationError</span>"; } }

function submitFlag() {
    const ctfId = document.getElementById('challenge-view').dataset.ctfId;
    const flagVal = document.getElementById('flag-input').value.trim();
    const resBox = document.getElementById('flag-result');
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    
    resBox.style.display = 'block';
    if (flagVal === currentCTF.expectedFlag) {
        AudioEngine.playSuccess();
        resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = `[+] PWNED ! +${currentCTF.points} PTS`;
        
        if (!state.completedCTF.includes(ctfId)) { 
            state.completedCTF.push(ctfId);
            if (currentCTF.badgeId && !state.badges.includes(currentCTF.badgeId)) { state.badges.push(currentCTF.badgeId); resBox.innerText += `\nNouveau Badge Obtenu !`; }
            saveProgress(); renderCTF(); 
        }
        setTimeout(() => switchView('ctf-view'), 2000);
    } else {
        AudioEngine.playError();
        resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Flag Incorrect.";
    }
}

// =========================================================================
// 6. TERMINAL HUD GLOBAL
// =========================================================================

function toggleHUD() { 
    AudioEngine.playKey();
    document.getElementById('hud-terminal').classList.toggle('open'); 
}

function handleSearchCommand() {
    const today = new Date().toDateString();
    const lastSearch = localStorage.getItem('cyber_last_search_v2');
    if (lastSearch === today) return "❌ Indice limité à 1 fois par jour. Reviens demain.";
    localStorage.setItem('cyber_last_search_v2', today);
    return "💡 Indice (CTF OSINT) : FLAG{osint_ghost_tracker}";
}

// Effet machine à écrire pour le terminal HUD
function typeWriter(element, text, i = 0) {
    if (i === 0) element.innerHTML += `<br><span style="color:var(--text-main);">`;
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        element.scrollTop = element.scrollHeight;
        if(i % 3 === 0) AudioEngine.playKey(); // Son régulier
        setTimeout(() => typeWriter(element, text, i + 1), 10);
    } else {
        element.innerHTML += `</span>`;
    }
}

function handleHUD(e) {
    if (e.key === 'Enter') {
        AudioEngine.playKey();
        const inputEl = document.getElementById('hud-input');
        const outEl = document.getElementById('hud-output');
        const val = escapeHTML(inputEl.value.trim().toLowerCase());
        
        outEl.innerHTML += `<br><span style="color:var(--accent);">> ${val}</span>`;
        let response = "";
        
        if (val === "help") response = "\n--- COMMANDES SYSTÈME ---\n1. help : Ce menu\n2. whoami : Identité opérateur\n3. pwd : Répertoire courant\n4. ls -a : Lister tous les fichiers\n5. cat [fichier] : Lire fichier\n6. search : Indice CTF (1/jour)\n7. decode [base64] : Décoder";
        else if (val === "whoami") response = `Utilisateur actif : ${activeUser || "Anonyme"}`;
        else if (val === "pwd") response = "/opt/cyberacademy/prod";
        else if (val === "ls -a") response = ".bashrc  .secret_flag";
        else if (val === "search") response = handleSearchCommand();
        else if (val.startsWith("cat ")) { const file = val.split(" ")[1]; if (file === ".secret_flag") response = "Le vrai challenge est dans la zone CTF."; else response = `cat: ${file}: Aucun fichier`; }
        else if (val.startsWith("decode ")) { const b64 = val.split(" ")[1]; try { response = atob(b64); } catch(e) { response = "Erreur Base64."; } }
        else if (val !== "") response = `bash: ${val}: command not found`;
        
        if (response !== "") typeWriter(outEl, response);
        inputEl.value = '';
    }
}

// Outils statiques de la toolkit
async function generateHash() {
    const text = document.getElementById('tool-hash-in').value;
    const out = document.getElementById('tool-hash-out');
    if(!text) { out.innerText = "..."; return; }
    const encoder = new TextEncoder(); const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    out.innerText = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
function handleBase64(action) {
    const text = document.getElementById('tool-b64-in').value;
    const out = document.getElementById('tool-b64-out');
    try { if(action === 'encode') out.innerText = btoa(text); else out.innerText = atob(text); } 
    catch(e) { out.innerText = "Erreur."; }
}

// =========================================================================
// 7. SYSTÈME D'EXAMEN HARDCORE & CERTIFICATION
// =========================================================================

let examTimer = null;
let timeLeft = 0;

function prepExam(trackKey, levelId) {
    document.getElementById('exam-view').dataset.levelId = levelId;
    document.getElementById('exam-view').dataset.trackKey = trackKey;
    document.getElementById('hardcore-toggle').checked = false;
    switchView('exam-intro-view');
}

function startExam() {
    AudioEngine.playKey();
    const trackKey = document.getElementById('exam-view').dataset.trackKey;
    const levelId = parseInt(document.getElementById('exam-view').dataset.levelId);
    const isHardcore = document.getElementById('hardcore-toggle').checked;
    
    let currentLevel = null; trackDB[trackKey].forEach(l => { if (l.id === levelId) currentLevel = l; });
    
    let examHTML = '';
    currentLevel.exam.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="e_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        examHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div>${optionsHTML}</div></div>`;
    });
    
    document.getElementById('exam-content').innerHTML = examHTML;
    document.getElementById('exam-result').style.display = 'none';
    
    // Logique du chronomètre Hardcore
    const timerDisplay = document.getElementById('exam-timer');
    if (isHardcore) {
        timeLeft = 180; // 3 minutes en secondes
        timerDisplay.style.display = 'block';
        updateTimerDisplay();
        clearInterval(examTimer);
        examTimer = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if(timeLeft <= 10) AudioEngine.playError(); // Bip de stress à la fin
            if (timeLeft <= 0) {
                clearInterval(examTimer);
                submitExam(true); // Soumission forcée par le temps
            }
        }, 1000);
    } else {
        timerDisplay.style.display = 'none';
        clearInterval(examTimer);
    }
    
    switchView('exam-view');
}

function updateTimerDisplay() {
    const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const secs = (timeLeft % 60).toString().padStart(2, '0');
    document.getElementById('exam-timer').innerText = `${mins}:${secs}`;
}

function submitExam(forcedByTime = false) {
    clearInterval(examTimer);
    
    const levelId = parseInt(document.getElementById('exam-view').dataset.levelId);
    const trackKey = document.getElementById('exam-view').dataset.trackKey;
    let currentLevel = null; trackDB[trackKey].forEach(l => { if (l.id === levelId) currentLevel = l; });

    let allCorrect = true;
    currentLevel.exam.forEach((q, index) => {
        const inputs = document.getElementsByName('e_' + index);
        let selectedVal = null;
        for(let i=0; i<inputs.length; i++) { if(inputs[i].checked) selectedVal = inputs[i].value; }
        if (selectedVal !== btoa(q.ans)) allCorrect = false;
    });
    
    const resBox = document.getElementById('exam-result');
    resBox.style.display = 'block';
    
    if (forcedByTime) {
        AudioEngine.playError();
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "TEMPS ÉCOULÉ. Échec de la mission.";
    } else if (allCorrect) {
        AudioEngine.playSuccess();
        resBox.className = 'res-success'; resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "EXAMEN RÉUSSI ! Certification débloquée.";
        if (!state.completedExams.includes(levelId)) { state.completedExams.push(levelId); saveProgress(); }
        
        const titles = { "dev": "Fondations Web", "red": "Red Team", "blue": "Blue Team", "code": "Codage Sécurisé" };
        setTimeout(() => { openTrack(trackKey); showCertificate(levelId, titles[trackKey]); }, 2000);
    } else {
        AudioEngine.playError();
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "Échec. Vous devez avoir 100% de bonnes réponses.";
    }
}

function showCertificate(levelId, trackName) {
    AudioEngine.playSuccess();
    const today = new Date().toLocaleDateString('fr-FR');
    document.getElementById('cert-name').innerText = "@" + activeUser;
    document.getElementById('cert-level').innerText = "Spécialisation : " + (trackName || "NIVEAU " + levelId);
    document.getElementById('cert-date').innerText = today;
    document.getElementById('cert-modal').style.display = 'flex';
}

window.onload = initApp;
