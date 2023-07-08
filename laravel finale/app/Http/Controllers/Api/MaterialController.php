<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Models\Material;
use Dotenv\Parser\Parser as ParserParser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redis;
use Spatie\PdfToText\Pdf;
use Zend_Pdf;




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

        $material->svideo_link = $response->body();

        $material->save();

        return response()->json($response->body());
    }



    public function pdfSummary($id)
    {
        $material = Material::where('id', $id)->first();

        if ($material->spdf != 'null') {
            return response()->json($material->spdf);
        }

        if ($material->pdf == null) {
            return response()->json(['there is no pdf']);
        }

        $parser = new \Smalot\PdfParser\Parser();
        $pdf = $parser->parseFile(public_path($material->pdf));

        $text = $pdf->getText();

        $text = str_replace("\n", "", $text); // Replace newline characters with a space
        $text = str_replace("\t", "", $text);


        $response = Http::withOptions([
            'timeout' => 360 // in seconds
        ])->get('http://127.0.0.1:5726/summaryText/' . $text);

        $material->spdf = $response->body();

        $material->save();

        return response()->json($response->body());
    }
}
