<?php

namespace App\Http\Controllers\API;

use App\Tomografia;
use Chumper\Zipper\Facades\Zipper;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TomografiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Tomografia::get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $existe = Tomografia::where('carpeta', '=', $request->input('carpeta'))->exists();
        if (!$existe) {
            $tomografia = Tomografia::create($request->all());
            $files = glob(public_path('tomografias/' . explode('/', $tomografia->carpeta)[1]));
            Zipper::make(public_path('tomografias/' . $tomografia->zip))->add($files)->close();
            $tomografia_no_creada = Tomografia::where('zip', '=', $tomografia->zip)->first();
            $tomografia_no_creada->creado = true;
            $tomografia_no_creada->save();
            return response()->json($tomografia, 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function zipNoCreados() {
        $zip_no_creados = Tomografia::where('creado', '=', false)
                                    ->selectRaw('zip, carpeta')
                                    ->get();
        return response()->json($zip_no_creados, 200);
    }
}
