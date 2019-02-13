<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Profesional extends Model
{
    use SoftDeletes;
    protected $table = 'profesionales';
    protected $primaryKey = 'profesional_id';
    protected $fillable = [
        'documento',
        'razon_social',
        'especialidad',
        'direccion',
        'email',
        'celular',
    ];
    protected $dates = ['deleted_at'];
}
