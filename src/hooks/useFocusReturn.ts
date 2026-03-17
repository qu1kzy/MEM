import { useEffect, useRef } from 'react';

export function useFocusReturn(active: boolean) {
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (active) {
      triggerRef.current = document.activeElement;
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [active]);
}
