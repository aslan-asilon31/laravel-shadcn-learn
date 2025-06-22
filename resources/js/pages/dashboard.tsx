import React from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head } from '@inertiajs/react';
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Dashboard`,
            href: '/dashboard',
        },
    ];
    const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    // Update jam setiap detik
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Hari, Tanggal, Jam
  const hariTanggal = date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const jam = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Dashboard ${user ? user.name : "User"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle> Selamat Datang {user ? user.name : "User"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <p>{hariTanggal}, {jam}</p>
                        </CardContent>
                       
                        </Card>
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
