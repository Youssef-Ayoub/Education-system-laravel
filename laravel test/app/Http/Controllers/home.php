<?php

namespace App\Http\Controllers;

use App\Models\StudentModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class home extends Controller
{
    public function display()
    {
        // $data = DB::table('students')->get();
        $data = StudentModel::all();
        return view('pages.display', compact("data"));
    }

    public function create()
    {
        return view("pages.aboutme");
    }

    public function store(Request $r)
    {

        $r->validate([
            'name' => 'required|unique:students,name'
        ]);
        // dd($r->except(["_token"]));

        // StudentModel::create([
        //     'user_name' => $r->username,
        //     'user_email' => $r->email,
        //     'user_pass' => $r->password
        // ]);


        StudentModel::create($r->except(["_token"]));

        // DB::table("students")->insert([
        // 'user_name' => $r->username,
        // 'user_email' => $r->email,
        // 'user_pass' => $r->password
        // ]);

        return redirect("/display");
    }

    public function delete($id)
    {
        $row = StudentModel::find($id);
        $row->delete();
        // DB::table("students")->where('user_id', '=', $id)->delete();
        return redirect("/display");
    }

    public function edit($id)
    {
        $row = StudentModel::find($id);
        // $row = DB::table('students')->where('id', $id)->first();
        return view("pages.update", compact('row'));
    }

    public function update(Request $request)
    {

        // dd($request->except(["_token"]));
        $row = StudentModel::find($request->id);
        $row->update($request->except(["_token"]));
        // DB::table('students')->where('id', $request->id)->update([
        //     'id' => $request->id,
        //     'user_name' => $request->username,
        //     'user_email' => $request->mail,
        //     'user_pass' => $request->password
        // ]);

        return redirect('/display');
    }
}
