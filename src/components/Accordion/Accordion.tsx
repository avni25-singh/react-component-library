// Accordion.tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import './accordion.css';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string[];
  allowMultiple?: boolean;
}

export function Accordion({ 
  children, 
  defaultOpen = [], 
  allowMultiple = false 
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id); // Close it
      }
      return allowMultiple ? [...prev, id] : [id]; // Open it
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

// AccordionItem sub-component
export interface AccordionItemProps {
  id: string;
  title: string;
  children: ReactNode;
}

export function AccordionItem({ id, title, children }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');
  
  const { openItems, toggleItem } = context;
  const isOpen = openItems.includes(id);

  return (
    <div className="accordion-item" data-state={isOpen ? 'open' : 'closed'}>
      <button
        id={`trigger-${id}`}
        type="button"
        className="accordion-trigger"
        onClick={() => toggleItem(id)}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
      >
        <span className="accordion-trigger-title">{title}</span>
        <span className="accordion-chevron" aria-hidden="true" />
      </button>
      {isOpen && (
        <div 
          id={`panel-${id}`} 
          className="accordion-panel"
          role="region"
          aria-labelledby={`trigger-${id}`}
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      )}
    </div>
  );
}
