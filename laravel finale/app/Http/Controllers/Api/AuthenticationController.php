<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticationController extends Controller
{
    public function Register(StoreUserRequest $request)
    {
        $request->validated($request->all());


        $user = User::create($request->except('id'));

        return response()->json([$user, $msg = "success"]);
    }

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->all());

        if (!Auth::attempt($request->only('email', 'password'))) {
              return response()->json(['status' => 'credentials does not match']);
         }
        $user = User::where('email', $request->email)->first();

        return response()->json(['status' => 'successfully logged in ', $user]);
    }
}
