<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'title'])]
class Todo extends Model
{
    /**
     * この Todo が所属するユーザーを取得
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function storeTodoList(int $userId, string $title): self
    {
        return $this->create([
            'user_id' => $userId,
            'title' => $title,
        ]);
    }
}
