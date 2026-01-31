interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  action?: React.ReactNode;
}

export function PageWrapper({ children, title, action }: PageWrapperProps) {
  return (
    <div className="container mx-auto py-10 px-4">
      {(title || action) && (
        <div className="flex items-center justify-between mb-8">
          {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}