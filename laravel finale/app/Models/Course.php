<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    protected $fillable = [
        'name',
        'cover',
        'description',
        'category_id',
        'instructor_name'
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
