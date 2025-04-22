<?php

use App\Http\Controllers\FeatureController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VariantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::controller(MenuController::class)->group(function() {
        Route::get('menu/get', 'get')->name('menu.get');
    });

    Route::controller(UserController::class)->group(function() {
        Route::get('user/get', 'get')->name('user.get');

        Route::get('user/list', 'index')->name('user.index');
        Route::get('user/create', 'create')->name('user.create');
        Route::get('user/edit/{user}', 'edit')->name('user.edit');

        Route::post('user/store', 'store')->name('user.store');
        Route::patch('user/update/{user}', 'update')->name('user.update');
    });

    Route::controller(FeatureController::class)->group(function() {
        Route::get('feature/get', 'get')->name('feature.get');

        Route::get('feature/list', 'index')->name('feature.index');
        Route::get('feature/create', 'create')->name('feature.create');
        Route::get('feature/edit/{feature}', 'edit')->name('feature.edit');

        Route::get('feature/{feature}/variant/create', 'variant_create')->name('feature.variant.create');
        Route::get('feature/{feature}/variant/{variant}/edit', 'variant_edit')->name('feature.variant.edit');


        Route::post('feature/store', 'store')->name('feature.store');
        Route::patch('feature/update/{feature}', 'update')->name('feature.update');

        Route::post('feature/{feature}/variant/store', 'variant_store')->name('feature.variant.store');
        Route::patch('feature/{feature}/variant/{variant}/update', 'variant_update')->name('feature.variant.update');
    });

    Route::controller(VariantController::class)->group(function() {
        Route::get('feature/{feature}/variant', 'get')->name('feature.variants');
        Route::get('feature/{feature}/variant/{variant}', 'getId')->name('feature.variant');
    });

    Route::controller(OrderController::class)->group(function() {
        Route::get('order/list', 'index')->name('order.index');
    });

    Route::controller(MenuController::class)->group(function() {
        Route::get('menu/list', 'index')->name('menu.index');
    });

    Route::controller(RoleController::class)->group(function() {
        Route::get('role/list', 'get')->name('role.get');
    });


    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
