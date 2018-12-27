<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function upload() {
        if (request()->hasFile('archivo')) {
            $filename = request()->file('archivo')->storeAs('radiografias',
                request()->file('archivo')->getClientOriginalName()
                );
        }
        return response()->json([
            'message' => 'file uploaded!'
        ], 200);
    }
}
