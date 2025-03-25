<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class MenusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'Dashboard',
                'url' => 'dashboard',
                'icon' => 'fa-solid fa-gauge-high',
                'method' => 'get',
                'permissions' => 'admin,pelanggan,kurir'
            ],
            [
                'name' => 'User',
                'url' => 'user.index',
                'icon' => 'fa-solid fa-users',
                'method' => 'get',
                'permissions' => 'admin',
            ],
            [
                'name' => 'Feature',
                'url' => 'feature.index',
                'icon' => 'fa-solid fa-box-open',
                'method' => 'get',
                'permissions' => 'admin'
            ],
            [
                'name' => 'Order',
                'url' => 'order.index',
                'icon' => 'fa-solid fa-cart-shopping',
                'method' => 'get',
                'permissions' => 'admin,pelanggan,kurir'
            ],
            [
                'name' => 'Menu',
                'url' => 'menu.index',
                'icon' => 'fa-solid fa-list',
                'method' => 'get',
                'permissions' => 'admin',
            ]
        ];
        foreach ($menus as $menu) {
            Menu::create([
                'name' => $menu['name'],
                'slug' => Str::slug($menu['name']),
                'url' => $menu['url'],
                'icon' => $menu['icon'],
                'method' => $menu['method'],
                'permissions' => $menu['permissions']
            ]);
        }
    }
}
