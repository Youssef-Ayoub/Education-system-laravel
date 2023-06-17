@extends('layout.master')

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Login</title>
</head>
<body>
    <form method = "POST" action = "{{url('loginrequest')}}">
        @csrf
        <input type="text" name="email">
        <input type="text" name="password">
        <input type="submit" value="save">
    </form>
</body>
</html>