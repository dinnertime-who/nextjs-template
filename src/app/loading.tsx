import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export default function Loading({
  className,
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div className={cn('w-full h-full grid place-items-center', className)}>
      <Loader2 className="animate-spin text-primary" size={size} />
    </div>
  );
}
