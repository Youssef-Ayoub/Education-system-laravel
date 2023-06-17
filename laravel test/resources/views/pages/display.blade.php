@extends('layout.master')

<table border="1">
    <tr>
        <th>id</th>
        <th>username</th>
        <th>mail</th>
        <th>password</th>
        <th>edit</th>
        <th>delete</th>
    </tr>
    @foreach ($data as $cat)
        <tr>
            <th>{{$cat->id}}</th>
            <th>{{$cat->name}}</th>
            <th>{{$cat->email}}</th>
            <th>{{$cat->password}}</th>
            <th><a href="{{url("edit/$cat->id")}}">Update</a></th>
            <th><a href="{{url("delete/$cat->id")}}">delete</a></th>
        </tr>
    @endforeach
</table>