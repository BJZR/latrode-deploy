const unseal = async (v, pin) =>
  dec.decode(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: u8(v.i) },
      await dk(pin, u8(v.s)),
      u8(v.c),
    ),
  );
