import { ConnectDb } from "../config/database.mjs";

async function addUser(email, qr) {
  const newUser = {
    gmail: email,
    link_tujuan: null,
    is_active: 0,
    qr_code: qr,
  };
  await ConnectDb.insertOne(newUser);
  return newUser;
}

async function findUser(email) {
  return await ConnectDb.findOne({
    gmail: email,
  });
}
async function updateLink(email, link) {
  await ConnectDb.updateOne({ gmail: email }, { $set: { link_tujuan: link } });
}

async function updateStatus(email, status) {
  await ConnectDb.updateOne(
    {
      gmail: email,
    },
    { $set: { is_active: status } },
  );
}

async function updateQr(email, qrCode) {
  const updatedUser = await ConnectDb.findOneAndUpdate(
    { gmail: email },
    { $set: { qr_code: qrCode } },
    { new: true },
  );

  return updatedUser;
}

async function deleteAccount(email) {
  await ConnectDb.deleteOne({ gmail: email });
}

export { addUser, findUser, updateLink, updateStatus, deleteAccount, updateQr };
