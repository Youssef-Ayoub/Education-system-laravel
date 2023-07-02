<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Models\Material;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class MaterialController extends Controller
{
    public function store(StoreMaterialRequest $request)
    {
        // $materials = Material::create($request->except($request->id));
        $url = $request->video_link;
        $query = parse_url($url, PHP_URL_QUERY);
        parse_str($query, $params);
        $videoId = $params['v'];
        $response = Http::get('http://127.0.0.1:5726/summaryYoutube/' . $videoId);

        $materials = Material::create([
            'course_id' => $request->course_id,
            'week' => $request->week,
            'pdf' => $request->pdf,
            'spdf' => $request->spdf,
            'video_link' => $videoId,
            'svideo_link' => $response,
            'video_title' => $request->video_title,
        ]);
        return response()->json(['status' => 'created successfully ']);
    }

    public function showByCourse(Request $request)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|integer',
        ]);
        $materials = Material::where('course_id', $request->course_id)->get();
        return response()->json($materials);
    }

    // public function pdfSummary(Request $request)
    // {
    //     $validatedData = $request->validate([
    //         'id' => 'required'
    //     ]);

    //     $material = Material::where('id', $request->id)->first();

    //     if (!$material) {
    //         return response()->json(['message' => 'Material not found']);
    //     }

    //     $pdfPath = 'C:\xampp\htdocs\gp\project\Education-system-laravel\angular\src\assets\pdf\Ahmed.pdf';

    //     $text = Pdf::getText($pdfPath);

    //     return response()->json($text);
    // }
}