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
        'comments',
        'order_status',
        'order_total'
    ];

    public function orderItems() {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

}
