const Kavenegar = require("kavenegar");

const { KAVE_NEGAR_API_KEY } = process.env;

const sendMessage = (message) => {
  var api = Kavenegar.KavenegarApi({ apikey: KAVE_NEGAR_API_KEY });
  api.Send({ message:`${message}\nhttps://semester-scheduler.vercel.app`, sender: "1000596446", receptor: "09116417260" });
};

module.exports = {
  sendMessage,
};
