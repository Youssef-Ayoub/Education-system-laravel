@extends('layout.master')

@section('title','About Me')

@section('content')

    @if ($errors->any())
    <ul>
        @foreach ($errors->all() as $error)
            <li>{{$error}}</li>
        @endforeach
    </ul>
        
    @endif

    <form action="{{url("store")}}" , method="POST">
        @csrf
        <input type="text" name="name">
        <input type="text" name="email">
        <input type="text" name="password">
        <input type="submit" value="save">
    </form>    
@endsection




