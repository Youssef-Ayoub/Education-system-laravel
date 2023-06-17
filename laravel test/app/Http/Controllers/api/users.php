<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class users extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt($request->only(["email", "password"]))) {
            $token = auth()->user()->createToken("token")->accessToken;
            return response()->json(["token" => $token]);
        }
    }
}
