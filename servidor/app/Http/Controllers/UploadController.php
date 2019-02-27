<?php

namespace App\Http\Controllers;

use App\Mail\RadiografiaMail;
use App\RadiografiaTomografia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class UploadController extends Controller
{
    public function upload() {
        $radiografia = null;
        if (request()->hasFile('archivo')) {
            $filename = request()->file('archivo')->storeAs('radiografias',
                request()->file('archivo')->getClientOriginalName()
                );
            $radiografias = RadiografiaTomografia::where('archivo', $filename)->count();
            if ($radiografias === 0) {
                $radiografia = RadiografiaTomografia::create([
                    'archivo' => $filename,
                    'nombre' => explode('/', $filename)[1],
                    'categoria' => 'radiografia',
                    'sucursal_id' => \request()->input('sucursal_id')
                ]);
                Mail::send(new RadiografiaMail([
                    'filename' => $radiografia->nombre,
                    'created_at' => $radiografia->created_at
                ]));
            }
        }
        return response()->json($radiografia, 200);
    }
    public function uploadTomografia() {
        $tomografia = null;
        if (request()->hasFile('archivo')) {
            $filename = request()->file('archivo')->storeAs('tomografias',
                request()->file('archivo')->getClientOriginalName()
                );
            $tomografias = RadiografiaTomografia::where('archivo', $filename)->count();
            if ($tomografias === 0) {
                $tomografia = RadiografiaTomografia::create([
                    'archivo' => $filename,
                    'nombre' => explode('/', $filename)[1],
                    'categoria' => 'tomografia',
                    'sucursal_id' => \request()->input('sucursal_id')
                ]);
            }
        }
        return response()->json($tomografia, 200);
    }

    public function sendFile() {
        $created_at = request()->input('created_at');
        $filename = request()->input('nombre');
        Mail::send(new RadiografiaMail([
            'filename' => $filename,
            'created_at' => $created_at
        ]));
    }
}
