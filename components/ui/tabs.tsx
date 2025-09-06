
import React from 'react';

interface TabsContextProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextProps | null>(null);

const useTabs = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a Tabs component');
  }
  return context;
};

// Fix: Correctly type props to include HTMLAttributes for the underlying div element.
const Tabs = ({ value, onValueChange, children, className, ...props }: { value: string; onValueChange: (value: string) => void; children: React.ReactNode; className?: string; } & React.HTMLAttributes<HTMLDivElement>) => (
  <TabsContext.Provider value={{ value, onValueChange }}>
    <div className={className} {...props}>{children}</div>
  </TabsContext.Provider>
);

const TabsList = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className || ''}`}
    {...props}
  />
);

const TabsTrigger = ({ value, className, children, ...props }: { value: string; } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { value: activeValue, onValueChange } = useTabs();
  const isActive = activeValue === value;
  return (
    <button
      onClick={() => onValueChange(value)}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive ? 'bg-background text-foreground shadow' : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};


// Fix: Correctly type props to include HTMLAttributes for the underlying div element.
const TabsContent = ({ value, children, ...props }: { value: string; children: React.ReactNode; } & React.HTMLAttributes<HTMLDivElement>) => {
  const { value: activeValue } = useTabs();
  return activeValue === value ? <div className="mt-2" {...props}>{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };