import React from 'react';
import Container from '@/components/container';
import Table from '@/components/table';
import Button from '@/components/button';
import Pagination from '@/components/pagination';
import Search from '@/components/search';
import useHasAnyPermission from '@/utils/permission';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { usePage, Head } from '@inertiajs/react';
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
export default function Index() {
    const { users, filters,auth } = usePage().props;
    const user = auth?.user;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `User`,
            href: '/dashboard/users',
        },
    ];
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission ${user ? user.name : "User"}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                    <Card>
                        <CardHeader>
                            <CardTitle> Selamat Datang {user ? user.name : "User"}</CardTitle>
                        </CardHeader>
                       
                       
                    </Card>
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                    <Container>
                            <div className="mb-4 flex items-center justify-between gap-4">
                                {useHasAnyPermission(["users create"]) && (
                                    <Button type={"add"} url={route("users.create")} />
                                )}
                                <div className="w-full md:w-4/6">
                                    <Search
                                        url={route("users.index")}
                                        placeholder={"Search users data by name..."}
                                        filter={filters}
                                    />
                                </div>
                            </div>
                            <Table.Card title={"users"}>
                                <Table>
                                    <Table.Thead>
                                        <tr>
                                            <Table.Th>#</Table.Th>
                                            <Table.Th>User</Table.Th>
                                            <Table.Th>Roles</Table.Th>
                                            <Table.Th>Action</Table.Th>
                                        </tr>
                                    </Table.Thead>
                                    <Table.Tbody>
                                        {users.data.map((user, i) => (
                                            <tr key={i}>
                                                <Table.Td>
                                                    {++i +
                                                        (users.current_page - 1) *
                                                            users.per_page}
                                                </Table.Td>
                                                <Table.Td>
                                                    {user.name}
                                                    <div className="text-sm text-gray-400">
                                                        {user.email}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {user.roles.map((role, i) => (
                                                            <span
                                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-sky-100 text-sky-700"
                                                                key={i}
                                                            >
                                                                {role.name}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </Table.Td>
                                                <Table.Td>
                                                    <div className="flex items-center gap-2">
                                                        {useHasAnyPermission([
                                                            "users edit",
                                                        ]) && (
                                                            <Button
                                                                type={"edit"}
                                                                url={route(
                                                                    "users.edit",
                                                                    user.id
                                                                )}
                                                            />
                                                        )}
                                                        {useHasAnyPermission([
                                                            "users delete",
                                                        ]) && (
                                                            <Button
                                                                type={"delete"}
                                                                url={route(
                                                                    "users.destroy",
                                                                    user.id
                                                                )}
                                                            />
                                                        )}
                                                    </div>
                                                </Table.Td>
                                            </tr>
                                        ))}
                                    </Table.Tbody>
                                </Table>
                            </Table.Card>
                            <div className="flex items-center justify-center">
                                {users.last_page !== 1 && (
                                    <Pagination links={users.links} />
                                )}
                            </div>
                        </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
