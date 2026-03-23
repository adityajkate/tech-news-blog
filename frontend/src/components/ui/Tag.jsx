export function Tag({ children, variant = 'default', onClick, className = '' }) {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium transition-colors duration-200';

  const variantClasses = {
    default: 'bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary',
    interactive: 'bg-gray-100 dark:bg-gray-800 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent cursor-pointer',
  };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}
