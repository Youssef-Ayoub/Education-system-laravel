<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function showByCourse($course_id)
    {
        $comments = Comment::where('course_id', $course_id)->get();
        return response()->json($comments);
    }

    public function store(StoreCommentRequest $request)
    {
        $request->validated($request->all());
        $comment = Comment::create($request->except($request->id));
        return response()->json($comment);
    }

    public function showByUser($user_id)
    {
        $comments = Comment::where('user_id', $user_id)->get();
        return response()->json($comments);
    }
}
