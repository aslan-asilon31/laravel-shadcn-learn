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
export default function Create({auth}) {

      const { roles } = usePage().props;

    // define state with helper inertia
    const { data, setData, post,processing, errors } = useForm({
        name : '',
        email: '',
        selectedRoles : [],
        password: '',
        password_confirmation: ''
    });

    // define method handleSelectedroles
    const formattedRoles = roles.map(role => ({
        value: role.name,
        label: role.name
    }));
    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: `User  Create`,
                href: '/permissions/create',
            },
        ];

    // define method handleUpdateData
     const handleSelectedRoles = (selected) => {
        const selectedValues = selected.map(option => option.value);
        setData('selectedRoles', selectedValues);
    }

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route('users.store'), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Data created successfully!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission Create`} />
          <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                
                <Card title={'Create new user'}>
            <Container>
                    <form onSubmit={handleStoreData}>
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
                        <Select2 onChange={handleSelectedRoles} options={formattedRoles} placeholder="Pilih Role..." />
                            {/* {selectedOptions && selectedOptions.length > 0 && (
                                <div>
                                    <h4>Rasa yang Anda pilih:</h4>
                                    <ul>
                                        {selectedOptions.map((option) => (
                                            <li key={option.value}>{option.label}</li>
                                        ))}
                                    </ul>
                                </div>
                            )} */}
                        </div>
                        {/* <div className='mb-4'>
                            <div className={`p-4 rounded-t-lg border bg-white`}>
                                <div className='flex items-center gap-2 text-sm text-gray-700'>
                                    Roles
                                </div>
                            </div>
                            <div className='p-4 rounded-b-lg border border-t-0 bg-gray-100'>
                                <div className='flex flex-row flex-wrap gap-4'>
                                    {roles.map((role, i) => (
                                        <Checkbox label={role.name} value={role.name} onChange={handleSelectedRoles} key={i}/>
                                    ))}
                                </div>
                                {errors.selectedRoles && <div className='text-xs text-red-500 mt-4'>{errors.selectedRoles}</div>}
                            </div>
                        </div> */}
                        <div className='mb-4'>
                            <Input label={'Password'} type={'password'} value={data.password} onChange={e => setData('password', e.target.value)} errors={errors.password} placeholder="Input password user.."/>
                        </div>
                        <div className='mb-4'>
                            <Input label={'Password Confirmation'} type={'password'} value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} errors={errors.password_confirmation} placeholder="Input password confirmation..."/>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Button type={'submit'}  disabled={processing}/>
                            <Button type={'cancel'} url={route('users.index')}/>
                        </div>
                    </form>
            </Container>
                </Card>
            </div>
        </AppLayout>
    );
}
