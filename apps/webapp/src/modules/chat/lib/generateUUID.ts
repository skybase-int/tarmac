// TODO: Remove this if we no longer need to generate a UUID
export function generateUUID(): string {
  // Explicitly constructing the string before replacing
  const template = '10000000-1000-4000-8000-100000000000';
  return template.replace(/[018]/g, c =>
    (parseInt(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (parseInt(c) / 4)))).toString(16)
  );
}
