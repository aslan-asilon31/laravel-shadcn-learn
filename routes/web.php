<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\Pages\KaPmb\SetupPmbController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware('auth')->prefix('dashboard')->group(function () {

    Route::prefix('kapmb')->name('kapmb.')->group(function () {
        Route::get('/setup-pmb', [SetupPmbController::class, 'index'])->name('setup-pmb.index');
    });
    // permissions route
    Route::resource('/permissions', PermissionController::class);
     // roles route
    Route::resource('roles', RoleController::class)->except('show');
    Route::resource('/users', UserController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
