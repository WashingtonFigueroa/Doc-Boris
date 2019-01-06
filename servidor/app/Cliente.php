<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cliente extends Model
{
    use SoftDeletes;
    protected $table = 'clientes';
    protected $primaryKey = 'cliente_id';
    protected $fillable = [
        'nombres',
        'cedula',
        'fecha_nacimiento',
        'celular',
    ];
    protected $dates = ['deleted_at'];
}
