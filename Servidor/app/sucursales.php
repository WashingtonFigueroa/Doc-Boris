<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class sucursales extends Model
{
    use SoftDeletes;
    protected $table = 'sucursales';
    protected $primaryKey = 'sucursal_id';
    protected $fillable = [
        'ciudad',
        'direccion',
        'telefono',
    ];
    protected $dates = ['deleted_at'];
}
