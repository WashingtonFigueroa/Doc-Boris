<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tomografia extends Model
{
    protected $table = 'tomografias';
    protected $primaryKey = 'tomografia_id';
    protected $fillable =  [
        'carpeta',
        'zip',
        'subido',
    ];
}
