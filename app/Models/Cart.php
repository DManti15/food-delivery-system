<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    public $primaryKey = null;
    public $incrementing = false;
    
    
    protected $fillable = [
        'product_id',
        'customer',
        'quantity'
    ];
}
