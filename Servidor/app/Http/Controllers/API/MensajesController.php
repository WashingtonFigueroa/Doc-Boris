<?php

namespace App\Http\Controllers\API;

use App\Mensajes;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MensajesController extends Controller
{
    public function index()
    {
        $mensaje = Mensajes::orderBy('mensaje_id','desc')->paginate(10);
        return response()->json($mensaje, 200);
    }
    public function listar() {
        return response()->json(Mensajes::orderBy('mensaje_id','desc')->get(), 200);
    }
    public function buscar($valor = null) {
        if ($valor === null) {
            $mensaje = Mensajes::orderBy('mensaje_id','desc')->paginate(10);
        } else {
            $mensaje = Mensajes::where('nombre', 'like', '%' . $valor . '%')
                ->orWhere('asunto', 'like', '%' . $valor . '%')
                ->orWhere('email', 'like', '%' . $valor . '%')
                ->paginate(10);
        }
        return response()->json($mensaje, 200);
    }
    public function store(Request $request)
    {
        return response()->json(Mensajes::create($request->all()), 201);
    }
    public function show($id)
    {
        return response()->json(Mensajes::find($id), 200);
    }
    public function update(Request $request, $id)
    {
        $mensaje = Mensajes::find($id);
        $mensaje->update($request->all());
        return response()->json($mensaje, 200);
    }
    public function destroy($id)
    {
        $mensaje = Mensajes::find($id);
        $mensaje->delete();
        return response()->json($mensaje, 200);
    }
}
