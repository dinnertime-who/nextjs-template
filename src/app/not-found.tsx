import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type PageProps = {};

export default async function Page({}: PageProps) {
  return (
    <section className="flex flex-col gap-y-4 justify-center items-center h-screen">
      <div className="text-3xl font-bold">준비중입니다.</div>
      <Link href={'/'} className={cn(buttonVariants({ variant: 'default' }))}>
        메인화면으로 가기
      </Link>
    </section>
  );
}
