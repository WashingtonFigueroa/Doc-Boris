<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class RadiografiaMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    protected $envio;
    public function __construct($envio)
    {
        $this->envio = $envio;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        /*example*/
        return $this->view('radiografia', $this->envio)
            ->from('quantix.software@gmail.com', 'Nordent RX')
            ->to('w.figo.1991@gmail.com', 'Doc. Boris')
            ->subject('Radiografias Nordent RX')
            ->attach(storage_path('app/radiografias/'.$this->envio['filename']));
    }
}