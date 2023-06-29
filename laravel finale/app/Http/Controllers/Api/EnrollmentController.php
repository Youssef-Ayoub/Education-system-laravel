<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseRequest;
use App\Http\Requests\EnrollRequest;
use App\Http\Requests\StudentRequest;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $existingEnrollment = DB::table('course_user')
            ->where('user_id', $request->user_id)
            ->where('course_id', $request->course_id)
            ->first();

        if ($existingEnrollment) {
            return response()->json([
                'message' => 'Already Enrolled.',
            ]);
        } else {
            $user = User::find($request->user_id);
            $course = Course::find($request->course_id);

            $user->courses()->attach($course);

            return response()->json([
                'message' => 'Enrollment successful.',
            ]);
        }
    }

    public function showStudentCourses(StudentRequest $request)
    {
        $user = User::find($request->user_id);
        $courses = $user->courses()->get();
        return response()->json($courses);
    }

    public function showCourseStudentsNumber(CourseRequest $request)
    {
        $course = Course::find($request->course_id);
        $users = $course->users()->count();
        return response()->json($users);
    }
}
