// a fluid container component with padding varies by viewport size
// specifically to wrap text content (to not flush against the edges)
import React from 'react';
import { cn } from '@/lib/utils';

type ReadableProps = {
  isFlush?: boolean;
  isCenter?: boolean;
  className?: string,
  children: React.ReactNode; // Add the 'children' property to the type declaration
};

export function Container ({
  children,
  className = '',
  isCenter: isCentered = false, 
  isFlush = false,
}: ReadableProps): React.ReactNode {
  const containerClasses = cn({
    // x-padding for full-width container
    'px-6 md:px-8 lg:px-12': true,
    // gap between columns, equal x-padding
    'gap-x-6 md:gap-x-8 lg:gap-x-12': true, 
    // no padding for flush container
    'px-0 md:px-0 lg:px-0': isFlush, 
    // for center container
    'container mx-auto': isCentered,
  }, className);

  return (
    <div className={containerClasses}>
      {children}
    </div>
  );
}