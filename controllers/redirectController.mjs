import { updateLink, updateStatus, findUser } from "../models/user.mjs";

async function redirectLink(req, res) {
  try {
    const userEmail = req.user.gmail;
    const { link } = req.body;
    const user = await updateLink(userEmail, link);
    res.json({ success: true, message: "Berhasil Mengupdate Link Tujuan" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Gagal Mengupdate Link Tujuan" });
  }
}

async function handleRedirect(req, res) {
  try {
    const { id } = req.params;
    const decodedEmail = Buffer.from(id, "base64").toString("ascii");
    const user = await findUser(decodedEmail);
    if (user && user.is_active === 1 && user.link_tujuan) {
      return res.redirect(user.link_tujuan);
    }
    res.status(404).redirect("/error");
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan." });
  }
}

async function handleStatus(req, res) {
  try {
    const { status } = req.body;
    const userEmail = req.user.gmail;
    const statusInt = parseInt(status);

    await updateStatus(userEmail, statusInt);
    res.json({ success: true, newStatus: statusInt });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "gagal mengupadate status" });
  }
}

export { handleRedirect, handleStatus, redirectLink };
