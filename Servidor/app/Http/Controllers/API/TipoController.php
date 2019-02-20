<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;

use App\tipo;
use Illuminate\Http\Request;

class TipoController extends Controller
{
    public function index()
    {
        $tipo = tipo::orderBy('tipo_id','desc')->paginate(10);
        return response()->json($tipo, 200);
    }

    public function listar() {
        return response()->json(tipo::orderBy('tipo_id','desc')->get(), 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $tipo = tipo::orderBy('tipo_id')->paginate(10);
        } else {
            $tipo = tipo::Where('tipo', 'like', '%' . $valor . '%')
                ->orderBy('tipo_id', 'desc')
                ->paginate(10);
        }
        return response()->json($tipo, 200);
    }

    public function store(Request $request)
    {
        return response()->json(tipo::create($request->all()), 201);
    }

    public function show($id)
    {
        return response()->json(tipo::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $tipo = tipo::find($id);
        $tipo->update($request->all());
        return response()->json($tipo, 200);
    }

    public function destroy($id)
    {
        $tipo = tipo::find($id);
        $tipo->delete();
        return response()->json($tipo, 200);
    }
}
