function goBooking() {
    window.location.href = "booking.html";
}

/* ==============================
PESAN TIKET
============================== */

function pesanTiket() {

    let asal = document.getElementById("asal").value;
    let tujuan = document.getElementById("tujuan").value;
    let jumlah = document.getElementById("jumlah").value;
    let metode = document.getElementById("metode").value;

    let harga = 10000;
    let total = jumlah * harga;

    // membuat ID transaksi
    let transaksiId = "LRT" + Date.now();

    /* ==============================
    SIMPAN TRANSAKSI KE LOCALSTORAGE
    ============================== */

    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];

    let currentUser = JSON.parse(localStorage.getItem("lrt_currentUser"));

    transactions.push({
        id: transaksiId,
        userEmail: currentUser ? currentUser.email : "guest",
        asal: asal,
        tujuan: tujuan,
        jumlah: jumlah,
        metode: metode,
        total: total,
        status: "Berhasil"
    });

    localStorage.setItem("lrt_transactions", JSON.stringify(transactions));

    document.body.insertAdjacentHTML("beforeend", `

<div id="popupTiket" style="
position:fixed;
inset:0;
background:rgba(0,0,0,0.6);
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
">

<div style="
background:#ffffff;
border-radius:16px;
width:340px;
overflow:hidden;
box-shadow:0 10px 30px rgba(0,0,0,0.2);
font-family:Poppins, sans-serif;
">

<!-- HEADER -->
<div style="
background:#1e293b;
color:white;
padding:20px;
text-align:center;
">
<h2 style="margin:0;">🎫 E-Tiket LRT</h2>
<p style="margin:5px 0 0; font-size:13px;">
Silahkan menikmati perjalanan anda
</p>
</div>

<!-- BODY -->
<div style="padding:20px; text-align:center;">

<p style="font-size:12px; color:#000000;">ID Transaksi</p>

<div style="
background:#f1f5f9;
color:#000000;
padding:10px;
border-radius:8px;
font-weight:bold;
margin-bottom:10px;
">
<span id="idTiket">${transaksiId}</span>
</div>

<button onclick="salinId()" style="
background:#1e293b;
color:white;
border:none;
padding:6px 12px;
border-radius:6px;
cursor:pointer;
font-size:12px;
margin-bottom:15px;
">
Salin ID
</button>

<hr style="margin:15px 0;">

<div style="text-align:left; font-size:14px; color:#000000;">
<p style="color:#000000";><b>🚉 Asal:</b> ${asal}</p>
<p style="color:#000000";><b>📍 Tujuan:</b> ${tujuan}</p>
<p style="color:#000000";><b>🎟 Jumlah:</b> ${jumlah} tiket</p>
<p style="color:#000000";><b>💳 Pembayaran:</b> ${metode}</p>
</div>

<hr style="margin:15px 0;">

<!-- QR -->
<div style="text-align:center;margin:25px 0 15px;">
<div id="qrCode"></div>
</div>

<p style="
font-size:16px;
font-weight:bold;
color:#3b82f6;
">
Total: Rp ${total.toLocaleString("id-ID")}
</p>

</div>

<!-- FOOTER -->
<div style="
background:#f1f5f9;
padding:12px;
display:flex;
justify-content:center;
gap:10px;
">

<button onclick="tutupPopup()" style="
background:#64748b;
color:white;
border:none;
padding:6px 12px;
border-radius:20px;
cursor:pointer;
font-size:12px;
">
Tutup
</button>

<button onclick="window.print()" style="
background:#3b82f6;
color:white;
border:none;
padding:6px 12px;
border-radius:20px;
cursor:pointer;
font-size:12px;
">
🖨 Cetak
</button>

</div>

</div>
</div>
`);

    /* ======================
       GENERATE QR (TAMBAHAN)
    ====================== */

    setTimeout(() => {
        let qrContainer = document.getElementById("qrCode");

        if (!qrContainer) return;

        qrContainer.innerHTML = "";

        new QRCode(qrContainer, {
            text: `ID:${transaksiId}|${asal}-${tujuan}`,
            width: 120,
            height: 120
        });

    }, 100);
}

