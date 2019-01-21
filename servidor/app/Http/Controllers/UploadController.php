<?php

namespace App\Http\Controllers;

use App\Radiografia;
use App\Tomografia;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload() {
        if (request()->hasFile('archivo')) {
            $filename = request()->file('archivo')->storeAs('radiografias',
                request()->file('archivo')->getClientOriginalName()
                );
            $radiografias = Radiografia::where('archivo', $filename)->count();
            if ($radiografias === 0) {
                Radiografia::create([
                    'archivo' => $filename,
                    'nombre' => explode('/', $filename)[1]
                ]);
            }
        }
        return response()->json([
            'message' => 'file uploaded!'
        ], 200);
    }
    public function uploadTomografia() {
        if (request()->hasFile('archivo')) {
            $filename = request()->file('archivo')->storeAs('tomografias',
                request()->file('archivo')->getClientOriginalName()
                );
            $tomografias = Tomografia::where('archivo', $filename)->count();
            if ($tomografias === 0) {
                Tomografia::create([
                    'archivo' => $filename,
                    'nombre' => explode('/', $filename)[1]
                ]);
            }
        }
        return response()->json([
            'message' => 'file uploaded!'
        ], 200);
    }
}
