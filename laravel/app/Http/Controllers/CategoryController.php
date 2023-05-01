<?php

namespace App\Http\Controllers;

use App\Models\category;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): View
    {
        $categories = category::all();
        return view('admin.category/index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        return view('admin.category.create');
    }


    public function store(Request $request)
    {
        category::create($request->all());
        return redirect("admin/category");
    }


    public function edit($id)
    {
        $category = category::find($id);
        return view('admin/category/edit', compact("category"));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $category = category::find($request->id);
        $category->update($request->except(["_token", "id"]));
        return redirect('admin/category');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = category::find($id);
        $category->delete();
        return redirect('admin/category');
    }
}
