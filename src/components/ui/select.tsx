
import React from 'react';

// Fix: Update Select to accept and merge className prop.
const Select = ({ children, className, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
        <select
            className={`h-9 w-full appearance-none rounded-md border border-input bg-transparent pl-3 pr-8 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
            {...props}
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.516 7.548c.436-.446 1.144-.446 1.58 0L10 10.405l2.904-2.857c.436-.446 1.144-.446 1.58 0 .436.446.436 1.17 0 1.615l-3.694 3.63c-.436.446-1.144.446-1.58 0L5.516 9.163c-.436-.446-.436-1.17 0-1.615z"/></svg>
        </div>
    </div>
);

// Fix: Improve prop typing to accept all valid option attributes.
const SelectItem = ({ value, children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => (
  <option value={value} {...props}>{children}</option>
);

// Fix: Remove misleading exports that are not compatible with a native select element.
// The Select component should be used with SelectItem as direct children.
// The other components are kept for compatibility with imports but are not intended for use.
const SelectValue = () => null;
const SelectTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;


export { Select, SelectValue, SelectTrigger, SelectContent, SelectItem };