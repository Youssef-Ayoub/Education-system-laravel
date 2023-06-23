<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;
    protected $table = "material";
    protected $primaryKey = 'id';

    protected $fillable = [
        'pdf',
        'spdf',
        'video',
        'svideo'
    ];
}
