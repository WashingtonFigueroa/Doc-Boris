<?php

namespace App\Http\Controllers;

use App\Colegas;
use Illuminate\Http\Request;

class ColegasController extends Controller
{
    public function index()
    {
        $colegas = Colegas::orderBy('razon_social')->paginate(10);
        return response()->json($colegas, 200);
    }

    public function listar() {
        return response()->json(Colegas::orderBy('razon_social')->get(), 200);
    }

    public function buscar($valor = null) {
        if ($valor === null) {
            $colegas = Colegas::orderBy('razon_social')->paginate(10);
        } else {
            $colegas = Colegas::where('documento', 'like', '%' . $valor . '%')
                ->orWhere('razon_social', 'like', '%' . $valor . '%')
                ->orWhere('email', 'like', '%' . $valor . '%')
                ->orWhere('celular', 'like', '%' . $valor . '%')
                ->paginate(10);
        }
        return response()->json($colegas, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return response()->json(Colegas::create($request->all()), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json(Colegas::find($id), 200);
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
        $colegas = Colegas::find($id);
        $colegas->update($request->all());
        return response()->json($colegas, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $colegas = Colegas::find($id);
        $colegas->delete();
        return response()->json($colegas, 200);
    }
}
