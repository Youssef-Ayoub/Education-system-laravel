@extends('layout.master')

@section('title','Contact Me')

@section('content')
    <h1> Contact Me </h1>
    <p>{{$the_id}}</p>
@endsection

@section('sidebar') 
@parent
    This side bar is from contact me page
@endsection