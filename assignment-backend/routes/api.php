<?php

use App\Http\Controllers\MenuController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'menu'], function () {
    Route::get('list', [MenuController::class, 'index']);
    Route::get('show', [MenuController::class, 'show']);
    Route::post('create', [MenuController::class, 'store']);
    Route::post('update', [MenuController::class, 'update']);
    Route::put('delete/{menu_id}', [MenuController::class, 'destroy']);
});