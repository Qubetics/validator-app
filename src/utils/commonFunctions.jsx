Number.prototype.noExponents = function () {
  try {
    var data = String(this).split(/[eE]/);
    if (data.length === 1) return data[0];
    var z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;
    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^\-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  } catch (error) {}
};

export const noExponential = (num) => {
  return Number(num).noExponents();
};

export const isTimeAgoByCreatedDate = (date) => {
  const parsed_time = new Date(date).getTime();
  const current_time = Date.now();
  const current_month = new Date().getMonth();
  const parsed_month = new Date(date).getMonth();
  const diffMonth = current_month - parsed_month;
  let timeLeft;
  const newDate = (current_time - parsed_time) / 1000;
  if (diffMonth == 0 && newDate < 60)
    timeLeft = `${Math.abs(newDate.toFixed(0))}s ago`;
  if (diffMonth == 0 && newDate >= 60 && newDate < 3600)
    timeLeft = `${(newDate / 60).toFixed(0)}m ago`;
  if (diffMonth == 0 && newDate >= 3600 && newDate < 86400)
    timeLeft = `${(newDate / 3600).toFixed(0)}h ago`;
  if (diffMonth == 0 && newDate >= 86400 && newDate <= 2592000)
    timeLeft = `${(newDate / 86400).toFixed(0)}d ago`;
  if (diffMonth > 0) timeLeft = `${current_month - parsed_month}month ago`;
  return timeLeft;
};

const reduceData = (address = "", startLen = 7, endLen = 7) => {
  return `${address.substring(0, startLen)}...${address.substring(
    address.length - endLen,
    address.length
  )}`;
};

export default reduceData;

export const formatMillionNumber = (num) => {

  if (!num || num === null || num === undefined) return 0;
  let formattedNumber;

  switch (true) {
    case num >= 1e12:
      formattedNumber = (num / 1e12).toFixed(2) + " T";
      break;
    case num >= 1e9:
      formattedNumber = (num / 1e9).toFixed(2) + " B";
      break;
    case num >= 1e6:
      formattedNumber = (num / 1e6).toFixed(2) + " M";
      break;
    case num >= 1e3:
      formattedNumber = (num / 1e3).toFixed(2) + " K";
      break;
    default:
      formattedNumber = Number(num).toFixed(2); // For numbers less than 1000, keep two decimal places  
      break;
  }
  return formattedNumber;
};
