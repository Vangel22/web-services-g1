const makeId = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength)); // brojkata koja ke se izbere random na sekoja iteracija ke bide od stringot characters
    // Math.floor -> 1.5 -> 1 ako imame 2.4 -> 2 => ni vrakja cel broj
    // Math.random ni dava broj
  }

  // charAt -> go zema indeksot na karakterot od characters
  // Math.random * charLenght  -> zema broj od 0 do 62 spored dolzinata na stringot characters. Pr. 0.2 * 62 = 12.4
  // Math.floor -> ke go zema 12 namesto 13. Ako bese Math.ceil ke go zemese 13

  return result;
};

// makeId(6) => return GHte21
// characters.charAt(Math.floor(Math.random() * charLength)); => random ni vrakja nekoj karakter od stringot characters
//charLength = 50
// 0 * 50
// 1 * 50
// characters.charAt(2) => B
// characters.charAt(4) => D
module.exports = makeId;
