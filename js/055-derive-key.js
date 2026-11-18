const dk = async (pin, salt) =>
  crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 250000, hash: "SHA-256" },
    await crypto.subtle.importKey("raw", enc.encode(pin), "PBKDF2", false, [
      "deriveKey",
    ]),
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
