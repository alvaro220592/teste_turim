<?php

use App\Http\Controllers\PersonController;
use App\Http\Controllers\ViewController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ViewController::class, 'index']);
Route::apiResource('people', PersonController::class);