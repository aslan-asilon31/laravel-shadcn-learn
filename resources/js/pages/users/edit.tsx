import React from 'react';
import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head ,useForm} from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Select2 from "@/components/select2";


import Swal from 'sweetalert2';
import {
  Card,
} from "@/components/ui/card"
export default function Edit({auth}) {
      const { user, roles } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors } = useForm({
        name : user.name,
        email: user.email,
        selectedRoles : user.roles.map(role => role.name),
        filterRole : user.roles.map(role => ({
            value: role.name,
            label: role.name
        })),
        _method: 'put'
    });

    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
    }));



    // define method handleSelectedroles
    const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
    }

    // define method handleUpdateData
    const handleUpdateData = async (e) => {
        e.preventDefault();

        post(route('users.update', user.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data updated successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }

    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: `Roles Edit`,
                href: '/roles/edit',
            },
        ];

   
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission Edit`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-1">
                   
                    {/* <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div> */}
                </div>
                <Card>
                      <Container>
                    <form onSubmit={handleUpdateData}>
                        <div className='mb-4'>
                            <Input label={'Name'} type={'text'} value={data.name} onChange={e => setData('name', e.target.value)} errors={errors.name} placeholder="Input name user.."/>
                        </div>
                        <div className='mb-4'>
                            <Input label={'Email'} type={'email'} value={data.email} onChange={e => setData('email', e.target.value)} errors={errors.email} placeholder="Input email user.."/>
                        </div>
                          <div className='mb-4'>
                            <div className='flex items-center gap-2 text-sm text-gray-700'>
                                        Roles
                            </div>
                            <Select2 onChange={handleSelectedRoles}  defaultOptions={data.filterRole} options={formattedRoles}  placeholder="Pilih Role..." />
                        </div>
                       
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'} />
                            <Button type={'cancel'} url={route('users.index')}/>
                        </div>
                    </form>
            </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
