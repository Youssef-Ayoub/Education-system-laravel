<?php

use App\Http\Controllers\home;
use App\Http\Controllers\user;
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

Route::group(["middleware" => "auth"], function () {
    Route::get('/display', [home::class, "display"])->name("home");

    Route::get('about-us', [home::class, "create"])->name("about me")->middleware("admin");

    Route::post('store', [home::class, "store"]);

    Route::get('/delete/{id}', [home::class, "delete"]);

    Route::get('/edit/{id}', [home::class, "edit"]);

    Route::post('/update', [home::class, "update"]);

    Route::view('contact-us', 'pages.contactme', [
        'the_id' => 50
    ])->name("contact us");
});

Route::get("/login", [user::class, "login"])->name("login");

Route::post("/loginrequest", [user::class, "loginrequest"]);

Route::get("/logout", [user::class, "logout"]);



// Route::get('contact/{id}', function ($id = 50) {
//     $arr = [
//         '1' => 'Books',
//         '2' => 'Games',
//         '3' => 'Programming'
//     ];
//     return view('pages.contactme', [
//         'the_id' => $arr[$id] ?? "there is no content with this id "
//     ]);
// });