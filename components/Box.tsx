import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  divider?: string;
  children?: React.ReactNode;
};

function Box ({
  className = '',
  divider = '',
  children,
  ...props
}: Props) {
  const borders = divider.split('');
  const classes = cn(
    borders.map((b) => `border-${b}`).join(' '),
    className,
  );
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Box;
