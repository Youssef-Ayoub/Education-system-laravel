<?php

use App\Http\Controllers\api\Courses;
use App\Http\Controllers\api\users;
use Illuminate\Http\Request;
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

Route::group(['middleware' => 'auth:api'], function () {
    Route::get("courses", [Courses::class, "index"]);
    Route::get("courses/{id}", [Courses::class, "show"]);
    Route::post("courses", [Courses::class, "store"]);
    Route::delete("courses/{id}", [Courses::class, "delete"]);
    Route::put("courses/{id}", [Courses::class, "update"]);
});


Route::post("login", [users::class, "login"]);
