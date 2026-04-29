<?php

declare(strict_types=1);

namespace Bugo\FilamentErDiagram;

use Bugo\FilamentErDiagram\Commands\GenerateErDiagramCommand;
use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Commands\InstallCommand;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class FilamentErDiagramServiceProvider extends PackageServiceProvider
{
    public static string $name = 'filament-er-diagram';

    public static string $viewNamespace = 'filament-er-diagram';

    public function configurePackage(Package $package): void
    {
        $package
            ->name(static::$name)
            ->hasViews(static::$viewNamespace)
            ->hasTranslations()
            ->hasConfigFile()
            ->hasCommand(GenerateErDiagramCommand::class)
            ->hasInstallCommand(function (InstallCommand $command): void {
                $command
                    ->publishConfigFile()
                    ->askToStarRepoOnGitHub('dragomano/filament-er-diagram');
            });
    }

    public function packageBooted(): void
    {
        FilamentAsset::register(
            assets: [
                AlpineComponent::make(
                    id: 'er-diagram',
                    path: __DIR__ . '/../resources/js/dist/er-diagram.js',
                ),
            ],
            package: 'bugo/filament-er-diagram',
        );
    }
}
