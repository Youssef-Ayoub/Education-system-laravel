<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeleteUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function update(UpdateUserRequest $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json(['error' => 'user not found']);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return response()->json(['message' => 'user updated successfully', 'data' => $user]);
    }

    public function delete(DeleteUserRequest $request)
    {
        $user = User::find($request->id)->delete();
        if ($user) {
            return response()->json(['msg' => 'successfully deleted the record']);
        } else {
            return response()->json(['msg' => 'Error occured']);
        }
    }
}
