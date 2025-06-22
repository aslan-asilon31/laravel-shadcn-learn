import Container from '@/components/container';
import Button from '@/components/button';
import AppLayout from '@/layouts/app-layout';
import { usePage, Head ,useForm} from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import Input from '@/components/input';
import Checkbox from "@/components/checkbox";
import Swal from 'sweetalert2';
import {
  Card,
} from "@/components/ui/card"
export default function Create() {

     const { permissions } = usePage().props;

    // define state with helper inertia
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        selectedPermissions: [],
    });
    const breadcrumbs: BreadcrumbItem[] = [
            {
                title: `Roles > Create`,
                href: '/permissions/create',
            },
        ];

    // define method handleUpdateData
    const handleSelectedPermissions = (e) => {
        let items = data.selectedPermissions;

        items.push(e.target.value);

        setData("selectedPermissions", items);
    };

    // define method handleStoreData
    const handleStoreData = async (e) => {
        e.preventDefault();

        post(route("roles.store"), {
            onSuccess: () => {
                Swal.fire({
                    title: "Success!",
                    text: "Data created successfully!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            },
        });
    };
  
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Permission Create`} />
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
                    <form onSubmit={handleStoreData}>
                        <div className="mb-4">
                            <Input
                                label={"Role Name"}
                                type={"text"}
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                errors={errors.name}
                                placeholder="Input role name.."
                            />
                        </div>
                        <div className="mb-4">
                            {/* <div className={`p-4 rounded-t-lg border bg-white`}>
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                    Permissions
                                </div>
                            </div> */}
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(permissions).map(
                                    ([group, permissionItems], i) => (
                                        <div
                                            key={i}
                                            className="p-4 bg-white rounded-lg shadow-md"
                                        >
                                            <h3 className="font-bold text-lg mb-2">
                                                {group}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {permissionItems.map(
                                                    (permission) => (
                                                        <Checkbox
                                                            label={permission}
                                                            value={permission}
                                                            onChange={
                                                                handleSelectedPermissions
                                                            }
                                                            key={permission}
                                                        />
                                                    )
                                                )}
                                            </div>
                                            {errors?.selectedPermissions && (
                                                <div className="text-xs text-red-500 mt-4">
                                                    {errors.selectedPermissions}
                                                </div>
                                            )}
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button type={"submit"} disabled={processing} />
                            <Button
                                type={"cancel"}
                                url={route("roles.index")}
                            />
                        </div>
                    </form>
            </Container>
            </Card>
            </div>
        </AppLayout>
    );
}
