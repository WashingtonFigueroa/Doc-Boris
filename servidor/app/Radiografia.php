<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Radiografia extends Model
{
    protected $table = 'radiografias';
    protected $primaryKey = 'radiografia_id';
    protected $fillable = [
        'archivo',
        'nombre',
        'asignado',
    ];

}
