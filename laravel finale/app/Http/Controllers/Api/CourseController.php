<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::withCount('users')->get();
        return response()->json($courses);
    }

    public function store(StoreCourseRequest $request)
    {
        $request->validated($request->all());

        $categoryId = Category::where('name', $request->category)->pluck('id')->first();

        if ($categoryId) {
            $course = Course::create([
                'name' => $request->name,
                'description' => $request->description,
                'cover' => $request->cover,
                'category_id' => $categoryId,
            ]);
        } else {
            $category = Category::create(['name' => $request->category]);
            $course = Course::create([
                'name' => $request->name,
                'description' => $request->description,
                'cover' => $request->cover,
                'category_id' => $category->id,
            ]);
        }

        return response()->json($course);
    }

    public function delete($id)
    {
        $course = Course::find($id)->delete();
        if ($course) {
            return response()->json(['msg' => 'successfully deleted the record']);
        } else {
            return response()->json(['msg' => 'Error occured']);
        }
    }

    public function update(UpdateCourseRequest $request)
    {
        $course = Course::find($request->id);
        if (!$course) {
            return response()->json(['error' => 'Course not found']);
        }

        $categoryId = Category::where('name', $request->category)->pluck('id')->first();

        if ($categoryId) {
            $course->update([
                'name' => $request->name,
                'description' => $request->description,
                'cover' => $request->cover,
                'category_id' => $categoryId,
            ]);
        } else {
            $category = Category::create(['name' => $request->category]);
            $course->update([
                'name' => $request->name,
                'description' => $request->description,
                'cover' => $request->cover,
                'category_id' => $category->id,
            ]);
        }

        return response()->json(['message' => 'Course updated successfully', 'data' => $course]);
    }

    public function show($id)
    {
        $course = Course::find($id);
        return response()->json($course);
    }
}
