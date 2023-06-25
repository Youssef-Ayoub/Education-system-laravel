<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMaterialRequest;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function store(StoreMaterialRequest $request)
    {
        $materials = Material::create($request->except($request->id));
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
}
