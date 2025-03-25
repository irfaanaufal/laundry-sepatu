<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['admin', 'customer','courier'];
        $users = [
            [
                'name' => 'Admin',
                'phone' => '08888',
                'email' => 'admin.sepatu-laundry@gmail.com',
                'role' => 'admin'
            ],
            [
                'name' => 'Customer',
                'phone' => '08881',
                'email' => 'customer.sepatu-laundry@gmail.com',
                'role' => 'customer'
            ],
            [
                'name' => 'Courier',
                'phone' => '08882',
                'email' => 'courier.sepatu-laundry@gmail.com',
                'role' => 'courier'
            ]
        ];
        foreach ($roles as $role) {
            Role::create([
                'name' => $role
            ]);
        }
        foreach ($users as $user) {
            $u = User::create([
                'name' => $user['name'],
                'phone' => $user['phone'],
                'email' => $user['email'],
                'password' => Hash::make('password')
            ]);
            $u->assignRole($user['role']);
        }
    }
}
