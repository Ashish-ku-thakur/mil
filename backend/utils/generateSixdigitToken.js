export let generateSixdigitToken = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let sixDigitCode = "";
  let charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    sixDigitCode += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }

  //  let resetLink = crypto.randomBytes(3).toString('hex');
  //   console.log(resetLink);

  // let resetLink = crypto.randomBytes(4).toString("base64");
  // let ch = resetLink.split("");
  // let bl = "";
  // for (let i = 0; i < 6; i++) {
  //   bl += ch[i];
  // }
  // console.log(bl);
  return sixDigitCode;
};
