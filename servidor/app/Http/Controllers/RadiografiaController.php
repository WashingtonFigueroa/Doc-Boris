<?php

namespace App\Http\Controllers;

use App\Radiografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RadiografiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Radiografia  $radiografia
     * @return \Illuminate\Http\Response
     */
    public function show(Radiografia $radiografia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Radiografia  $radiografia
     * @return \Illuminate\Http\Response
     */
    public function edit(Radiografia $radiografia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Radiografia  $radiografia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Radiografia $radiografia)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Radiografia  $radiografia
     * @return \Illuminate\Http\Response
     */
    public function destroy(Radiografia $radiografia)
    {
        //
    }


    public function noAsignadas() {
        $radiografias = Radiografia::where('asignado', false)
                                    ->orderBy('created_at', 'desc')
                                    ->get();
        return response()->json($radiografias, 200);
    }


    public function radiografia($filename) {
/*        return response()->json([
            'response' => $filename,
            'storage_path' => storage_path('app\\radiografias\\' . $filename)
        ], 200);*/
        return response()->file(storage_path('app/radiografias/' . $filename));
    }

}
