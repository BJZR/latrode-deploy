const seal = async (tok, pin) => {
  const s = crypto.getRandomValues(new Uint8Array(16)),
    i = crypto.getRandomValues(new Uint8Array(12));
  return {
    s: b64(s),
    i: b64(i),
    c: b64(
      new Uint8Array(
        await crypto.subtle.encrypt(
          { name: "AES-GCM", iv: i },
          await dk(pin, s),
          enc.encode(tok),
        ),
      ),
    ),
  };
};