/* ==============================
SALIN ID
============================== */

function salinId() {

    let id = document.getElementById("idTiket").innerText;

    navigator.clipboard.writeText(id);

    alert("ID transaksi berhasil disalin");

}

/* ==============================
TUTUP POPUP
============================== */

function tutupPopup() {
    document.getElementById("popupTiket").remove();
}

/* ==============================
HITUNG TOTAL
============================== */

function hitungTotal() {

    let jumlah = parseInt(document.getElementById("jumlah")?.value) || 1;

    let harga = 10000;

    let total = jumlah * harga;

    let el = document.getElementById("totalHarga");

    if (el) {
        el.innerText = "Total Harga : Rp " + total.toLocaleString("id-ID");
    }

}

/* ==============================
UPDATE RUTE
============================== */

function updateRute() {

    let asal = document.getElementById("asal")?.value;
    let tujuan = document.getElementById("tujuan")?.value;

    let el = document.getElementById("routeText");

    if (el) {
        el.innerText = "Rute: " + asal + " → " + tujuan;
    }

}

/* ==============================
MENU HAMBURGER
============================== */

let menuOpen = false;

function toggleMenu() {

    let menu = document.getElementById("navMenu");
    let icon = document.getElementById("menuIcon");
    let overlay = document.getElementById("menuOverlay");

    if (menuOpen) {

        menu.style.right = "-250px";
        icon.innerHTML = "☰";
        overlay.style.display = "none"; // 🔥 hilangin overlay
        menuOpen = false;

    } else {

        menu.style.right = "0";
        icon.innerHTML = "✖";
        overlay.style.display = "block"; // 🔥 munculin overlay
        menuOpen = true;

    }
}

/* ==============================
USER DROPDOWN
============================== */
function toggleUserMenu(e) {

    /* biar ga bentrok sama klik luar */
    if (e) e.stopPropagation();

    let dropdown = document.getElementById("userDropdown");

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }

}

/* klik luar = tutup dropdown */
document.addEventListener("click", function (e) {

    let userBox = document.getElementById("userBox");
    let dropdown = document.getElementById("userDropdown");

    if (userBox && dropdown) {

        if (!userBox.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = "none";
        }

    }

});

/* ==============================
CEK USER NAVBAR
============================== */

function cekUserNavbar() {

    let user = JSON.parse(localStorage.getItem("lrt_currentUser"));

    let userBox = document.getElementById("userBox");

    /* 🔥 TAMBAHAN */
    let loginLink = document.getElementById("loginLink");
    let registerLink = document.getElementById("registerLink");
    let logoutLink = document.getElementById("logoutLink");

    /* 🔥 TAMBAHAN EMAIL DROPDOWN */
    let dropdownEmail = document.getElementById("dropdownEmail");

    if (user && userBox) {

        /* tampilkan username (sebelum @) */
        userBox.innerText = user.email.charAt(0).toUpperCase();

        /* isi email di dropdown */
        if (dropdownEmail) {
            dropdownEmail.innerText = user.email;
        }

        /* tampilkan logout */
        if (loginLink) loginLink.style.display = "none";
        if (registerLink) registerLink.style.display = "none";
        if (logoutLink) logoutLink.style.display = "block";

    } else if (userBox) {

        userBox.innerText = "👤";

        /* kosongkan dropdown email */
        if (dropdownEmail) {
            dropdownEmail.innerText = "";
        }

        /* tampilkan login */
        if (loginLink) loginLink.style.display = "block";
        if (registerLink) registerLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "none";

    }

}

/* ==============================
REGISTER
============================== */

