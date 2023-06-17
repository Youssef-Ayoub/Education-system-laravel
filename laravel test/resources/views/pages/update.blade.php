@extends('layout.master') 


@section('content')
    <form action="{{url("update")}}" , method="POST">
        @csrf
        <input type="hidden" name="id" value="{{$row->id}}">
        <input type="text" name="name" value="{{$row->name}}">
        <input type="text" name="email" value="{{$row->email}}">
        <input type="text" name="password" value="{{$row->password}}">
        <input type="submit" value="save">
    </form>   
@endsection  