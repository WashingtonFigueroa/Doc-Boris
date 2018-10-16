<?php

namespace App\Http\Controllers;

use App\Tipousuario;
use Illuminate\Http\Request;

class TipousuarioController extends Controller
{
    public function index()
    {
        return response()->json(Tipousuario::orderBy('nombre')->paginate(10), 200);
    }

    public function lista_tipousuarios()
    {
        $tipo_usuarios = Tipousuario::orderBy('nombre')
            ->where('nombre', '!=', 'root')
            ->get();
        return response()->json($tipo_usuarios, 200);
    }

    public function buscar_tipousuarios() {
        $search = request()->input('search');
        $tipousuarios = Tipousuario::where('nombre', 'like', '%'. $search . '%')
            ->orWhere('descripcion', 'like', '%'. $search . '%')
            ->paginate(10);
        return response()->json($tipousuarios, 200);
    }

    public function store(Request $request)
    {
        $tipo_usuario = Tipousuario::create($request->all());
        return response()->json($tipo_usuario, 201);
    }

    public function show($id)
    {
        return response()->json(Tipousuario::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $tipo_usuario = Tipousuario::find($id);
        $tipo_usuario->update($request->all());
        return response()->json($tipo_usuario, 200);
    }

    public function destroy($id)
    {
        $tipo_usuario = Tipousuario::find($id);
        $tipo_usuario->delete();
        return response()->json($tipo_usuario, 200);
    }
}