function registerUser() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("lrt_users")) || [];

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (email === "" || password === "") {
        alert("Email dan password wajib diisi!");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("Format email tidak valid!");
        return;
    }

    if (password.length < 6) {
        alert("Password minimal 6 karakter!");
        return;
    }

    let emailExists = users.find(user => user.email === email);

    if (emailExists) {
        alert("Email sudah terdaftar!");
        return;
    }

    users.push({
        email: email,
        password: password
    });

    localStorage.setItem("lrt_users", JSON.stringify(users));

    alert("Akun berhasil dibuat!");

    window.location.href = "login.html";

}

/* ==============================
LOGIN
============================== */

function loginUser() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("lrt_users")) || [];

    if (email === "" || password === "") {
        alert("Email dan password harus diisi!");
        return;
    }

    let foundUser = users.find(user =>
        user.email === email && user.password === password
    );

    if (foundUser) {

        localStorage.setItem("lrt_currentUser", JSON.stringify(foundUser));

        alert("Login berhasil!");

        window.location.href = "index.html";

    } else {

        alert("Email atau password salah!");

    }

}

/* ==============================
SAAT HALAMAN DIBUKA
============================== */

window.onload = function () {

    cekUserNavbar();
    hitungTotal();
    updateRute();

}

function cekTransaksi() {

    let id = document.getElementById("cekId").value;

    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];

    let trx = transactions.find(t => t.id === id);

    if (trx) {

        document.getElementById("hasilCek").innerHTML = `
<p>ID : ${trx.id}</p>
<p>Rute : ${trx.asal} → ${trx.tujuan}</p>
<p>Jumlah : ${trx.jumlah}</p>
<p>Total : Rp ${trx.total.toLocaleString("id-ID")}</p>
<p>Status : ${trx.status}</p>
`;

    } else {

        document.getElementById("hasilCek").innerHTML =
            "Transaksi tidak ditemukan";

    }

}

/* =========================
   DASHBOARD
========================= */
function loadDashboard() {

    const currentUser = JSON.parse(localStorage.getItem("lrt_currentUser"));
    const transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];

    if (!currentUser) {
        alert("Silakan login dulu!");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("welcomeText").innerText =
        "Halo, " + currentUser.email;

    const userTransactions = transactions.filter(trx =>
        trx.userEmail === currentUser.email
    );

    let total = 0;
    let table = document.getElementById("riwayatBody");

    table.innerHTML = "";

    userTransactions.forEach(trx => {

        total += trx.total;

        /* 🔥 ULASAN */
        let aksi = "-";

        if (trx.reviewed) {
            aksi = `<span class="review-done">✔ Sudah Diulas</span>`;
        } else {
            aksi = `<button class="review-btn" onclick="openReview('${trx.id}')">Beri Ulasan ⭐</button>`;
        }

        table.innerHTML += `
<tr>
<td>${trx.id}</td>
<td>${trx.asal} → ${trx.tujuan}</td>
<td>${trx.jumlah}</td>
<td>Rp ${trx.total.toLocaleString("id-ID")}</td>
<td>${trx.status}</td>
<td>${aksi}</td>
</tr>
`;

    });

    document.getElementById("totalTransaksi").innerText = userTransactions.length;

    document.getElementById("totalBelanja").innerText =
        "Rp " + total.toLocaleString("id-ID");

}


/* =========================
   POPUP ULASAN
========================= */
function openReview(trxId) {

    document.body.insertAdjacentHTML("beforeend", `
<div id="reviewPopup" style="
position:fixed;
inset:0;
background:rgba(0,0,0,0.5);
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
">

<div style="
background:white;
padding:20px;
border-radius:12px;
width:300px;
text-align:center;
">

<h3>Berikan Ulasan ⭐</h3>

<!-- 🔥 INPUT NAMA -->
<input id="namaUser" placeholder="Nama kamu..."
style="
width:100%;
padding:8px;
border-radius:6px;
margin-bottom:10px;
">

<select id="rating" style="
padding:8px;
border-radius:6px;
margin-bottom:10px;
width:100%;
">
<option value="5">⭐⭐⭐⭐⭐</option>
<option value="4">⭐⭐⭐⭐</option>
<option value="3">⭐⭐⭐</option>
<option value="2">⭐⭐</option>
<option value="1">⭐</option>
</select>

<textarea id="reviewText"
placeholder="Tulis ulasan..."
style="
width:100%;
height:80px;
border-radius:6px;
padding:8px;
margin-bottom:10px;
"></textarea>

<button onclick="submitReview('${trxId}')">Kirim</button>
<button onclick="closeReview()">Batal</button>

</div>
</div>
`);
}

