<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Mensajes extends Model
{
    use SoftDeletes;
    protected $table = 'mensajes';
    protected $primaryKey = 'mensaje_id';
    protected $fillable = [
        'nombre',
        'asunto',
        'email',
        'mensaje',
    ];
    protected $dates = ['deleted_at'];
}
