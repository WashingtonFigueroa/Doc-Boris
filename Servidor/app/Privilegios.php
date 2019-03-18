<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Privilegios extends Model
{
    use SoftDeletes;
    protected $table = 'privilegios';
    protected $primaryKey = 'privilegio_id';
    protected $fillable = [
        'cargo_id',
        'acceso',
        'activo'
    ];
    protected $dates = ['deleted_at'];

    public function cargo() {
        return $this->belongsTo('App\Cargo', 'cargo_id');
    }
}