function closeReview() {
    let popup = document.getElementById("reviewPopup");
    if (popup) popup.remove();
}


/* =========================
   SIMPAN ULASAN + MASUK KE HOME
========================= */
function submitReview(trxId) {

    let rating = document.getElementById("rating").value;
    let review = document.getElementById("reviewText").value;

    /* 🔥 AMBIL NAMA DARI INPUT */
    let namaInput = document.getElementById("namaUser").value;

    if (review.trim() === "") {
        alert("Ulasan tidak boleh kosong!");
        return;
    }

    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];
    let reviews = JSON.parse(localStorage.getItem("lrt_reviews")) || [];

    /* update transaksi */
    transactions.forEach(trx => {
        if (trx.id === trxId) {
            trx.reviewed = true;
            trx.rating = rating;
            trx.review = review;
        }
    });

    /* 🔥 SIMPAN KE HOME (PAKAI NAMA INPUT) */
    reviews.push({
        nama: namaInput.trim() || "Anonim",
        pesan: review,
        rating: rating
    });

    /* simpan semua */
    localStorage.setItem("lrt_transactions", JSON.stringify(transactions));
    localStorage.setItem("lrt_reviews", JSON.stringify(reviews));

    alert("Ulasan berhasil dikirim ⭐");

    closeReview();
    loadDashboard();
}


/* =========================
   TAMPILKAN ULASAN DI HOME
========================= */
function loadReviews() {

    let reviews = JSON.parse(localStorage.getItem("lrt_reviews")) || [];
    let container = document.getElementById("reviewContainer");

    if (!container) return;

    container.innerHTML = "";

    if (reviews.length === 0) {
        container.innerHTML = "<p>Belum ada ulasan 😢</p>";
        return;
    }

    reviews.slice(-6).reverse().forEach(r => {

        let nama = r.nama || "Anonim";
        let pesan = r.pesan || "-";
        let rating = parseInt(r.rating) || 5;

        container.innerHTML += `
<div class="ulasan-card">

    <div class="ulasan-header">
        <div class="avatar">${r.nama.charAt(0).toUpperCase()}</div>
        <div>
            <h4>${r.nama}</h4>
            <div class="stars">
                ${"⭐".repeat(parseInt(r.rating))}
            </div>
        </div>
    </div>

    <div class="ulasan-text">
        "${r.pesan}"
    </div>

</div>
`;
    });

}

function logoutUser() {

    localStorage.removeItem("lrt_currentUser");

    alert("Logout berhasil!");

    window.location.href = "login.html";

}

function toggleUserMenu() {

    let menu = document.getElementById("userDropdown");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }

}

/* ==============================
LOAD TIKET SAYA
============================== */

