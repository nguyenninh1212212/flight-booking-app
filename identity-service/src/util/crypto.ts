import process from "process";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
if (!ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY environment variable is not set");
}
const ALGORITHM = "aes-256-gcm";
const SECRET_KEY = Buffer.from(ENCRYPTION_KEY, "utf8");
const IV_LENGTH = 16;

const cryptoUtil = {
  encrypt: (data: any) => {
    const text = JSON.stringify(data);
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    const authTag = cipher.getAuthTag().toString("hex");

    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  },

  decrypt: (encryptedData: any) => {
    const [ivHex, authTagHex, encryptedText] = encryptedData.split(":");

    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  },
};

export default cryptoUtil;
