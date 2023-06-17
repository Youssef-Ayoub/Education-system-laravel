<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Courses extends Controller
{
    public function index()
    {
        $data = DB::table("courses")->get();
        return response()->json(["status" => "200", "data" => $data]);
    }

    public function show($id)
    {
        $data = DB::table("courses")->find($id);
        return response()->json($data);
    }

    public function store(Request $request)
    {
        DB::table("courses")->insert($request->all());
        return response()->json(["status" => "201", "message" => "inserted successfully"]);
    }

    public function delete($id)
    {
        DB::table("courses")->delete($id);
        return response()->json(["status" => "202", "message" => "deleted successfully"]);
    }

    public function update(Request $request)
    {
        DB::table("courses")->where("id", $request->id)->update($request->except("id"));
        return response()->json(["status" => "203", "message" => "updated successfully"]);
    }
}