function loadTickets() {

    console.log("LOAD TICKETS JALAN");

    let currentUser = JSON.parse(localStorage.getItem("lrt_currentUser"));
    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];

    if (!currentUser) {
        alert("Login dulu!");
        window.location.href = "login.html";
        return;
    }

    let container = document.getElementById("ticketContainer");
    container.innerHTML = "";

    /* 🔍 ambil input search & filter */
    let search = document.getElementById("searchInput")?.value.toLowerCase() || "";
    let asalFilter = document.getElementById("filterAsal")?.value || "";
    let tujuanFilter = document.getElementById("filterTujuan")?.value || "";

    /* 🔥 filter data */
    let myTickets = transactions.filter(trx =>
        trx.userEmail &&
        trx.userEmail.toLowerCase().trim() === currentUser.email.toLowerCase().trim() &&

        /* 🔍 search ID */
        trx.id.toLowerCase().includes(search) &&

        /* 🎯 filter asal */
        (asalFilter === "" || trx.asal === asalFilter) &&

        /* 🎯 filter tujuan */
        (tujuanFilter === "" || trx.tujuan === tujuanFilter)
    );

    console.log("HASIL FILTER:", myTickets);

    /* kalau kosong */
    if (myTickets.length === 0) {
        container.innerHTML = "<p>Tiket tidak ditemukan 😢</p>";
        return;
    }

    /* tampilkan */
    myTickets.forEach(trx => {

        container.innerHTML += `
<div class="ticket-card">

<h3>🎫 ${trx.id}</h3>

<p>${trx.asal} → ${trx.tujuan}</p>
<p>${trx.jumlah} tiket</p>
<p><b>Rp ${trx.total.toLocaleString("id-ID")}</b></p>

<div class="ticket-actions">
<button class="btn-detail" onclick="lihatTiket('${trx.id}')">Detail</button>
<button class="btn-print" onclick="printTiket('${trx.id}')">Cetak</button>
</div>

</div>
`;

    });

}

function lihatTiket(id) {

    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];
    let trx = transactions.find(t => t.id === id);

    if (!trx) return;

    document.body.insertAdjacentHTML("beforeend", `

<div id="popupTiket" style="
position:fixed;
inset:0;
background:rgba(0,0,0,0.6);
display:flex;
align-items:center;
justify-content:center;
z-index:9999;
">

<div style="
background:white;
border-radius:16px;
width:360px;
overflow:hidden;
font-family:Poppins, sans-serif;
">

<!-- HEADER -->
<div style="
background:#1e293b;
color:white;
margin:-10px;
padding:20px;
text-align:center;
">
<h2>🎫 E-Tiket LRT</h2>
<p style="font-size:12px;opacity:0.8;">Tunjukkan saat masuk stasiun</p>
</div>

<!-- BODY -->
<div style="padding:20px;">

<!-- RUTE -->
<div style="text-align:center;margin-bottom:15px;">
<h3 style="color:#000000;">${trx.asal} → ${trx.tujuan}</h3>
<p style="font-size:13px;color:#000000;">${trx.jumlah} tiket</p>
</div>

<!-- GARIS -->
<div style="border-top:1px dashed #cbd5f5;margin:15px 0;"></div>

<!-- DETAIL -->
<div style="font-size:14px;line-height:1.8;">
<p style="color:#000000;"><b>ID:</b> ${trx.id}</p>
<p style="color:#000000;"><b>Pembayaran:</b> ${trx.metode}</p>
<p style="color:#000000;"><b>Status:</b> ${trx.status}</p>
</div>

<!-- TOTAL -->
<div style="
margin-top:15px;
font-size:18px;
font-weight:bold;
color:#3b82f6;
text-align:center;
">
Rp ${trx.total.toLocaleString("id-ID")}
</div>

<!-- QR -->
<div style="text-align:center;margin-top:20px;">
<div id="qrCode"></div>

</div>

<!-- BUTTON -->
<div style="margin-top:20px;text-align:center;">
<button onclick="window.print()" style="
background:#1e293b;
color:white;
border:none;
padding:10px 15px;
border-radius:8px;
cursor:pointer;
margin-right:10px;
">🖨 Cetak</button>

<button onclick="tutupPopup()" style="
background:#64748b;
color:white;
border:none;
padding:10px 15px;
border-radius:8px;
cursor:pointer;
">Tutup</button>
</div>

</div>
</div>
</div>
`);

    /* QR */
    new QRCode(document.getElementById("qrCode"), {
        text: trx.id,
        width: 120,
        height: 120
    });

}

function printTiket(id) {
    lihatTiket(id);
}

function closeMenu() {

    let menu = document.getElementById("navMenu");
    let icon = document.getElementById("menuIcon");

    menu.style.right = "-250px";
    icon.innerHTML = "☰";
    menuOpen = false;

}

