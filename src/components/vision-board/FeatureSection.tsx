
import React, { ReactNode } from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface FeatureSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function FeatureSection({ title, children, defaultOpen = false }: FeatureSectionProps) {
  // Use the value prop to set the default open state
  const value = defaultOpen ? title : undefined;
  
  return (
    <Accordion type="single" collapsible defaultValue={value} className="w-full">
      <AccordionItem value={title} className="border-0">
        <AccordionTrigger className="py-2 px-0">
          <h2 className="text-[rgba(12,15,36,1)] text-base font-medium">
            {title}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="pt-1 pb-2">
          <div className="w-full">
            {children}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
