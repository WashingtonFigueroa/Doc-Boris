<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Colegas extends Model
{
    use SoftDeletes;
    protected $table = 'colegas';
    protected $primaryKey = 'colegas_id';
    protected $fillable = [
        'documento',
        'razon_social',
        'email',
        'celular',
        'estado',
    ];
    protected $dates = ['deleted_at'];
}
