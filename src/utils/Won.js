// 천의 자리마다 쉼표 찍기
export function numberWithCommas(number) {
  const reversedNumberString = number?.toString().split("").reverse().join("");
  let result = "";

  for (let i = 0; i < reversedNumberString?.length; i++) {
    result += reversedNumberString[i];

    if ((i + 1) % 3 === 0 && i !== reversedNumberString?.length - 1) {
      result += ",";
    }
  }

  return result.split("").reverse().join("");
}