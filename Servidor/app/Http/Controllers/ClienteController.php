<?php

namespace App\Http\Controllers;

use App\Cliente;
use Illuminate\Http\Request;

class ClienteController extends Controller
{
    public function index()
    {
        return response()->json(Cliente::orderBy('cliente_id')->paginate(10), 200);
    }

    public function lista_clientes()
    {
        $clientes = Cliente::orderBy('cliente_id')->get();
        return response()->json($clientes, 200);
    }

    public function buscar_clientes() {
        $search = request()->input('search');
        $clientes = Cliente::where('nombres', 'like', '%'. $search . '%')
            ->orWhere('cedula', 'like', '%'. $search . '%')
            ->orWhere('fecha_nacimiento', 'like', '%'. $search . '%')
            ->paginate(10);
        return response()->json($clientes, 200);
    }

    public function store(Request $request)
    {
        $cliente = Cliente::create($request->all());
        return response()->json($cliente, 201);
    }

    public function show($id)
    {
        return response()->json(Cliente::find($id), 200);
    }

    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);
        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }

    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        $cliente->delete();
        return response()->json($cliente, 200);
    }
}
