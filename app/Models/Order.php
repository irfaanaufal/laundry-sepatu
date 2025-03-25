<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'address_id',
        'shipping_cost_id',
        'inv_no',
        'qty',
        'distance',
        'grand_total',
        'status',
        'processed_at',
        'delivered_at',
        'received_at'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class);
    }

    public function shipping_cost(): BelongsTo
    {
        return $this->belongsTo(Shipping_Cost::class);
    }
}
