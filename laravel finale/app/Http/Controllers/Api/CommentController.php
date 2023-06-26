<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class CommentController extends Controller
{
    public function showByCourse($course_id)
    {
        $comments = Comment::with('course')->get();
        $commentData = $comments->map(function ($comment) {
            return [
                "id" => $comment->id,
                "user_id" => $comment->user_id,
                "course_id" => $comment->course_id,
                'course_name' => $comment->course->name,
                "comment" => $comment->comment,
                "rating" => $comment->rating
            ];
        });
        return response()->json($commentData);

        $comments = Comment::where('course_id', $course_id)->get();
        return response()->json($comments);
    }

    public function store(StoreCommentRequest $request)
    {
        $request->validated($request->all());

        $text = $request->comment;

        $response = Http::get('http://127.0.0.1:5726/predict/ ' . $text);

        $comment = Comment::create([
            'user_id' => $request->user_id,
            'course_id' => $request->course_id,
            'comment' => $request->comment,
            'rating' => $request->rating,
            'sentiment' => $response,
        ]);

        return response()->json($comment);
    }

    public function showByUser($user_id)
    {
        $comments = Comment::where('user_id', $user_id)->get();
        return response()->json($comments);
    }
}
