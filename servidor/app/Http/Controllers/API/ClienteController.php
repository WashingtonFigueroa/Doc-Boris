<?php

namespace App\Http\Controllers\API;

use App\Cliente;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $clientes = Cliente::orderBy('nombres')->paginate(10);
        return response()->json($clientes, 200);
    }

    public function listar() {
        return response()->json(Cliente::orderBy('nombres')->get(), 200);
    }
    public function buscar($valor = null) {
        if ($valor === null) {
            $clientes = Cliente::orderBy('nombres')->paginate(10);
        } else {
            $clientes = Cliente::where('nombres', 'like', '%' . $valor . '%')
                ->orWhere('tipo_documento', 'like', '%' . $valor . '%')
                ->orWhere('documento', 'like', '%' . $valor . '%')
                ->orWhere('razon_social', 'like', '%' . $valor . '%')
                ->orWhere('direccion', 'like', '%' . $valor . '%')
                ->orWhere('fecha_nacimiento', 'like', '%' . $valor . '%')
                ->orWhere('celular', 'like', '%' . $valor . '%')
                ->orderBy('nombres')
                ->paginate(10);
        }
        return response()->json($clientes, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response()->json(Cliente::create($request->all()), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Cliente::find($id), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $cliente = Cliente::find($id);
        $cliente->update($request->all());
        return response()->json($cliente, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cliente = Cliente::find($id);
        $cliente->delete();
        return response()->json($cliente, 200);
    }
}
