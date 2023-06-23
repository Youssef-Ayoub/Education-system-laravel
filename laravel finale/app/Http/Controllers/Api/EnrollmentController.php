<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\EnrollRequest;
use App\Http\Requests\StudentRequest;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function showCourseStudents(CourseRequest $request)
    {
        $course = Course::find($request->course_id);
        $users = $course->users()->get();
        return response()->json($users);
    }

    public function enroll(EnrollRequest $request)
    {
        $user = User::find($request->user_id);
        $course = Course::find($request->course_id);

        $user->courses()->attach($course);

        return response()->json([
            'message' => 'Enrollment successful.',
        ]);
    }

    public function showStudentCourses(StudentRequest $request)
    {
        $user = User::find($request->user_id);
        $courses = $user->courses()->get();
        return response()->json($courses);
    }
}