document.addEventListener("click", function (e) {

    let menu = document.getElementById("navMenu");
    let icon = document.getElementById("menuIcon");

    let userBox = document.getElementById("userBox");
    let userDropdown = document.getElementById("userDropdown");

    /* 🔥 TUTUP MENU */
    if (menu && icon) {
        if (!menu.contains(e.target) && !icon.contains(e.target)) {
            closeMenu();
        }
    }

    /* 🔥 TUTUP DROPDOWN USER */
    if (userDropdown && userBox) {
        if (!userDropdown.contains(e.target) && !userBox.contains(e.target)) {
            userDropdown.style.display = "none";
        }
    }

});

function toggleUserMenu(e) {

    e.stopPropagation(); // biar gak langsung ketutup

    let dropdown = document.getElementById("userDropdown");

    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }

}

function startScanner() {

    const hasil = document.getElementById("hasilScan");

    function onScanSuccess(decodedText) {

        let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];

        let trx = transactions.find(t => t.id === decodedText);

        if (trx) {

            hasil.innerHTML = `
            <h3 style="color:green;">✅ Tiket Valid</h3>

            <p><b>ID:</b> ${trx.id}</p>
            <p>${trx.asal} → ${trx.tujuan}</p>
            <p>${trx.jumlah} tiket</p>
            <p>Total: Rp ${trx.total.toLocaleString("id-ID")}</p>
        `;

        } else {

            hasil.innerHTML = `
            <h3 style="color:red;">❌ Tiket Tidak Ditemukan</h3>
        `;

        }

    }

    let html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: 250 }
    );

    html5QrcodeScanner.render(onScanSuccess);

}

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    /* simpan pilihan */
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("lrt_theme", "dark");
    } else {
        localStorage.setItem("lrt_theme", "light");
    }

}

