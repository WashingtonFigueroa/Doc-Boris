<?php

namespace App\Http\Controllers\API;

use App\Cliente;
use App\Consulta;
use App\Radiografia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ReportesController extends Controller
{

    public function sumradiografias ()
    {
        $sumradiografias = Radiografia::get()->count();
        return response()->json($sumradiografias, 200);
    }
    public function sumrconsultas ()
    {
        $sumconsulta = Consulta::get()->count();
        return response()->json($sumconsulta, 200);
    }
    public function diferencia ()
    {
        $sumradiografias = Radiografia::get()->count();
        $sumconsulta = Consulta::get()->count();
        $diferencia = $sumradiografias - $sumconsulta;
        return response()->json($diferencia, 200);
    }
    public function valor ()
    {

//        $valor = Reservation::whereBetween('created_at', [$from_from, $to_from])
//            ->sum('valor');

        $valor = Consulta::sum('valor');
        return response()->json($valor, 200);
    }


}
