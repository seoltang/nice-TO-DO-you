import React from 'react';
import { type DraggableStateSnapshot } from 'react-beautiful-dnd';

const preventDeleteAnimation = (
  style: React.CSSProperties | undefined,
  snapshot: DraggableStateSnapshot,
  isDeleted: boolean
) => {
  if (snapshot.isDropAnimating && isDeleted) {
    const { moveTo } = snapshot.dropAnimation!;
    return {
      ...style,
      transform: `translate(${moveTo.x}px, ${moveTo.y}px)`,
      transitionDuration: '0.000001s',
      visibility: 'hidden',
    } as React.CSSProperties;
  }
  return style;
};

export default preventDeleteAnimation;
