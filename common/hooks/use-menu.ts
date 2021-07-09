import { useCallback, useState } from 'react';

export default function useMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return { anchorEl, open: anchorEl !== null, handleClick, onClose };
}
