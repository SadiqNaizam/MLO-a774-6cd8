import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming 'cn' utility for classnames

// It's better to define a type for icon names for type safety if you have a fixed set.
// For dynamic usage, string is fine, but runtime errors can occur if name is invalid.
export type IconName = keyof typeof LucideIcons;

interface CustomIconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  name,
  size = 24, // Default size
  className,
  ...props
}) => {
  console.log(`Rendering CustomIcon: ${name}`);
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) {
    console.warn(`CustomIcon: Icon "${name}" not found in lucide-react. Rendering null.`);
    // Fallback to a default icon or null if the icon name is invalid
    const FallbackIcon = LucideIcons['AlertCircle']; // Example fallback
    return <FallbackIcon size={size} className={cn('text-red-500', className)} {...props} />;
  }

  // The user journey mentioned "metallic accents" and "premium feel".
  // While this component itself isn't metallic, it should be easily styleable.
  // Default styling can be neutral, allowing page-specific styling via `className`.
  return (
    <IconComponent
      size={size}
      className={cn('text-gray-700 dark:text-gray-300', className)} // Basic default styling
      aria-label={`${name} icon`}
      {...props}
    />
  );
};

export default CustomIcon;