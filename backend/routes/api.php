<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TodoController;
use App\Http\Controllers\Api\AdminController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('todos', TodoController::class)
    ->only([
        'index',
        'store',
        'update',
        'destroy',
    ])->middleware('auth:sanctum');

Route::apiResource('admin/users', AdminController::class)
    ->only([
        'index',
        'store',
        'update',
        'destroy',
    ])
    ->middleware(['auth:sanctum', 'admin']);