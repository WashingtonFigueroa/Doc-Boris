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

    public function sri($documento, $timeOut = 0, $proxy=null) {
        $data=array('success'=>true, 'message'=>null, 'data'=>null);
        $clientes = Cliente::where('documento', 'like', '%'.$documento.'%')->count();
        if ($clientes > 0) {
            $data = Cliente::where('documento', 'like', '%'.$documento.'%')->first();
            $type = 'local';
        } else {
                if(strlen($documento)!=10) throw new Exception('La cedula debe tener 10 digitos!');
                $post = array('tipo'=>'getDataWsRc','ci'=>$documento);
                $request = curl_init();
                curl_setopt ($request, CURLOPT_URL, "http://www.mdi.gob.ec/minterior1/antecedentes/data.php");
                curl_setopt ($request, CURLOPT_SSL_VERIFYPEER, false);
                curl_setopt ($request, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt ($request, CURLOPT_CONNECTTIMEOUT, $timeOut);
                curl_setopt ($request, CURLOPT_REFERER, 'http://www.mdi.gob.ec/minterior1/antecedentes/verifica.php');
                curl_setopt ($request, CURLOPT_POSTFIELDS, $post);
                if($proxy!=null){ //Si tiene salida a Internet por Proxy, debe poner ip y puerto
                    curl_setopt ($request, CURLOPT_HTTPPROXYTUNNEL, 1);
                    curl_setopt ($request, CURLOPT_PROXY, "$proxy[ip]:$proxy[port]");
                    if(isset($proxy['user'])) curl_setopt ($request, CURLOPT_PROXYUSERPWD, "$proxy[user]:$proxy[password]");
                }
                $response = curl_exec($request);
                curl_close($request);
                $ced = json_decode($response,true);
                if($ced==null) throw new Exception('La cedula no existe o no se logro obtener los datos!');
                $ced=$ced[0];
                if(isset($ced['error']) && !empty($ced['error'])) throw new Exception("La $documento no existe o no se logro obtener los datos!");
                $data['data']=array('identificacion' => $ced['identity'],
                    'nombreCompleto' => $ced['name'],
                    'genero' => $ced['genre'],
                    'fechaNacimiento' => $ced['dob'],
                    'estadoCivil' => $ced['civilstate'],
                    'nacionalidad' => $ced['nationality'],
                    'nombreCompletoConyuge' => null,'fechaDefuncion' => null,'numeroCedulaPadre' => null,'numeroCedulaMadre' => null,'residencia'=>$ced['residence'],
                    'domicilio'=>$ced['streets'],
                    'numeroDomicilio'=>$ced['homenumber']
                );
            $type = 'sri';
        }
        return response()->json([
            'data' => $data,
            'type' => $type
        ], 200);
    }
}
