import QRCode from "qrcode";

async function generateQr(email) {
  try {
    const encodedEmail = Buffer.from(email).toString("base64");
    const bridgeUrl = `http://akyuarb.vercel.app/usr/${encodedEmail}`;
    const qrCode = await QRCode.toDataURL(bridgeUrl, {
      errorCorrectionLevel: "H",
      margin: 2,
      scale: 10,
    });
    return qrCode;
  } catch (error) {
    return error;
  }
}

export { generateQr };
