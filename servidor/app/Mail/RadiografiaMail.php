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
        return $this->view('radiografia', $this->envio)
            ->from('info@nordentrx.com', 'Nordent RX')
            ->to($this->envio['email'], $this->envio['razon_social'])
            ->subject('Radiografias Nordent RX')
            ->attach(storage_path('app/radiografias/'.$this->envio['filename']));
    }
}
