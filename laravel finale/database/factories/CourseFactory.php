<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Factories\Factory;


/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{

    public function definition(): array
    {
        return [
            "name" => $this->faker->name(),
            "description" => $this->faker->paragraph(),
            "cover" => fake()->paragraph(),
            "category_id" => Category::factory()
        ];
    }
}
