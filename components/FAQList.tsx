import { type PortableTextBlock } from 'next-sanity';
import DateComponent from '@/components/Date';
import PortableText from '@/components/PortableText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type { FaqsQueryResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/fetch';
import { faqsQuery } from '@/sanity/lib/queries';

export default async function FAQList({
  className = '',
}: {
  className?: string;
}) {
  const faqs = await sanityFetch<FaqsQueryResult>({
    query: faqsQuery,
  });

  return (
    <div className={className}>
      <Accordion type="single" collapsible>
        {faqs?.map((faq) => {
          const {
            _id, question, answer, publishedAt,
          } = faq;
          
          return (
            <AccordionItem key={_id} value={_id}>
              <AccordionTrigger>
                <h3 className="py-4 text-balance tracking-tight leading-tight text-xl xl:text-3xl lg:font-bold">
                  {question}
                </h3>
              </AccordionTrigger>
              {answer && answer?.length && (
                <AccordionContent>
                  <PortableText
                    value={answer as PortableTextBlock[]}
                    className="text-pretty"
                  />
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}