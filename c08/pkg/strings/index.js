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

  return result;
};

// makeId(6) => return GHte21
// characters.charAt(Math.floor(Math.random() * charLength)); => random ni vrakja nekoj karakter od stringot characters
//charLength = 50
// 0 * 50
// 1 * 50
// characters.charAt(2) => B
// characters.charAt(4) => D
