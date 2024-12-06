'use client';

import React, { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import {
  Group as IconCategory,
  Tags as IconTags,
  Newspaper as IconStory,
  FileText as IconFileText,
  // Loader as IconLoader,
} from 'lucide-react';
import {
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandDialog,
  CommandEmpty,
  // CommandShortcut,
} from '@/components/ui/command';
import { Progress } from '@/components/ui/progress';
import useSearchResults from '@/hooks/useSearchResults';
import { cn } from '@/lib/utils';

function ResultIcon (props: { type: string; [key: string]: any }) {
  const {
    type, ...restProps 
  } = props;
  switch (type) {
    case 'post':
      return <IconFileText {...restProps} />;
    case 'category':
      return <IconCategory {...restProps} />;
    case 'tag':
      return <IconTags {...restProps} />;
    case 'story':
      return <IconStory {...restProps} />;
    default:
      return null;
  }
}

export default function OmniSearch (props: {
  className?: string;
  children: React.ReactElement;
  // size same as text-* 
  [key: string]: any;
}) {
  const {
    className,
    children,
    // ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0); // fake progress
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {
    data : results = [],
    isLoading,
    // isValidating,
    // error,
  } = useSearchResults(searchTerm, {
    revalidateOnFocus: false,
  });

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    function down (e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // fake progress
  
  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      setIsVisible(true); // Make the progress bar visible
    } else {
      setProgress(100); // Animate the progress bar to 100

      // Use a timeout to simulate the animation duration
      setTimeout(() => {
        setIsVisible(false); // Fade away the progress bar
      }, 1000); // Adjust this value based on your actual animation duration
    }
  }, [isLoading]);

  // Group results by type
  // eslint-disable-next-line @stylistic/max-len
  const groupedResults = useMemo(() => results.reduce((acc: Record<string, any[]>, post) => {
    if (!acc[post._type]) {
      acc[post._type] = [];
    }
    acc[post._type].push(post);
    return acc;
  }, {}), [results]);
  
  // handle input change and debounce the search term
  function handleChange(val: string) {
    setSearchTerm(val);
    setProgress(0);
  }

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 200)
    , []);
  
  // Custom component that renders the passed element and attaches the onClick handler
  // eslint-disable-next-line @stylistic/max-len
  const Trigger = children && React.cloneElement(children, { onClick: () => setOpen(true) });

  const progressClasses = cn(
    'absolute h-0.5 top-0 left-0 w-full rounded-none',
    {
      'opacity-0 bg-transparent': !isVisible,
      'opacity-100': isVisible,
    }
  );
  
  return (
    <div className={className}>
      {Trigger}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput
          placeholder="Search for anything..."
          onValueChange={debouncedHandleChange}
        />
        <CommandList>
          {!searchTerm && (
            <CommandEmpty>
              Search and you shall find…
            </CommandEmpty>
          )}
          <Progress value={progress} className={progressClasses} />
          {searchTerm && <CommandEmpty>No results found.</CommandEmpty>}
          {Object.entries(groupedResults).map(([type, posts]) => (
            <CommandGroup key={type} heading={type.toUpperCase()}>
              {posts.map((post: any) => (
                <CommandItem
                  key={post._id}
                  value={`${type}/${post.slug}` || undefined}
                  className={cn('text-foreground')}
                  onSelect={(currentValue) => {
                    alert(`selected ${currentValue}`);
                  }}
                  // onClick={(currentValue) => {
                  //   alert(`selected ${currentValue}`);
                  // }}
                >
                  <ResultIcon
                    size={24}
                    type={post._type}
                    className={cn('mr-2')}
                  />
                  <span>
                    {post.title}
                  </span>
                  {/* <div>
                    {post.tags?.map((
                      tag: string,
                      index: number
                    ) => (
                      <Badge key={index} variant="outline">{tag}</Badge>
                    ))}
                  </div> */}
                  {/* <CommandShortcut>
                    <kbd className="animate-pulse font-normal">⌘{index}</kbd>
                  </CommandShortcut> */}
                </CommandItem>
              ))}
              <CommandSeparator />
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </div>
  );
}