import { useState } from 'react';

let count = 0;
const prefix = 'uid';

export default function useUniqueId() {
  const [uid] = useState(`${prefix}${count++}`);
  return uid;
}
