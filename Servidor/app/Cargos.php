<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Cargos extends Model
{
    use SoftDeletes;
    protected $table = 'cargos';
    protected $primaryKey = 'cargo_id';
    protected $fillable = [
        'nombre',
        'descripcion',
    ];
    protected $dates = ['deleted_at'];

    public function usuario() {
        return $this->hasOne('App\Usuario', 'cargo_id');
    }
    public function privilegios() {
        return $this->hasMany('App\Privilegio', 'cargo_id');
    }
}
