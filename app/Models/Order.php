<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $primaryKey = 'order_id';

    protected  $fillable = [
        'phone',
        'delivery_address',
        'comments'
    ];

    const CREATED_AT = 'ordered_at';
    const UPDATED_AT = 'canceled_at';
}
