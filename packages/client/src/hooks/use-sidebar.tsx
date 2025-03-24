
import { useState, useEffect } from 'react';

export function useSidebar(initialWidth = 280) {
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);
  
  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarWidth(customEvent.detail.width);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);
  
  return sidebarWidth;
}
