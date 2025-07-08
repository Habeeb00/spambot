
# 📬 WhatsApp Bot using `whatsapp-web.js`

A lightweight WhatsApp messaging bot built with `whatsapp-web.js`, supporting CSV-based message sending and basic spam prevention through random delay intervals.

---

## 🛠 How to Use

### 1. Install Required Packages

Make sure you have Node.js installed, then run:

```bash
npm install whatsapp-web.js qrcode-terminal csv-parser
```

---

### 2. Prepare Your Contact List

Create a CSV file named `contacts.csv` in the root of your project directory.

**CSV Format (no header row):**

```
name,number,message
```

**Example:**

```
John,+919876543210,Hey John! Just checking in.
Sara,+918765432109,Hi Sara! Here's something you might like.
```

---

### 3. Run the Bot

```bash
node index.js
```

You'll see a QR code in your terminal.

---

### 4. Scan the QR Code

Open WhatsApp on your phone → Tap **Settings** → **Linked Devices** → **Scan the QR Code** shown in the terminal.

---

### ✅ What Happens Next

- Messages will be sent one by one with a **random delay between 5–18 seconds** to avoid spam detection.
- The terminal will display the **status of each message**.
- Sent messages are **logged** into a file (`log.txt`) or inside the `/logs` folder.

---

## 📌 Notes

- Only works when your system is online and the QR session is active.
- Do not send too many messages per session to avoid rate-limiting.
- Best used with small, staggered batches (e.g., 20–30 messages at a time).

---

## 📂 Folder Structure (Basic)

```
your-bot-folder/
├── contacts.csv
├── index.js
├── log.txt (optional)
└── node_modules/
```

---

## 💡 Credits

Built using [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

---

## 🔐 Disclaimer

This project is for educational and personal use only. Use responsibly to avoid violating WhatsApp's terms of service.
