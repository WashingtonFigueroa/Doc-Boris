<?php

namespace App\Http\Controllers\API;

use App\Cliente;
use GuzzleHttp\Client;
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
        $clientes = Cliente::orderBy('razon_social')->paginate(10);
        return response()->json($clientes, 200);
    }

    public function listar() {
        return response()->json(Cliente::orderBy('razon_social')->get(), 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $clientes = Cliente::orderBy('razon_social')->paginate(10);
        } else {
            $clientes = Cliente::where('tipo_documento', 'like', '%' . $valor . '%')
                ->orWhere('documento', 'like', '%' . $valor . '%')
                ->orWhere('razon_social', 'like', '%' . $valor . '%')
                ->orWhere('direccion', 'like', '%' . $valor . '%')
                ->orWhere('fecha_nacimiento', 'like', '%' . $valor . '%')
                ->orWhere('celular', 'like', '%' . $valor . '%')
                ->orWhere('genero', 'like', '%' . $valor . '%')
                ->orderBy('razon_social')
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

    public function sri($tipo_documento, $documento) {
        $clientes = Cliente::where('tipo_documento', '=', $tipo_documento)
                ->where('documento', 'like', '%'.$documento.'%')
                ->count();
        if ($clientes > 0) {
            $data = Cliente::where('tipo_documento', '=', $tipo_documento)
                ->where('documento', 'like', '%'.$documento.'%')
                ->first();
            $type = 'local';
        } else {
            $request = curl_init();
            curl_setopt ($request, CURLOPT_URL, 'https://declaraciones.sri.gob.ec/sri-registro-civil-servicio-internet/rest/DatosRegistroCivil/obtenerPorNumeroIdentificacion?numeroIdentificacion='.$documento);
            curl_setopt ($request, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt ($request, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt ($request, CURLOPT_CONNECTTIMEOUT, 0);
            $response = curl_exec($request);
            curl_close($request);
            $data = json_decode($response,true);
            $type = 'sri';
        }
        return response()->json([
            'data' => $data,
            'type' => $type
        ], 200);
    }
}
