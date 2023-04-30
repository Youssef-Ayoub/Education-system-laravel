<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/admin', function () {
    return view('admin/dashboard');
});

Route::get("login", [AuthController::class, "login"])->name('login');
Route::get("logout", [AuthController::class, "logout"]);
Route::post("login", [AuthController::class, "loginrequest"]);

Route::group(['prefix' => "admin/category", "middleware" => "admin"], function () {
    Route::get("/", [CategoryController::class, "index"]);
    Route::get("/create", [CategoryController::class, "create"]);
    Route::post("/store", [CategoryController::class, "store"]);
    Route::get("/delete/{id}", [CategoryController::class, "destroy"]);
    Route::get("/edit/{id}", [CategoryController::class, "edit"]);
    Route::post("/update", [CategoryController::class, "update"]);
});


Route::group(['prefix' => 'admin/course', "middleware" => "admin"], function () {
    Route::get("", [CourseController::class, "index"]);
    Route::get("/create", [CourseController::class, "create"]);
    Route::post("/store", [CourseController::class, "store"]);
    Route::get("/edit/{id}", [CourseController::class, "edit"]);
    Route::post("/update", [CourseController::class, "update"]);
    Route::get("/delete/{id}", [CourseController::class, "destroy"]);
});
