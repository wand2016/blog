import { createHash } from 'crypto';

export const hash = (str: string) => {
  const hash = createHash('sha256');
  hash.update(str);
  return hash.digest('hex');
};
