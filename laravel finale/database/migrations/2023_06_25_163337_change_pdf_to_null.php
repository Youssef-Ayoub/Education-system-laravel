<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('materials', function (Blueprint $table) {
            $table->string('video_title')->nullable()->change();
            $table->string('pdf')->nullable()->change();
            $table->string('spdf')->nullable()->change();
            $table->string('video_link')->nullable()->change();
            $table->string('svideo_link')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('materials', function (Blueprint $table) {
            //
        });
    }
};
