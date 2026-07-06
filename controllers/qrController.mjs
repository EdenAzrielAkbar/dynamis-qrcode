import QRCode from "qrcode";

async function generateQr(email, userId) {
  try {
    const uniqueString = `${email}:${userId}`;
    const encodedData = Buffer.from(uniqueString).toString("base64");
    const bridgeUrl = `http://akyuarb.vercel.app/usr/${encodedData}`;
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
