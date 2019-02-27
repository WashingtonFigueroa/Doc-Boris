<p>
    Tomografía: <strong>{{ $filename }}</strong> <br>
    Hora de creación: <strong>{{ $created_at->format('d/m/Y H:i:s') }}</strong> <br>
</p>
<p>
    Para descargar la tomografía sigue este enlace:
    <a href="http://localhost:8000/api/tomografia/{{ $filename }}">Descargar tomografía</a>
</p>


