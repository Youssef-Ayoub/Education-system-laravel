<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CourseController extends Controller
{
    public function index()
    {

        $feedback = Course::leftJoin('comments', 'courses.id', '=', 'comments.course_id')
            ->leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
            ->leftJoin('users', 'course_user.user_id', '=', 'users.id')
            ->join('categories', 'courses.category_id', '=', 'categories.id')
            ->select(
                'courses.id',
                'courses.name',
                'courses.description',
                'courses.cover',
                'courses.instructor_name',
                'categories.id as category_id',
                'categories.name as category_name',
                DB::raw('count(distinct users.id) as user_count'),
                DB::raw('count(case when comments.sentiment = "1" then 1 end) as positive_count'),
                DB::raw('count(case when comments.sentiment = "0" then 1 end) as neutral_count'),
                DB::raw('count(case when comments.sentiment = "-1" then 1 end) as negative_count')
            )
            ->groupBy('courses.id', 'courses.name', 'courses.description', 'courses.cover', 'courses.instructor_name', 'categories.id', 'categories.name')
            ->get();

        return response()->json($feedback);
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
                'instructor_name' => $request->instructor_name
            ]);
        } else {
            $category = Category::create(['name' => $request->category]);
            $course = Course::create([
                'name' => $request->name,
                'description' => $request->description,
                'cover' => $request->cover,
                'category_id' => $category->id,
                'instructor_name' => $request->instructor_name
            ]);
        }

        $user = User::find($request->user_id);
        $user->courses()->attach($course);
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
        $feedback = Course::where('courses.id', '=', $id)
            ->leftJoin('comments', 'courses.id', '=', 'comments.course_id')
            ->leftJoin('course_user', 'courses.id', '=', 'course_user.course_id')
            ->leftJoin('users', 'course_user.user_id', '=', 'users.id')
            ->join('categories', 'courses.category_id', '=', 'categories.id')
            ->select(
                'courses.id',
                'courses.name',
                'courses.description',
                'courses.cover',
                'courses.instructor_name',
                'categories.id as category_id',
                'categories.name as category_name',
                DB::raw('count(distinct users.id) as user_count'),
                DB::raw('count(case when comments.sentiment = "1" then 1 end) as positive_count'),
                DB::raw('count(case when comments.sentiment = "0" then 1 end) as neutral_count'),
                DB::raw('count(case when comments.sentiment = "-1" then 1 end) as negative_count')
            )
            ->groupBy('courses.id', 'courses.name', 'courses.description', 'courses.cover', 'courses.instructor_name', 'categories.id', 'categories.name')
            ->get();

        return response()->json($feedback);
    }
}
