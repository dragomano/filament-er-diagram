<?php

namespace Bugo\FilamentErDiagram\Tests;

use Bugo\FilamentErDiagram\ErDiagramPlugin;
use Bugo\FilamentErDiagram\FilamentErDiagramServiceProvider;
use Filament\FilamentServiceProvider;
use Filament\Panel;
use Livewire\LivewireServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;

class TestCase extends Orchestra
{
    protected function setUp(): void
    {
        parent::setUp();

        // Run any pending migrations from the test fixtures
        $this->loadMigrationsFrom(__DIR__ . '/Fixtures/database/migrations');

        $this->artisan('migrate', ['--database' => 'testing'])->run();
    }

    protected function getPackageProviders($app): array
    {
        return [
            LivewireServiceProvider::class,
            FilamentServiceProvider::class,
            FilamentErDiagramServiceProvider::class,
        ];
    }

    protected function getEnvironmentSetUp($app): void
    {
        // SQLite in-memory for all tests
        config()->set('database.default', 'testing');
        config()->set('database.connections.testing', [
            'driver'   => 'sqlite',
            'database' => ':memory:',
            'prefix'   => '',
        ]);

        // Register a minimal Filament panel with our plugin
        \Filament\Facades\Filament::serving(function (): void {
            \Filament\Facades\Filament::registerPanel(
                Panel::make()
                    ->id('test')
                    ->path('test')
                    ->plugins([ErDiagramPlugin::make()]),
            );
        });
    }
}
