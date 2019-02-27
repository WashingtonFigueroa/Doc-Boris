<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class TomografiaMail extends Mailable
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
        return $this->view('tomografia', $this->envio)
            ->from('info@nordentrx.com', 'Nordent RX')
            ->to($this->envio['email'], $this->envio['razon_social'])
            ->subject('Tomografias Nordent RX');
    }
}
