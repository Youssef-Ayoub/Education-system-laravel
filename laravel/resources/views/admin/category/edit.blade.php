@extends('layout')

@section('body-content')
    <form action="{{ url('admin/category/update') }}" method="POST">
        @csrf
        <input type="hidden" name="id" value="{{ $category->id }}">
        <div class="form-group">
            <label for="name">Name</label>
            <input value="{{ $category->name }}" type="text" name="name" class="form-control" id="name"
                placeholder="name">
        </div>


        <div class="form-group">
            <input type="submit" class="btn btn-success col-12" value="save">
        </div>
    </form>
@endsection
