<?php

use App\Models\User as ModelsUser;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

Route::get('/', function () {
    return view('welcome');
});


Route::get('/setup', function () {
    $credentials = [
        'email' => 'admin@admin.com',
        'password' => 'password'
    ];

    if (!Auth::attempt($credentials)) {
        $user = new User();

        $user->name = 'Admin';
        $user->email = $credentials['email'];
        $user->password = Hash::make($credentials['password']);
        $user->type = 2;
        $user->gender = 'male';

        $user->save();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();


            $adminToken = $user->createToken('adminToken', ['ALL']);
            $profToken = $user->createToken('profToken', ['create', 'update', 'delete']);
            $userToken = $user->createToken('userToken', ['view']);

            return [
                'admin' => $adminToken->plainTextToken,
                'professor' => $profToken->plainTextToken,
                'user' => $userToken->plainTextToken
            ];
        }
    }
});
