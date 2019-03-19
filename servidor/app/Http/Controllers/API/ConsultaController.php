<?php

namespace App\Http\Controllers\API;

use App\Cliente;
use App\Consulta;
use App\Mail\RadiografiaMail;
use App\Mail\TomografiaMail;
use App\Profesional;
use App\Radiografia;
use App\RadiografiaTomografia;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

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
                                ->orderBy('consulta_id', 'desc')
                                ->paginate(10);
        return response()->json($consultas, 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $consultas = Consulta::join('clientes', 'clientes.cliente_id', '=', 'consultas.cliente_id')
                                    ->orderBy('consulta_id', 'desc')
                                    ->paginate(10);
        } else {
            $consultas = Consulta::where('numero_factura', 'like', '%' . $valor . '%')
                ->orwhere('tipo', 'like', '%' . $valor . '%')
                ->orderBy('consulta_id','desc')
                ->paginate(10);
        }
        return response()->json($consultas, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $radiografia_tomografia_id = $request->input('radiografia_tomografia_id');
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
            $radiografia = RadiografiaTomografia::find($radiografia_tomografia_id);
            $radiografia->asignado = true;
            $radiografia->consulta_id = $consulta->consulta_id;
            $radiografia->save();
        }

        $profesional = Profesional::find($request->input('profesional_id'));
        if ($radiografia->categoria === 'radiografia') {
            Mail::send(new RadiografiaMail([
                'filename' => $radiografia->nombre,
                'email' => $profesional->email,
                'razon_social' => $profesional->razon_social,
                'created_at' => $radiografia->created_at
            ]));
            $cliente = new Client();
            $local = 'http://localhost:8080/api/';
            $response = $cliente->get($local . 'consultas-zip/' . $radiografia->nombre);

        } else {
            Mail::send(new TomografiaMail([
                'filename' => $radiografia->nombre,
                'email' => $profesional->email,
                'razon_social' => $profesional->razon_social,
                'created_at' => $radiografia->created_at
            ]));

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
