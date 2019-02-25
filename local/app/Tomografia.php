<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tomografia extends Model
{
    use SoftDeletes;
    protected $table = 'tomografias';
    protected $primaryKey = 'tomografia_id';
    protected $fillable = [
        'carpeta',
        'zip',
        'creado',
        'subido',
    ];
    protected $dates = ['dates'];
}
