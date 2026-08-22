<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Todo;
use App\Models\User;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        Todo::create([
            'user_id' => $user->id,
            'title' => '牛乳を買う',
        ]);

        Todo::create([
            'user_id' => $user->id,
            'title' => '洗濯する',
        ]);

        Todo::create([
            'user_id' => $user->id,
            'title' => 'Reactを勉強する',
        ]);
    }
}
