// Fungsi untuk login sebagai admin dengan password
function loginAsAdmin() {
    const adminUsername = document.getElementById('adminUsername').value;
    const adminPassword = document.getElementById('adminPassword').value;

    // Ganti username dan password sesuai dengan admin yang valid
    if (adminUsername === 'raka' && adminPassword === '17082006') {
        localStorage.setItem('isAdmin', 'true');
        alert('Login berhasil sebagai Admin');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('message-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadMessages();  // Memuat pesan saat login sebagai admin
    } else {
        alert('Username atau Password salah!');
    }
}

// Fungsi untuk logout dari akun admin
function logout() {
    localStorage.removeItem('isAdmin');
    alert('Anda telah logout');
    document.getElementById('login-section').style.display = 'block';
    document.getElementById('message-section').style.display = 'block';
    document.getElementById('admin-section').style.display = 'none';
}

// Fungsi untuk mengirim pesan anonim
function sendMessage() {
    const messageText = document.getElementById('message').value;
    if (messageText.trim()) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        const newMessage = {
            message: messageText,
            timestamp: new Date().toLocaleTimeString(),
            isAnonymous: true,
        };
        messages.push(newMessage);
        localStorage.setItem('messages', JSON.stringify(messages));
        document.getElementById('message').value = ''; // Clear input
        loadMessages();  // Segera memuat pesan setelah pengiriman
        alert('Pesan berhasil dikirim!');
    } else {
        alert('Pesan tidak boleh kosong');
    }
}

// Fungsi untuk memuat semua pesan anonim
function loadMessages() {
    const messagesContainer = document.getElementById('messages');
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messagesContainer.innerHTML = ''; // Menghapus pesan yang lama

    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <p><strong>Pesan:</strong> ${message.message}</p>
            <p><em>Waktu: ${message.timestamp}</em></p>
            <button onclick="deleteMessage(${index})">Hapus Pesan</button>
        `;
        messagesContainer.appendChild(messageElement);
    });

    // Memastikan scroll ke bawah jika ada pesan baru
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Fungsi untuk menghapus pesan
function deleteMessage(index) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.splice(index, 1); // Menghapus pesan yang dipilih
    localStorage.setItem('messages', JSON.stringify(messages));
    loadMessages();  // Memuat pesan lagi setelah penghapusan
}

// Memeriksa apakah pengguna sudah login sebagai admin
document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('message-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadMessages(); // Memuat pesan saat admin login
    } else {
        document.getElementById('login-section').style.display = 'block';
        document.getElementById('message-section').style.display = 'block';
        document.getElementById('admin-section').style.display = 'none';
    }
});
