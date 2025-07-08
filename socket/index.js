import database from '../config/Database.js';

/**
 * Middleware otentikasi untuk Socket.IO yang disesuaikan dengan sistem token Anda.
 * Ini meniru logika dari middleware/VerifyToken.js
 */
const socketAuthMiddleware = async (socket, next) => {
    try {
        // Ambil data otentikasi yang dikirim oleh klien
        const token = socket.handshake.auth.token;
        const email = socket.handshake.auth.email;
        const device = 'mobile'; // Asumsi semua koneksi socket berasal dari mobile

        if (!token || !email) {
            return next(new Error("Authentication error: Missing token or email"));
        }

        // Query ke database untuk memverifikasi token
        const [checkToken] = await database.query(
            'SELECT EXPIRED_DATE AS EXPIRED FROM TOKENS WHERE EMAIL = ? AND BINARY TOKEN = ? AND DEVICE = ?',
            [email, token, device]
        );

        // Jika token tidak ditemukan atau sudah kedaluwarsa
        if (checkToken.length === 0 || new Date(checkToken[0].EXPIRED) <= new Date()) {
            return next(new Error("Authentication error: Invalid or expired token"));
        }

        // Jika token valid, simpan email di objek socket untuk digunakan nanti
        socket.user = { email: email };
        next(); // Lanjutkan ke proses koneksi

    } catch (error) {
        console.error("Socket Auth Error:", error);
        next(new Error("Internal server error during authentication"));
    }
};

const initializeSocket = (io) => {
    // Terapkan middleware otentikasi untuk setiap koneksi baru
    io.use(socketAuthMiddleware);

    io.on('connection', async (socket) => {
        console.log(`✅ User connected via WebSocket: ${socket.user.email}`);

        // Logika selanjutnya (masuk ke rooms, handle pesan) tetap sama persis
        // karena kita sudah punya `socket.user.email` yang valid.

        // --- MASUK KE ROOMS GRUP ---
        try {
            const [groups] = await database.query(
                'SELECT group_id FROM GROUPMEMBERS WHERE user_email = ?', 
                [socket.user.email]
            );
            groups.forEach(group => {
                socket.join(group.group_id);
                console.log(`   > User ${socket.user.email} joined room: ${group.group_id}`);
            });
        } catch (error) {
            console.error("Error joining rooms:", error);
        }

        // --- EVENT HANDLER UNTUK "sendMessage" ---
        socket.on('sendMessage', async (data) => {
            const { groupId, content } = data;
            const senderEmail = socket.user.email;

            if (!groupId || !content) {
                return socket.emit('sendMessageError', { message: 'Group ID and content are required.' });
            }

            try {
                // Verifikasi keanggotaan grup (sudah ada)
                const [members] = await database.query('SELECT user_email FROM GROUPMEMBERS WHERE user_email = ? AND group_id = ?', [senderEmail, groupId]);
                if (members.length === 0) {
                    return socket.emit('sendMessageError', { message: 'You are not a member of this group.' });
                }

                // Simpan pesan ke DB (sudah ada)
                await database.query(
                    'INSERT INTO MESSAGES (id, group_id, sender_email, content) VALUES (UUID(), ?, ?, ?)',
                    [groupId, senderEmail, content]
                );
                
                // Ambil nama pengirim (sudah ada)
                const [users] = await database.query('SELECT name FROM USER WHERE email = ?', [senderEmail]);
                const senderName = users[0]?.name || 'Unknown User';

                // Siapkan data untuk broadcast (sudah ada)
                const messageData = {
                    groupId,
                    senderEmail,
                    senderName,
                    content,
                    sentAt: new Date().toISOString()
                };

                // Broadcast pesan (sudah ada)
                io.to(groupId).emit('newMessage', messageData);

            } catch (error) {
                console.error("Error handling sendMessage:", error);
                socket.emit('sendMessageError', { message: 'Failed to send message.' });
            }
        });

        // --- EVENT HANDLER UNTUK DISCONNECT ---
        socket.on('disconnect', () => {
            console.log(`❌ User disconnected: ${socket.user.email}`);
        });
    });
};

export default initializeSocket;