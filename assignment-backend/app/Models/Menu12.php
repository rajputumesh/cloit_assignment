<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Menu12 extends Model
{
    protected $fillable = ['name', 'parent_id', 'depth'];

    public function children()
    {
        return $this->hasMany(Menu12::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Menu12::class, 'parent_id');
    }
}
