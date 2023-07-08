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


        $materials = Material::create([
            'course_id' => $request->course_id,
            'week' => $request->week,
            'pdf' => $request->pdf,
            'spdf' => 'null',
            'video_link' => $request->video_link,
            'svideo_link' => 'null',
            'video_title' => $request->video_title,
        ]);

        $response = Http::withOptions([
            'timeout' => 360 // in seconds
        ])->get('http://127.0.0.1:5726/summaryYoutube/' . $materials->video_link);

        $materials->svideo_link = $response;
    }

    public function showByCourse(Request $request)
    {
        $validatedData = $request->validate([
            'course_id' => 'required|integer',
        ]);
        $materials = Material::where('course_id', $request->course_id)->get();
        return response()->json($materials);
    }

    public function videoSummary($id)
    {
        // $id = $request->id;
        $material = Material::where('id', $id)->first();

        if ($material->svideo_link != 'null') {
            return response()->json($material->svideo_link);
        }

        $response = Http::withOptions([
            'timeout' => 360 // in seconds
        ])->get('http://127.0.0.1:5726/summaryYoutube/' . $material->video_link);

        $material->svideo_link = $response;

        return response()->json($response);
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
