<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Permissions list sesuai middleware yang kamu contohkan
        $permissions = [
            'users index', 'users create', 'users edit', 'users delete',
            'roles index', 'roles create', 'roles edit', 'roles delete',
            'permissions index', 'permissions create', 'permissions edit', 'permissions delete',
        ];

        // Buat permissions
        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Buat role dan assign semua permission ke role admin
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $adminRole->syncPermissions(Permission::all());

        // Role user biasa
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'web']);

        // Buat 1 user admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('123456'),
            ]
        );
        $admin->assignRole($adminRole);

    }
}
