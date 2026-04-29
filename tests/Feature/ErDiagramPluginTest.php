<?php

declare(strict_types=1);

use Bugo\FilamentErDiagram\ErDiagramPlugin;
use Bugo\FilamentErDiagram\Tests\Fixtures\Models\Post;
use Filament\Facades\Filament;
use Filament\Panel;
use Filament\PanelRegistry;

afterEach(function (): void {
    app('filament')->setCurrentPanel(null);
});

it('has sensible defaults', function (): void {
    $plugin = ErDiagramPlugin::make();

    expect($plugin->getModelsPath())->toBe('app/Models')
        ->and($plugin->getExcludedModels())->toBeEmpty()
        ->and($plugin->shouldShowColumns())->toBeTrue()
        ->and($plugin->shouldShowRelationshipLabels())->toBeTrue()
        ->and($plugin->getNavigationGroup())->toBe('Tools')
        ->and($plugin->getNavigationSort())->toBe(100)
        ->and($plugin->getId())->toBe('er-diagram');
});

it('returns the same instance from fluent setters', function (): void {
    $plugin = ErDiagramPlugin::make();

    expect($plugin->modelsPath('app/Domain/Models'))->toBe($plugin)
        ->and($plugin->excludeModels([Post::class]))->toBe($plugin)
        ->and($plugin->withoutColumns())->toBe($plugin)
        ->and($plugin->withoutRelationshipLabels())->toBe($plugin)
        ->and($plugin->navigationGroup('Admin'))->toBe($plugin)
        ->and($plugin->navigationSort(50))->toBe($plugin)
        ->and($plugin->navigationIcon('heroicon-o-table-cells'))->toBe($plugin);
});

it('finds the plugin on a registered panel when there is no current panel', function (): void {
    $plugin = ErDiagramPlugin::make();
    $panel = Panel::make()
        ->id('fallback-panel')
        ->plugins([$plugin]);

    app(PanelRegistry::class)->register($panel);

    expect($panel->hasPlugin('er-diagram'))->toBeTrue()
        ->and(ErDiagramPlugin::get())->toBe($plugin);
});

it('falls back to the filament helper when no registered panel has the plugin', function (): void {
    $panel = Panel::make()
        ->id('panel-without-er-diagram')
        ->default();

    Filament::registerPanel($panel);
    Filament::setCurrentPanel($panel);

    ErDiagramPlugin::get();
})->throws(LogicException::class, 'Plugin [er-diagram] is not registered');

it('boots without side effects', function (): void {
    $plugin = ErDiagramPlugin::make();
    $plugin->boot(Panel::make()->id('boot-panel'));

    expect($plugin)->toBeInstanceOf(ErDiagramPlugin::class);
});

it('stores modelsPath correctly', function (): void {
    $plugin = ErDiagramPlugin::make()->modelsPath('app/Domain/Models');

    expect($plugin->getModelsPath())->toBe('app/Domain/Models');
});

it('stores excluded models correctly', function (): void {
    $plugin = ErDiagramPlugin::make()->excludeModels([Post::class]);

    expect($plugin->getExcludedModels())->toBe([Post::class]);
});

it('disables columns when withoutColumns() is called', function (): void {
    $plugin = ErDiagramPlugin::make()->withoutColumns();

    expect($plugin->shouldShowColumns())->toBeFalse();
});

it('disables relationship labels when withoutRelationshipLabels() is called', function (): void {
    $plugin = ErDiagramPlugin::make()->withoutRelationshipLabels();

    expect($plugin->shouldShowRelationshipLabels())->toBeFalse();
});

it('stores custom navigation group', function (): void {
    $plugin = ErDiagramPlugin::make()->navigationGroup('Developer Tools');

    expect($plugin->getNavigationGroup())->toBe('Developer Tools');
});

it('allows null navigation group (no group)', function (): void {
    $plugin = ErDiagramPlugin::make()->navigationGroup(null);

    expect($plugin->getNavigationGroup())->toBeNull();
});

it('stores custom navigation sort', function (): void {
    $plugin = ErDiagramPlugin::make()->navigationSort(42);

    expect($plugin->getNavigationSort())->toBe(42);
});

it('stores custom navigation icon', function (): void {
    $plugin = ErDiagramPlugin::make()->navigationIcon('heroicon-o-table-cells');

    expect($plugin->getNavigationIcon())->toBe('heroicon-o-table-cells');
});
