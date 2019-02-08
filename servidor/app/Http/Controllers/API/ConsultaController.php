<?php

namespace App\Http\Controllers\API;

use App\Cliente;
use App\Consulta;
use App\Radiografia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ConsultaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $consultas = Consulta::join('clientes', 'clientes.cliente_id', '=', 'consultas.cliente_id')
                                ->orderBy('numero_factura', 'desc')
                                ->paginate(10);
        return response()->json($consultas, 200);
    }

/*    public function buscar($valor = null) {
        if ($valor === null) {
            $consultas = Cliente::orderBy('numero_factura')->paginate(10);
        } else {
            $consultas = Cliente::where('numero_factura', 'like', '%' . $valor . '%')
                ->orderBy('numero_factura')
                ->paginate(10);
        }
        return response()->json($consultas, 200);
    }*/
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $radiografia_id = $request->input('radiografia_id');
        $consulta = null;
        if ($request->input('cliente_id') === 0) {
            $cliente_id = Cliente::create($request->all())->cliente_id;
            $consulta = new Consulta();
            $consulta->fill($request->all());
            $consulta->cliente_id = $cliente_id;
            $consulta->save();
        } else {
            $consulta = Consulta::create($request->all());
        }
        if ($consulta !== null) {
            $radiografia = Radiografia::find($radiografia_id);
            $radiografia->asignado = true;
            $radiografia->consulta_id = $consulta->consulta_id;
            $radiografia->save();
        }
        return response()->json($consulta, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Consulta::find($id), 200);
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
        $consulta = Consulta::find($id);
        $consulta->update($request->all());
        return response()->json($consulta, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $consulta = Consulta::find($id);
        $consulta->delete();
        return response()->json($consulta, 200);
    }
}
