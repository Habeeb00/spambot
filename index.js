const fs = require("fs");
const csv = require("csv-parser");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const contacts = [];

// Read CSV
fs.createReadStream("contacts.csv")
  .pipe(csv())
  .on("data", (row) => {
    contacts.push(row);
  })
  .on("end", () => {
    console.log("📥 Contacts loaded from CSV.");
    startWhatsApp();
  });

function startWhatsApp() {
  const client = new Client({
    authStrategy: new LocalAuth(),
  });

  client.on("qr", (qr) => {
    console.log("📲 Scan this QR to log in:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("✅ WhatsApp connected! Starting to send messages...");

    let index = 0;

    function sendNext() {
      if (index >= contacts.length) {
        console.log("🎉 All messages sent!");
        return;
      }

      const contact = contacts[index];
      let phone = contact.phone.replace(/[^\d]/g, "");
      if (!phone.startsWith("91")) phone = "91" + phone;

      const number = `${phone}@c.us`;
      const message =
        contact.message && contact.message.trim().length > 0
          ? contact.message
          : `Hi ${contact.name}, just reaching out!`;

      client
        .sendMessage(number, message)
        .then(() => {
          console.log(`✔️ Sent to ${contact.name}`);
          fs.appendFileSync("sent.log", `${contact.name},${phone},SUCCESS\n`);
        })
        .catch((err) => {
          console.error(`❌ Failed to send to ${contact.name}:`, err.message);
          fs.appendFileSync("sent.log", `${contact.name},${phone},FAILED\n`);
        })
        .finally(() => {
          index++;
          const delay = 8000 + Math.floor(Math.random() * 5000); // 8–13s
          setTimeout(sendNext, delay);
        });
    }

    sendNext();
  });

  client.initialize();
}
