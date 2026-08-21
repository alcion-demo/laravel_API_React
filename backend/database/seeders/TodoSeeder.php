<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Todo;

class TodoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Todo::create([
            'title' => '牛乳を買う',
        ]);

        Todo::create([
            'title' => '洗濯する',
        ]);

        Todo::create([
            'title' => 'Reactを勉強する',
        ]);
    }
}
