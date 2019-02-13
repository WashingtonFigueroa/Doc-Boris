<?php

namespace App\Http\Controllers\API;

use App\Profesional;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ProfesionalController extends Controller
{
    public function index()
    {
        $profesional = Profesional::orderBy('profesional_id')->paginate(10);
        return response()->json($profesional, 200);
    }

    public function listar() {
        return response()->json(Profesional::orderBy('profesional_id')->get(), 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $profesional = Profesional::orderBy('profesional_id')->paginate(10);
        } else {
            $profesional = Profesional::where('tipo_documento', 'like', '%' . $valor . '%')
                ->orWhere('documento', 'like', '%' . $valor . '%')
                ->orWhere('razon_social', 'like', '%' . $valor . '%')
                ->orWhere('especialidad', 'like', '%' . $valor . '%')
                ->orWhere('direccion', 'like', '%' . $valor . '%')
                ->orWhere('email', 'like', '%' . $valor . '%')
                ->orWhere('celular', 'like', '%' . $valor . '%')
                ->orderBy('profesional_id')
                ->paginate(10);
        }
        return response()->json($profesional, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response()->json(Profesional::create($request->all()), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Profesional::find($id), 200);
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
        $cliente = Profesional::find($id);
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
        $cliente = Profesional::find($id);
        $cliente->delete();
        return response()->json($cliente, 200);
    }
}
