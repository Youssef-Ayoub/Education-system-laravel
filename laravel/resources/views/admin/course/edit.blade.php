@extends('layout')

@section('body-content')
    <form action="{{ url('admin/course/update') }}" method="POST">
        @csrf
        <input type="hidden" name="id" value="{{ $course->id }}">
        <div class="form-group">
            <label for="name">Name</label>
            <input value="{{ $course->name }}" type="text" name="name" class="form-control" id="name"
                placeholder="name">
        </div>

        <div class="form-group">
            <label for="name">Description</label>
            <input value="{{ $course->description }}" type="text" name="description" class="form-control"
                id="description" placeholder="description">
        </div>

        <div class="form-group">
            <label for="cover">cover</label>
            <input value="{{ $course->cover }}" type="text" name="cover" class="form-control" id="cover"
                placeholder="cover">
        </div>

        <div class="form-group">
            <label for="user_name">Instructor name</label>
            <input value="{{ $user->name }}" type="text" name="user_name" class="form-control" id="user_name"
                placeholder="user_name">
        </div>

        <div class="form-group">
            <label for="category_name">Category name</label>
            <input value="{{ $category->name }}" type="text" name="category_name" class="form-control" id="category_name"
                placeholder="category_name">
        </div>


        <div class="form-group">
            <input type="submit" class="btn btn-success col-12" value="save">
        </div>
    </form>
@endsection
