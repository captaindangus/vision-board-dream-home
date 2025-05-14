
import { useRef, useEffect } from 'react';

/**
 * Hook for managing drag images
 * Handles creation and cleanup of drag image elements
 */
export function useDragImage() {
  const dragImageRef = useRef<HTMLElement | null>(null);
  
  // Create a drag image from an element
  const createDragImage = (element: HTMLElement, clientX: number, clientY: number, offsetX: number, offsetY: number) => {
    // Clean up any existing drag image first
    removeDragImage();
    
    // Clone the element for the drag image
    const dragElement = element.cloneNode(true) as HTMLElement;
    dragElement.style.width = `${element.offsetWidth}px`;
    dragElement.style.height = `${element.offsetHeight}px`;
    dragElement.style.opacity = '0.8';
    dragElement.style.position = 'fixed';
    dragElement.style.pointerEvents = 'none';
    dragElement.style.zIndex = '9999';
    dragElement.style.transform = `translate(${clientX - offsetX}px, ${clientY - offsetY}px)`;
    dragElement.id = 'drag-image';
    
    // Add to DOM
    document.body.appendChild(dragElement);
    dragImageRef.current = dragElement;
    
    return dragElement;
  };

  // Update drag image position
  const updateDragImagePosition = (clientX: number, clientY: number, offsetX: number, offsetY: number) => {
    if (dragImageRef.current) {
      dragImageRef.current.style.transform = `translate(${clientX - offsetX}px, ${clientY - offsetY}px)`;
    }
  };
  
  // Remove drag image
  const removeDragImage = () => {
    if (dragImageRef.current) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
  };
  
  // Clean up drag image on unmount
  useEffect(() => {
    return () => {
      removeDragImage();
    };
  }, []);
  
  return {
    dragImageRef,
    createDragImage,
    updateDragImagePosition,
    removeDragImage
  };
}
