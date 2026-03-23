export function Container({ children, maxWidth = 'container', className = '' }) {
  const maxWidthClasses = {
    container: 'max-w-container',
    content: 'max-w-content',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  );
}
