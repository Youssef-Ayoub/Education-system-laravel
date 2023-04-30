<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login()
    {
        return view("login");
    }

    public function loginrequest(Request $request)
    {
        if (Auth::attempt($request->except("_token"), true)) {
            return redirect('/admin');
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect("login");
    }
}
