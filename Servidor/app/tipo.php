<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class tipo extends Model
{
    use SoftDeletes;
    protected $table = 'tipos';
    protected $primaryKey = 'tipo_id';
    protected $fillable = [
        'tipo',
        'categoria'
    ];
    protected $dates = ['deleted_at'];
}