/* auto load saat buka halaman */
(function () {

    let theme = localStorage.getItem("lrt_theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }

})();

function animasiScroll() {

    let elements = document.querySelectorAll(".fade-up");

    elements.forEach(el => {
        let posisi = el.getBoundingClientRect().top;
        let layar = window.innerHeight;

        if (posisi < layar - 100) {
            el.classList.add("show");
        }
    });

}

window.addEventListener("scroll", animasiScroll);

/* JANGAN langsung munculin semua */

function loadReviews() {

    let ulasan = JSON.parse(localStorage.getItem("lrt_ulasan")) || [];

    let container = document.getElementById("ulasanContainer");

    if (!container) return;

    container.innerHTML = "";

    if (ulasan.length === 0) {
        container.innerHTML = "<p>Belum ada ulasan 😢</p>";
        return;
    }

    ulasan.forEach(u => {
        container.innerHTML += `
<div class="ulasan-card">

    <div class="ulasan-header">
        <div class="avatar">
            ${u.nama.charAt(0).toUpperCase()}
        </div>

        <div>
            <h4>${u.nama}</h4>
            <div class="stars">${"⭐".repeat(u.rating)}</div>
        </div>
    </div>

    <p class="ulasan-text">"${u.pesan}"</p>

</div>
`;

    });

}

function loadJadwal() {

    const data = [
        { jam: "08:00", rute: "Bandara → Ampera" },
        { jam: "09:05", rute: "Ampera → Jakabaring" },
        { jam: "09:20", rute: "Bandara → Asrama Haji" },
        { jam: "10:00", rute: "Jakabaring → Bandara" },
        { jam: "14:55", rute: "Cinde → Ampera" },
        { jam: "15:30", rute: "Punti Kayu → Jakabaring" },
        { jam: "19:25", rute: "Dishub → Asrama Haji" },
        { jam: "21:00", rute: "Jakabaring → DJKA" }
    ];

    let container = document.getElementById("jadwalContainer");
    if (!container) return;

    container.innerHTML = "";

    let now = new Date();
    let currentTime = now.getHours() * 60 + now.getMinutes();

    data.forEach(j => {

        let [h, m] = j.jam.split(":");
        let jadwalTime = parseInt(h) * 60 + parseInt(m);

        let diff = jadwalTime - currentTime;

        let statusClass = "";
        let statusText = "";

        if (diff > 30) {
            statusClass = "wait";
            statusText = "🔵 Menunggu";
        }
        else if (diff <= 30 && diff > 0) {
            statusClass = "soon";
            statusText = "🟡 Segera Berangkat";
        }
        else if (diff <= 0 && diff >= -10) {
            statusClass = "on";
            statusText = "🟢 On Time";
        }
        else {
            statusClass = "done";
            statusText = "⚪ Selesai";
        }

        container.innerHTML += `
        <div class="jadwal-card" onclick="pilihJadwal('${j.rute}', '${j.jam}')">
            <div class="jam">${j.jam}</div>
            <div class="rute">${j.rute}</div>
            <div class="status ${statusClass}">${statusText}</div>
        </div>
        `;
    });
}

/* 🔥 FUNCTION PINDAH KE BOOKING */
function pilihJadwal(rute, jam) {

    let split = rute.split("→");
    let asal = split[0].trim();
    let tujuan = split[1].trim();

    window.location.href = `booking.html?asal=${asal}&tujuan=${tujuan}&jam=${jam}`;
}

/* auto load */
document.addEventListener("DOMContentLoaded", loadJadwal);

function isiDariJadwal() {

    let params = new URLSearchParams(window.location.search);

    let asal = params.get("asal");
    let tujuan = params.get("tujuan");
    let jam = params.get("jam");

    if (asal) document.getElementById("asal").value = asal;
    if (tujuan) document.getElementById("tujuan").value = tujuan;
    if (jam) document.getElementById("jam").value = jam;
}

document.addEventListener("DOMContentLoaded", isiDariJadwal);

function loadStatistik() {

    let transactions = JSON.parse(localStorage.getItem("lrt_transactions")) || [];
    let reviews = JSON.parse(localStorage.getItem("lrt_reviews")) || [];

    // 🎫 total tiket
    let totalTiket = transactions.length;

    // 👤 user unik (dari nama di review)
    let userSet = new Set();
    reviews.forEach(r => userSet.add(r.nama));
    let totalUser = userSet.size;

    // ⭐ rata-rata rating
    let totalRating = 0;
    reviews.forEach(r => {
        totalRating += parseInt(r.rating || 0);
    });

    let avgRating = reviews.length > 0
        ? (totalRating / reviews.length).toFixed(1)
        : 0;

    // 💬 total ulasan
    let totalReview = reviews.length;

    // tampilkan ke HTML
    document.getElementById("totalTiket").innerText = totalTiket;
    document.getElementById("totalUser").innerText = totalUser;
    document.getElementById("avgRating").innerText = avgRating;
    document.getElementById("totalReview").innerText = totalReview;
}

/* auto load */
document.addEventListener("DOMContentLoaded", loadStatistik);

function animateNumber(id, end) {
    let el = document.getElementById(id);
    let start = 0;

    let interval = setInterval(() => {
        start++;
        el.innerText = start;

        if (start >= end) {
            el.innerText = end;
            clearInterval(interval);
        }
    }, 20);
}

/* cs */
// FAQ ACCORDION
document.querySelectorAll(".faq-question").forEach(item => {
    item.addEventListener("click", () => {

        let parent = item.parentElement;

        parent.classList.toggle("active");

    });
});

function updateClock(){

    let now = new Date();

    let jam = now.getHours().toString().padStart(2,"0");
    let menit = now.getMinutes().toString().padStart(2,"0");
    let detik = now.getSeconds().toString().padStart(2,"0");

    let hari = now.toLocaleDateString("id-ID", { weekday:"long" });
    let tanggal = now.toLocaleDateString("id-ID");

    let el = document.getElementById("liveClock");
    if(!el) return;

    el.innerHTML = `
        <div class="time">${jam}:${menit}:${detik}</div>
        <div class="date">${hari}, ${tanggal}</div>
    `;
}

setInterval(updateClock, 1000);
updateClock();