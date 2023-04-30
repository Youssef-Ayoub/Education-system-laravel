@extends('layout')

@section('body-content')
    <form action="{{ url('admin/course/store') }}" method="POST">
        @csrf
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" name="name" class="form-control" id="name" placeholder="name">
        </div>

        <div class="form-group">
            <label for="description">description</label>
            <input type="text" name="description" class="form-control" id="description" placeholder="description">
        </div>

        <div class="form-group">
            <label for="cover">cover</label>
            <input type="text" name="cover" class="form-control" id="cover" placeholder="cover">
        </div>

        <div class="form-group">
            <label for="instructor_name">Instructor name</label>
            <input type="text" name="instructor_name" class="form-control" id="instructor_name"
                placeholder="instructor_name">
        </div>

        <div class="form-group">
            <label for="category_name">Category</label>
            <input type="text" name="category_name" class="form-control" id="category_name" placeholder="category_name">
        </div>


        <div class="form-group">
            <input type="submit" class="btn btn-success col-12" value="save">
        </div>
    </form>
@endsection
