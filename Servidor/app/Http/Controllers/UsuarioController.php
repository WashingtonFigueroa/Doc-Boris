<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index() {
        return response()->json(User::with('tipoUsuario')
            ->where('cuenta', '<>', 'root')
            ->orderBy('nombres')
            ->paginate(10), 200);
    }
    public function store() {
        $usuario = new User();
        $usuario->fill(request()->all());
        $usuario->password = Hash::make(request()->input('password'));
        $usuario->save();
        return response()->json($usuario, 201);
    }
    public function destroy($id) {
        $usuario = User::find($id);
        $usuario->delete();
        return response()->json('User ' , $usuario->nombres . ' eliminado exitosamente', 200);
    }
}
