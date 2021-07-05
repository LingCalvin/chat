import { useEffect } from 'react';

export default function useRemoveServerSideCSS() {
  useEffect(() => {
    const jss = document.querySelector('#jss-server-side');
    jss?.remove();
  }, []);
}
