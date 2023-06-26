<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SummaryController extends Controller
{
    public function getMovie($text)
    {
        $link = 'http://127.0.0.1:5726/predict/' . $text;
        $response = Http::get($link);
        $jsondata = $response->json();
        return $response;
    }

    public function postMovie(Request $request)
    {
        $response = Http::post('http://localhost/gp/project/Education-system-laravel/laravel%20finale/public/api/students/course/number', [
            'course_id' => '4'
        ]);
        $jsondata = $response->json();
        return $jsondata;
        // $jsondata = $response->json();
        return $response;
    }
}