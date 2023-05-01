<?php

namespace App\Http\Controllers;

use App\Models\course;
use App\Models\User;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $courses = course::all();
        return view("admin/course/index", compact("courses"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin/course/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = DB::table('users')->where('name', 'mostafa mady')->first();

        $category = DB::table('categories')->where('name', 'laravel')->first();
        $course = course::create([
            'name' => "$request->name",
            'description' => "$request->description",
            'cover' => "$request->cover",
            'user_id' => "$user->id",
            'category_id' => $category->id
        ]);
        return redirect("admin/course");
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $course = course::find($id);
        $user = DB::table('users')->where('id', $course->user_id)->first();
        $category = DB::table('categories')->where('id', $course->category_id)->first();

        return view('admin/course/edit', compact("course", "user", "category"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $course = course::find($request->id);
        $user = DB::table('users')->where('name', $request->user_name)->first();
        $category = DB::table('categories')->where('name', $request->category_name)->first();
        $course->user_id = $user->id;
        $course->category_id = $category->id;
        $course->update($request->except(["_token", "id", "user_id", "category_id"]));
        return redirect('admin/course');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $course = course::find($id);
        $course->delete();
        return redirect('admin/course');
    }
}
