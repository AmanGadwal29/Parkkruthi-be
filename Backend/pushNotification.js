const fs = require("fs");
const webPush = require("web-push");
const path = require("path");

const envPath = path.resolve(__dirname, ".env");

// Read existing content if file exists
let envContent = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf-8")
  : "";

const hasPublicKey = envContent.includes("PUBLIC_KEY=");
const hasPrivateKey = envContent.includes("PRIVATE_KEY=");

// Always generate new keys if either is missing or we want to update
const { publicKey, privateKey } = webPush.generateVAPIDKeys();

if (hasPrivateKey || hasPublicKey) {
  // Remove old key lines and clean up formatting
  const updatedContent = envContent
    .split("\n")
    .map((line) => line.trim())
    .filter(
      (line) =>
        line !== "" &&
        !line.startsWith("PUBLIC_KEY=") &&
        !line.startsWith("PRIVATE_KEY=")
    )
    .join("\n");

  // Append clean new keys
  const finalContent =
    [updatedContent, `PUBLIC_KEY=${publicKey}`, `PRIVATE_KEY=${privateKey}`]
      .filter(Boolean)
      .join("\n") + "\n";

  fs.writeFileSync(envPath, finalContent);
  console.log("VAPID keys updated in .env");
} else {
  // No keys existed — append to existing or new file
  const newData = `PUBLIC_KEY=${publicKey}\nPRIVATE_KEY=${privateKey}\n`;
  const finalContent = (envContent.trim() + "\n" + newData).trim() + "\n";
  fs.writeFileSync(envPath, finalContent);
  console.log("VAPID keys written to .env");
}
