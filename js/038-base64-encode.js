const b64 = (u) => {
  let s = "";
  for (let i = 0; i < u.length; i += 8192)
    s += String.fromCharCode.apply(null, u.subarray(i, i + 8192));
  return btoa(s);
};
