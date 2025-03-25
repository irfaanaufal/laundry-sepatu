<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shipping_Cost extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'distance',
        'min_pair',
        'max_pair',
        'price',
    ];

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
