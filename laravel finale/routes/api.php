<?php

use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [AuthenticationController::class, 'register']);
Route::post('/login', [AuthenticationController::class, 'login']);


Route::group(['prefix' => 'courses'], function () {
    Route::get('', [CourseController::class, 'index']);
    Route::post('', [CourseController::class, 'store']);
    Route::delete('{id}', [CourseController::class, 'delete']);
    Route::put('{id}', [CourseController::class, 'update']);
    Route::get('{id}', [CourseController::class, 'show']);
});

Route::group(['prefix' => 'comments'], function () {
    Route::get('user/{user_id}', [CommentController::class, 'showByUser']);
    Route::post('',  [CommentController::class, 'store']);
    Route::get('course/{course_id}', [CommentController::class, 'showByCourse']);
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/{id}', [UserController::class, 'show']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'delete']);
});

Route::get('categories', [CategoryController::class, 'index']);

Route::group(function () {
    Route::post('students/course', [EnrollmentController::class, 'showCourseStudents']);
    Route::post('enroll', [EnrollmentController::class, 'enroll']);
    Route::post('courses/student', [EnrollmentController::class, 'showStudentCourses']);
});
