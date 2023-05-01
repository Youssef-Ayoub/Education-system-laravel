@extends('layout')

@section('body-content')
    <div class="card-body">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th style="width: 10px">#</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                @forelse ($courses as $course)
                    <tr>
                        <td>{{ $course->id }}</td>
                        <td>{{ $course->name }}</td>
                        <td>{{ $course->description }}</td>
                        <td><a class="btn btn-info" href="{{ url("admin/course/edit/$course->id") }}">Update</a></td>
                        <td><a class="btn btn-danger" href="{{ url("admin/course/delete/$course->id") }}">Delete</a></td>
                    </tr>

                @empty
                    <tr>
                        <td class="text-center" colspan="4"> There is no data</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>
@endsection
