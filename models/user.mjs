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

export { addUser, findUser, updateLink, updateStatus };
